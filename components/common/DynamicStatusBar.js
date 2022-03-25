import React from 'react';
import {View, StatusBar, Platform} from 'react-native';
import {withStyles} from 'react-native-ui-kitten';

class DynamicStatusBarComponent extends React.Component {
  getStatusBarContent = () => {
    if (this.props.currentTheme === 'Eva Light') {
      return 'dark-content';
    } else {
      return 'light-content';
    }
  };

  bgColorHanlder = () => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    } else {
      this.props.themedStyle.container.backgroundColor;
    }
  };

  render() {
    const {themedStyle} = this.props;

    const androidStatusBarBgColor = this.bgColorHanlder();
    const barStyle = this.getStatusBarContent();
    return (
      <View style={themedStyle.container}>
        <StatusBar
          backgroundColor={androidStatusBarBgColor}
          barStyle={barStyle}
        />
      </View>
    );
  }
}

export const DynamicStatusBar = withStyles(
  DynamicStatusBarComponent,
  theme => ({
    container: {
      backgroundColor: theme['background-basic-color-2'],
      height: Platform.select({
        ios: 0,
        android: 0,
      }),
    },
  }),
);
