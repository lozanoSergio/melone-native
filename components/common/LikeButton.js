import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, withStyles} from 'react-native-ui-kitten';
import {HeartIconFill, HeartIconOutline} from '../../assets/icons';

class LikeButtonComponent extends React.Component {
  render() {
    const {
      style,
      themedStyle,
      textStyle,
      children,
      liked,
      ...restProps
    } = this.props;
    return (
      <TouchableOpacity style={[themedStyle.container, style]} {...restProps}>
        {liked
          ? HeartIconFill(themedStyle.icon)
          : HeartIconOutline(themedStyle.iconOutline)}
        <Text style={[themedStyle.valueLabel, textStyle]} category="p2">
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
}

export const LikeButton = withStyles(LikeButtonComponent, theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: theme['color-primary-default'],
  },
  iconOutline: {
    width: 24,
    height: 24,
    tintColor: theme['text-hint-color'],
  },
  valueLabel: {
    marginHorizontal: 8,
  },
}));
