import React from 'react';
import {View} from 'react-native';
import {Text, withStyles} from 'react-native-ui-kitten';
import {textStyle} from '../common';

class ArticleTipsComponent extends React.Component {
  renderIconElement = style => {
    return this.props.icon(style);
  };

  render() {
    const {style, themedStyle, icon, children} = this.props;
    return (
      <View style={[themedStyle.container, style]}>
        {icon ? this.renderIconElement(themedStyle.icon) : null}
        <Text style={themedStyle.text}>{children}</Text>
      </View>
    );
  }
}

export const ArticleTips = withStyles(ArticleTipsComponent, theme => ({
  container: {
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 18,
    tintColor: 'white',
  },
  text: {
    color: 'white',
    ...textStyle.subtitleAlt,
  },
}));
