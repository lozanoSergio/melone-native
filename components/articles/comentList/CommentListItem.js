import React from 'react';
import {View, TouchableOpacity, BackHandler} from 'react-native';
import {ListItem, Text, OverflowMenu, withStyles} from 'react-native-ui-kitten';
import {ActivityAuthoring, textStyle} from '../../common';
import {MoreHorizontalIconFill} from '../../../assets/icons';
import {SubCommentList} from './SubCommentList';
import {ArticleActivityBar} from '../ArticleActivityBar';
import {Trash2IconOutline} from '../../../assets/icons';

class CommentListItemComponent extends React.Component {
  state = {
    repliesVisible: false,
    overflowMenu: false,
    liked: this.props.comment.liked,
    likes: this.props.comment.likesCount,
  };

  items = [
    {
      title: 'Eliminar',
      icon: Trash2IconOutline,
    },
  ];

  onItemMenuSelect = () => {
    this.props.onMorePress(this.props.comment);
    this.toggleMenu();
  };

  toggleMenu = () => {
    const overflowMenu = !this.state.overflowMenu;
    this.setState({overflowMenu});
  };

  onLikePress = () => {
    let comment = this.props.comment;
    comment.liked = this.state.liked;
    this.props.onLikePress(comment);
    this.setState(prevState => ({
      liked: !prevState.liked,
      likes: prevState.liked ? prevState.likes - 1 : prevState.likes + 1,
    }));
  };

  onCommentPress = () => {
    const repliesVisible = !this.state.repliesVisible;

    this.setState({repliesVisible});
  };

  onReplyMorePress = index => {
    this.props.onReplyMorePress(index);
  };

  shouldRenderReplies = () => {
    const {comment} = this.props;

    return (
      comment.comments &&
      comment.comments.length !== 0 &&
      this.state.repliesVisible
    );
  };

  renderMoreIcon = () => {
    const {themedStyle} = this.props;

    return (
      <View style={themedStyle.overflowMenu}>
        {MoreHorizontalIconFill(themedStyle.moreIcon)}
      </View>
    );
  };

  renderReplyList = () => {
    const {themedStyle, comment} = this.props;

    return (
      <SubCommentList
        style={themedStyle.repliesList}
        data={comment.comments}
        onItemMorePress={this.onReplyMorePress}
      />
    );
  };

  render() {
    const {style, themedStyle, comment, user} = this.props;
    const {liked, likes} = this.state;

    const repliesElement = this.shouldRenderReplies() && this.renderReplyList();

    return (
      <ListItem style={[themedStyle.container, style]}>
        <View style={themedStyle.authorContainer}>
          <ActivityAuthoring
            style={themedStyle.activityAuthoring}
            photo={comment.author.photoURL}
            name={comment.author.username}
            date={comment.date}
          />
          {comment.author.userId === user.uid && (
            <OverflowMenu
              style={{fontWeight: 600}}
              visible={this.state.overflowMenu}
              data={this.items}
              onSelect={this.onItemMenuSelect}
              onBackdropPress={this.toggleMenu}
              placement={'bottom'}>
              <TouchableOpacity activeOpacity={0.75} onPress={this.toggleMenu}>
                {this.renderMoreIcon()}
              </TouchableOpacity>
            </OverflowMenu>
          )}
        </View>
        <Text style={themedStyle.commentLabel} category="s1">
          {comment.text}
        </Text>
        <ArticleActivityBar
          style={themedStyle.activityContainer}
          comments={comment.comments ? comment.comments.length : 0}
          liked={liked}
          likes={likes}
          disableComments
          onCommentPress={this.onCommentPress}
          onLikePress={this.onLikePress}
        />
        {repliesElement}
      </ListItem>
    );
  }
}

export const CommentListItem = withStyles(CommentListItemComponent, theme => ({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityContainer: {
    marginTop: 24,
  },
  activityAuthoring: {
    flex: 1,
  },
  commentLabel: {
    marginLeft: 8,
    marginRight: 32,
    marginTop: 14,
    ...textStyle.paragraph,
  },
  moreIcon: {
    width: 18,
    height: 18,
    tintColor: theme['text-hint-color'],
  },
  repliesList: {
    alignSelf: 'stretch',
    marginTop: 24,
  },
  overflowMenu: {
    width: 120,
    alignItems: 'flex-end',
  },
}));
