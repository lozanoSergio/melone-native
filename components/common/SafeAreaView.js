import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {SafeAreaView as SafeAreaViewReactNavigation} from 'react-navigation';

export class SafeAreaView extends React.Component {
  statusBarHeight = Platform.select({
    ios: 0,
    android: StatusBar.currentHeight,
  });

  componentDidMount() {
    SafeAreaViewReactNavigation.setStatusBarHeight(this.statusBarHeight);
  }

  render() {
    return <SafeAreaViewReactNavigation {...this.props} />;
  }
}
