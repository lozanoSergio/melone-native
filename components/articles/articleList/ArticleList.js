import React from 'react';
import {List, withStyles} from 'react-native-ui-kitten';
import {ArticleListItem} from './ArticleListItem';

class ArticleListComponent extends React.Component {
  onItemPress = article => {
    this.props.onItemPress(article);
  };

  onItemLikePress = article => {
    this.props.onItemLikePress(article);
  };

  onItemCommentPress = article => {
    this.props.onItemCommentPress(article);
  };

  handleLoadMore = () => {
    this.props.handleLoadMore();
  };

  renderItem = info => {
    const {themedStyle, likedArticles} = this.props;

    return (
      <ArticleListItem
        style={themedStyle.item}
        article={info.item}
        likedArticles={likedArticles}
        onPress={this.onItemPress}
        onLikePress={this.onItemLikePress}
        onCommentPress={this.onItemCommentPress}
      />
    );
  };

  render() {
    const {themedStyle, articles, loadMore, loading} = this.props;
    return (
      <List
        contentContainerStyle={themedStyle.container}
        data={articles}
        renderItem={this.renderItem}
        onEndReached={loadMore && !loading ? this.handleLoadMore : null}
        onEndReachedThreshold={0.5}
        //initialNumToRender={5}
      />
    );
  }
}

export const ArticleList = withStyles(ArticleListComponent, theme => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme['background-basic-color-2'],
  },
  item: {
    marginVertical: 8,
    backgroundColor: theme['background-basic-color-1'],
  },
}));
