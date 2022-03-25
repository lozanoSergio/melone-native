import React from 'react';
import {View} from 'react-native';
import {Text, withStyles} from 'react-native-ui-kitten';
import {textStyle} from '../common';
import {Icon} from '../UI/Icons';

class ProfileSettingComponent extends React.Component {
  renderTextElement = (text, style, hint) => {
    return (
      <Text style={hint ? null : style} appearance="hint">
        {text}
      </Text>
    );
  };

  render() {
    const {
      style,
      themedStyle,
      label,
      hint,
      value,
      icon,
      iconAction,
      ...restProps
    } = this.props;
    const {container, hintLabel, valueLabel} = themedStyle;

    return (
      <View {...restProps} style={[container, style]}>
        {label ? this.renderTextElement(label, null, hintLabel) : null}
        {this.renderTextElement(value, valueLabel, hint)}
        {icon && (
          <Icon
            name="edit"
            type="feather"
            color={themedStyle.icon.color}
            size={22}
            onPress={iconAction}
          />
        )}
      </View>
    );
  }
}

export const ProfileSetting = withStyles(ProfileSettingComponent, theme => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  hintLabel: textStyle.caption2,
  valueLabel: {
    color: theme['text-basic-color'],
    ...textStyle.caption2,
  },
  icon: {
    color: theme['color-primary-default'],
  },
}));
