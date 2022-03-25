import React from 'react';
import {List, withStyles} from 'react-native-ui-kitten';
import {SubCommentListItem} from './SubCommentListItem';

class SubCommentListComponent extends React.Component {
  onItemMorePress = index => {
    this.props.onItemMorePress(index);
  };

  renderItem = info => {
    return (
      <SubCommentListItem
        style={this.props.themedStyle.item}
        data={info.item}
        onMorePress={this.onItemMorePress}
      />
    );
  };

  render() {
    const {themedStyle, ...restProps} = this.props;
    return <List {...restProps} renderItem={this.renderItem} />;
  }
}

export const SubCommentList = withStyles(SubCommentListComponent, theme => ({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
}));
