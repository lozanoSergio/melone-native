import React from 'react';
import {List, withStyles} from 'react-native-ui-kitten';
import {CommentListItem} from './CommentListItem';

class CommentListComponent extends React.PureComponent {
  onItemMorePress = comment => {
    this.props.onMorePress(comment);
  };

  onItemLikePress = comment => {
    this.props.onLikePress(comment);
  };

  onItemReplyMorePress = index => {
    this.props.onReplyMorePress(index);
  };

  isLastItem = index => {
    const {data} = this.props;

    if (!data) {
      return null;
    }

    return data.length - 1 === index;
  };

  renderListItemElement = comment => {
    const {themedStyle, user} = this.props;

    return (
      <CommentListItem
        style={themedStyle.item}
        comment={comment}
        user={user}
        onLikePress={this.onItemLikePress}
        onMorePress={this.onItemMorePress}
        onReplyMorePress={this.onItemReplyMorePress}
      />
    );
  };

  renderItem = info => {
    const {themedStyle} = this.props;
    const {item, index} = info;

    const listItemElement = this.renderListItemElement(item);

    const additionalStyle = this.isLastItem(index)
      ? null
      : themedStyle.itemBorder;

    return React.cloneElement(listItemElement, {
      style: [listItemElement.props.style, additionalStyle],
    });
  };

  render() {
    const {contentContainerStyle, themedStyle, ...restProps} = this.props;

    return <List {...restProps} renderItem={this.renderItem} />;
  }
}

export const CommentsList = withStyles(CommentListComponent, theme => ({
  item: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: theme['background-basic-color-2'],
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme['border-basic-color-3'],
  },
}));
