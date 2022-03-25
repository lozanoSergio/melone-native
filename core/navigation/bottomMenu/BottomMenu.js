import React from 'react';
import {Platform, Keyboard} from 'react-native';
import {StackActions} from 'react-navigation';
import {Menu} from './Menu';

export class BottomMenu extends React.Component {
  state = {
    visible: true,
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', this.visible(false)),
        Keyboard.addListener('keyboardDidHide', this.visible(true)),
      ];
    }
  }

  componentWillUnmount() {
    this.keyboardEventListeners &&
      this.keyboardEventListeners.forEach(eventListener =>
        eventListener.remove(),
      );
  }

  visible = visible => () => this.setState({visible});

  navigationKey = 'MenuContainer';

  onTabSelect = index => {
    const {navigation} = this.props;
    const {[index]: selectedRoute} = navigation.state.routes;

    this.props.navigation.dispatch(StackActions.popToTop());

    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: selectedRoute.routeName,
    });
  };

  render() {
    if (!this.state.visible) {
      return null;
    } else {
      return (
        <Menu
          selectedIndex={this.props.navigation.state.index}
          onTabSelect={this.onTabSelect}
        />
      );
    }
  }
}
