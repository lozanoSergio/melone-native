import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, withStyles} from 'react-native-ui-kitten';
import {ArticleActivityBar} from '../ArticleActivityBar';
import {ActivityAuthoring, ImageOverlay, textStyle} from '../../common';

class ArticleListItemComponent extends React.Component {
  onPress = () => {
    this.props.onPress(this.props.article);
  };

  onCommentsButtonPress = () => {
    this.props.onCommentPress(this.props.article);
  };

  onLikeButtonPress = () => {
    this.props.onLikePress(this.props.article);
  };

  render() {
    const {style, themedStyle, article, ...restProps} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.95}
        {...restProps}
        style={[themedStyle.container, style]}
        onPress={this.onPress}>
        <ImageOverlay style={themedStyle.image} source={{uri: article.image}}>
          <Text style={themedStyle.titleLabel} category="h4">
            {article.title}
          </Text>
        </ImageOverlay>
        <ArticleActivityBar
          style={themedStyle.activityContainer}
          comments={article.commentCounter}
          likes={article.likes}
          liked={article.liked}
          onCommentPress={this.onCommentsButtonPress}
          onLikePress={this.onLikeButtonPress}>
          <ActivityAuthoring
            photo={article.author.photoURL}
            name={article.author.username}
            date={article.date}
          />
        </ArticleActivityBar>
      </TouchableOpacity>
    );
  }
}

export const ArticleListItem = withStyles(ArticleListItemComponent, theme => ({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  activityContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  tipsContainer: {
    marginTop: 16,
  },
  image: {
    minHeight: 220,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  titleLabel: {
    maxWidth: 192,
    color: 'white',
    ...textStyle.headlineAlt,
  },
}));
