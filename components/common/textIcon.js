import React from 'react';
import {View} from 'react-native';
import {withStyles, Text} from 'react-native-ui-kitten';
import {textStyle} from './style';
import {Icon} from '../UI/Icons';

class TextIconComponent extends React.Component {
  render() {
    const {
      style,
      themedStyle,
      iconName,
      iconSize,
      iconType,
      iconColor,
      children,
      left,
    } = this.props;

    if (left) {
      return (
        <View style={[themedStyle.container, style]}>
          <Icon
            name={iconName}
            type={iconType}
            size={iconSize}
            color={iconColor}
          />
          <Text style={[themedStyle.text, textStyle]}>{children}</Text>
        </View>
      );
    }
  }
}

export const TextIcon = withStyles(TextIconComponent, theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginHorizontal: 8,
  },
}));
