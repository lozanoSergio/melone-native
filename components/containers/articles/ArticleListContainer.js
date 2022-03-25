import React from 'react';
import {ArticleList} from '../../articles/articleList';
import {withNavigation} from 'react-navigation';
import {
  getArticlesForDashboard,
  likeArticle,
} from '../../../redux/articles/articlesActions';
import {connect} from 'react-redux';
import {Loader} from '../../common';

const mapState = state => ({
  articles: state.articles,
  loading: state.async.loading,
});

const actions = {
  getArticlesForDashboard,
  likeArticle,
};

class ArticleListContainer extends React.Component {
  state = {
    moreArticles: false,
    loadingInitial: true,
    loadedArticles: [],
    likedArticles: [],
    articlesLikes: [],
  };

  async componentDidMount() {
    let next = await this.props.getArticlesForDashboard();

    if (next && next.docs && next.docs.length !== 0) {
      this.setState({
        moreArticles: true,
        loadingInitial: false,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {articles} = this.props;
    if (articles.length !== nextProps.articles.length) {
      this.setState({
        loadedArticles: [...this.state.loadedArticles, ...nextProps.articles],
      });
    } else if (this.state.loadedArticles.length === 0) {
      this.setState({loadedArticles: [...nextProps.articles]});
    }
  }

  getNextArticles = async () => {
    const {articles} = this.props;
    let lastArticle = articles && articles[articles.length - 1];
    let next = await this.props.getArticlesForDashboard(lastArticle);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreArticles: false,
      });
    }
  };

  onItemPress = article => {
    this.props.navigation.navigate('ArtcileScreen', {
      article,
      onBackAction: this.refreshState,
    });
  };

  onItemLikePress = async article => {
    await this.props.likeArticle(article);
  };

  onItemCommentPress = article => {};

  render() {
    const {loading} = this.props;
    const {loadedArticles, moreArticles, loadingInitial} = this.state;

    if (loadingInitial) {
      return <Loader />;
    } else {
      return (
        <ArticleList
          articles={loadedArticles}
          likedArticles={loadedArticles.likedArticles}
          handleLoadMore={this.getNextArticles}
          loading={loading}
          loadMore={moreArticles}
          onItemPress={this.onItemPress}
          onItemLikePress={this.onItemLikePress}
          onItemCommentPress={this.onItemCommentPress}
        />
      );
    }
  }
}

export default connect(
  mapState,
  actions,
)(withNavigation(ArticleListContainer));
