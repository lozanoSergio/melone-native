import React from 'react';
import {View} from 'react-native';
import {withStyles} from 'react-native-ui-kitten';
import * as Progress from 'react-native-progress';

class LoaderComponent extends React.Component {
  render() {
    const {themedStyle, size} = this.props;
    return (
      <View style={themedStyle.centerContainer}>
        <Progress.CircleSnail
          color={[
            'rgb(32, 226, 110)',
            'rgb(0, 206, 106)',
            'rgb(228, 83, 255)',
            'rgb(64, 124, 255)',
            'rgb(255, 183, 0)',
            'rgb(0, 224, 139)',
            'rgb(233, 30, 99)',
          ]}
          size={size ? size : 80}
        />
      </View>
    );
  }
}

export const Loader = withStyles(LoaderComponent, theme => ({
  centerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
  },
}));
