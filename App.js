import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView, DynamicStatusBar} from './components/common';
import {mapping} from '@eva-design/eva';
import {ApplicationProvider} from 'react-native-ui-kitten';
import {useScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import {store} from './redux/app-redux';
import {ThemeContext, themes, ThemeStore} from './core/themes';

import AppNavigator from './core/navigation/AppNavigator';

useScreens();

function getActiveRoute(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRoute(route);
  }
  return route;
}

export default class App extends React.Component {
  state = {
    theme: 'Eva Light',
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  onSwitchTheme = theme => {
    ThemeStore.setTheme(theme).then(() => {
      this.setState({theme});
    });
  };
  render() {
    const contextValue = {
      currentTheme: this.state.theme,
      toggleTheme: this.onSwitchTheme,
    };
    return (
      <ThemeContext.Provider value={contextValue}>
        <ApplicationProvider mapping={mapping} theme={themes[this.state.theme]}>
          <DynamicStatusBar currentTheme={this.state.theme} />
          <SafeAreaView style={styles.container}>
            <Provider store={store}>
              <AppNavigator
                onNavigationStateChange={(prevState, currentState) => {
                  const currentScreen = getActiveRoute(currentState);
                  const prevScreen = getActiveRoute(prevState);
                  if (prevScreen.routeName !== currentScreen.routeName) {
                    const statusTheme = currentScreen.params.statusbar;
                    StatusBar.setBarStyle(statusTheme);
                  }
                }}
              />
            </Provider>
          </SafeAreaView>
        </ApplicationProvider>
      </ThemeContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
});
