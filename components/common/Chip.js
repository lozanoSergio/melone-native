import React from 'react';
import {View} from 'react-native';
import {withStyles} from 'react-native-ui-kitten';

class ChipComponent extends React.Component {
  render() {
    const {themedStyle, children, style, color} = this.props;

    return (
      <View style={[themedStyle.container, style, {backgroundColor: color}]}>
        {children}
      </View>
    );
  }
}

export const Chip = withStyles(ChipComponent, theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
}));
