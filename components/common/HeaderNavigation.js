import React from 'react';
import { StatusBar, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  TopNavigation,
  TopNavigationAction,
  withStyles,
} from 'react-native-ui-kitten';
import { SafeAreaView } from './SafeAreaView';
import { textStyle } from './style';

const hasNotch = DeviceInfo.hasNotchSync();

class HeaderNavigationComponent extends React.PureComponent {
  onBackButtonPress = () => {
    if (this.props.onBackPress) {
      this.props.onBackPress();
    }
  };

  renderBackIcon = source => {
    const { whiteIcon, novaScore } = this.props;
    let color = false;
    if (whiteIcon) {
      color = true;
    } else if (novaScore && novaScore.value !== 0) {
      color = true;
    }

    return this.props.icon([source, { tintColor: color ? 'white' : null }]);
  };

  renderBackButton = () => {
    return (
      <TopNavigationAction
        icon={this.renderBackIcon}
        onPress={this.onBackButtonPress}
      />
    );
  };

  setHeaderColor = () => {
    const { transparent, novaScore, themedStyle } = this.props;

    if (transparent) {
      return { backgroundColor: 'transparent' };
    }

    if (novaScore && novaScore.value !== 0) {
      StatusBar.setBarStyle('light-content');
      return { backgroundColor: novaScore.color };
    }

    return { backgroundColor: '#fff' };
  };

  render() {
    const {
      themedStyle,
      title,
      subtitle,
      icon,
      alignment,
      novaScore,
    } = this.props;

    const leftControlElement = icon ? this.renderBackButton(icon) : null;
    const backgroundColor = this.setHeaderColor();

    let titleColor = '#1b2955';

    if (novaScore) {
      titleColor = novaScore && novaScore.value !== 0 ? 'white' : '#1b2955';
    }

    return (
      <SafeAreaView style={[themedStyle.safeArea, backgroundColor]}>
        <TopNavigation
          alignment={alignment}
          title={title}
          subtitle={subtitle}
          titleStyle={[textStyle.subtitle, { color: titleColor }]}
          subtitleStyle={textStyle.caption1}
          leftControl={leftControlElement}
          style={{ backgroundColor }}
        />
      </SafeAreaView>
    );
  }
}

export const HeaderNavigation = withStyles(
  HeaderNavigationComponent,
  theme => ({
    safeArea: {
     paddingTop: Platform.OS === 'ios' && hasNotch ? 42 : Platform.OS === 'android' ? StatusBar.currentHeight : 21,
    },
    backgroundColorWhite: {
      backgroundColor: theme['background-basic-color-1'],
    },
    backgroundColorTransparent: {
      backgroundColor: 'transparent',
    },
    topNavigation: {
      color: '#1B2955',
      backgroundColor: 'transparent',
    },
  }),
);
