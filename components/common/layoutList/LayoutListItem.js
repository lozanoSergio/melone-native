import React from 'react';
import {ListItem, Text, withStyles} from 'react-native-ui-kitten';
import {textStyle} from '../style';

class LayoutListItemComponent extends React.Component {
  render() {
    const {style, themedStyle, data, ...restProps} = this.props;

    return (
      <ListItem {...restProps} style={[themedStyle.container, style]}>
        <Text style={textStyle.subtitle} category="s1">
          {data.title}
        </Text>
        <Text style={textStyle.paragraph} appearance="hint">
          {data.description}
        </Text>
      </ListItem>
    );
  }
}

export const LayoutListItem = withStyles(LayoutListItemComponent, theme => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  description: {
    marginTop: 4,
    ...textStyle.subtitle,
  },
}));
