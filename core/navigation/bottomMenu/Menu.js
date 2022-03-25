import React from 'react';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  ThemeProvider,
  withStyles,
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten';
import {SafeAreaView} from '../../../components/common';
import {themes} from '../../themes';
import {
  HomeIconOutline,
  CubeIconOutline,
  ClockIconOutline,
  PersonIconOutline,
} from '../../../assets/icons';
import {connect} from 'react-redux';

const hasNotch = DeviceInfo.hasNotchSync();
const isIpad = DeviceInfo.getDeviceIdSync() === "iPad8,5" ? true : false;

const mapState = state => ({
  product: state.scannedProduct,
});

class MenuComponent extends React.PureComponent {
  onTabSelect = index => {
    this.props.onTabSelect(index);
  };

  render() {
    const {selectedIndex, product, themedStyle} = this.props;

    // if (product && product.length !== 0) {
    //   let theme = 'App Theme';
    //   if (product.novaScore) {
    //     theme =
    //       product.novaScore.value === 1
    //         ? 'Green Theme'
    //         : product.novaScore.value === 2
    //         ? 'Yellow Theme'
    //         : product.novaScore.value === 3
    //         ? 'Yellow Theme'
    //         : product.novaScore.value === 4
    //         ? 'Red Theme'
    //         : 'App Theme';
    //   }

    //   return (
    //     <SafeAreaView style={themedStyle.safeAreaContainer}>
    //       <ThemeProvider theme={{...this.props.theme, ...themes[theme]}}>
    //         <BottomNavigation
    //           appearance="noIndicator"
    //           selectedIndex={selectedIndex}
    //           onSelect={this.onTabSelect}>
    //           <BottomNavigationTab title="Inicio" icon={HomeIconOutline} />
    //           <BottomNavigationTab title="Escanear" icon={CubeIconOutline} />
    //           <BottomNavigationTab title="Historial" icon={ClockIconOutline} />
    //           <BottomNavigationTab title="Perfil" icon={PersonIconOutline} />
    //         </BottomNavigation>
    //       </ThemeProvider>
    //     </SafeAreaView>
    //   );
    // }

    return (
      <SafeAreaView style={themedStyle.safeAreaContainer}>
        <ThemeProvider theme={{...this.props.theme, ...themes['App Theme']}}>
          <BottomNavigation
            appearance="noIndicator"
            selectedIndex={selectedIndex}
            onSelect={this.onTabSelect}>
            <BottomNavigationTab title="Inicio" icon={HomeIconOutline} />
            <BottomNavigationTab title="Escanear" icon={CubeIconOutline} />
            <BottomNavigationTab title="Historial" icon={ClockIconOutline} />
            <BottomNavigationTab title="Perfil" icon={PersonIconOutline} />
          </BottomNavigation>
        </ThemeProvider>
      </SafeAreaView>
    );
  }
}

const MenuStyle = withStyles(MenuComponent, theme => ({
  safeAreaContainer: {
    backgroundColor: theme['background-basic-color-1'],
    paddingBottom: Platform.OS === 'ios' && (hasNotch || isIpad) ? 24 : 0,
  },
}));

export const Menu = connect(mapState)(MenuStyle);
