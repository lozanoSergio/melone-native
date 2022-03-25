import React from 'react';
import {withStyles, List} from 'react-native-ui-kitten';
import {LayoutListItem} from './LayoutListItem';

class LayoutListComponent extends React.Component {
  onItemPress = index => {
    this.props.onItemPress(index);
  };

  renderItem = info => {
    return (
      <LayoutListItem
        style={this.props.themedStyle.item}
        data={info.item}
        onPress={this.onItemPress}
      />
    );
  };

  render() {
    const {style, themedStyle, ...restProps} = this.props;

    return (
      <List
        style={[themedStyle.container, style]}
        {...restProps}
        renderItem={this.renderItem}
      />
    );
  }
}

export const LayoutList = withStyles(LayoutListComponent, theme => ({
  item: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
}));
