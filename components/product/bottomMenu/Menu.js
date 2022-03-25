import React from 'react';
import {
  withStyles,
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten';
import {SafeAreaView} from '../../../components/common';
import {StackActions} from 'react-navigation';
import {
  HomeIconOutline,
  CubeIconOutline,
  ClockIconOutline,
  PersonIconOutline,
} from '../../../assets/icons';

class MenuComponent extends React.PureComponent {
  onTabSelect = index => {
    const {navigation} = this.props;
  };

  render() {
    const {themedStyle} = this.props;
    return (
      <SafeAreaView style={themedStyle.safeAreaContainer}>
        <BottomNavigation
          appearance="noIndicator"
          selectedIndex={1}
          onSelect={this.onTabSelect}>
          <BottomNavigationTab title="Inicio" icon={HomeIconOutline} />
          <BottomNavigationTab title="Escanear" icon={CubeIconOutline} />
          <BottomNavigationTab title="Historial" icon={ClockIconOutline} />
          <BottomNavigationTab title="Perfil" icon={PersonIconOutline} />
        </BottomNavigation>
      </SafeAreaView>
    );
  }
}

export const Menu = withStyles(MenuComponent, theme => ({
  safeAreaContainer: {
    backgroundColor: theme['background-basic-color-1'],
  },
}));
