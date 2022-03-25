import React from 'react';
import {ScrollView} from 'react-native';

export class ContainerView extends React.Component {
  render() {
    return (
      <ScrollView
        bounces={false}
        bouncesZoom={false}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        {...this.props}
      />
    );
  }
}
