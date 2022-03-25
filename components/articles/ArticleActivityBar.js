import React from 'react';
import {withStyles} from 'react-native-ui-kitten';
import {ActivityBar, CommentsButton, LikeButton, ReactionBar} from '../common';

class ArticleActivityBarComponent extends React.Component {
  render() {
    const {
      themedStyle,
      textStyle,
      comments,
      likes,
      liked,
      onCommentPress,
      onLikePress,
      children,
      disableComments,
      ...restProps
    } = this.props;

    const disable = disableComments ? false : true;

    return (
      <ActivityBar {...restProps}>
        {children}
        <ReactionBar>
          {disable && (
            <CommentsButton
              textStyle={textStyle}
              activeOpacity={0.75}
              onPress={onCommentPress}>
              {`${comments}`}
            </CommentsButton>
          )}
          <LikeButton
            textStyle={textStyle}
            activeOpacity={0.75}
            liked={liked}
            onPress={onLikePress}>
            {`${likes}`}
          </LikeButton>
        </ReactionBar>
      </ActivityBar>
    );
  }
}

export const ArticleActivityBar = withStyles(
  ArticleActivityBarComponent,
  theme => ({}),
);
