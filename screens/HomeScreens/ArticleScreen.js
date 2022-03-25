import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Article} from '../../components/articles/Article';
import {
  getArticleComments,
  unsubscribeFromComments,
  addNewComment,
  deleteComment,
  likeComment,
} from '../../services/articlesActions';
import {likeArticle} from '../../redux/articles/articlesActions';
import {connect} from 'react-redux';

const mapState = state => ({
  articles: state.articles,
  user: state.user,
});

const actions = {
  likeArticle,
};

class ArtcileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: null,
      currentCommentText: '',
      loading: true,
      comments: [],
      commentsLoader: true,
    };

    this.setComments = this.setComments.bind(this);
  }

  async componentDidMount() {
    await getArticleComments(this.state.article.id, this.setComments);
  }

  componentWillUnmount() {
    unsubscribeFromComments(this.state.article.id);
  }

  setComments(comments) {
    const commentsArr = comments;
    this.setState({comments: commentsArr, commentsLoader: false});
  }

  UNSAFE_componentWillMount() {
    const article = this.props.navigation.getParam('article', undefined);
    this.setState({
      article,
      loading: false,
    });
  }

  handleBackAction = () => {
    this.props.navigation.goBack();
  };

  onItemLikePress = async article => {
    await this.props.likeArticle(article);
  };

  onMorePress = comment => {
    deleteComment(comment.id, this.state.article.id);
  };

  onReplyMorePress = index => {};

  onCommentTextChange = text => {
    this.setState({currentCommentText: text});
  };

  onLikeCommentPress = comment => {
    const articleId = this.state.article.id;
    const userId = this.props.user.uid;
    likeComment(comment, articleId, userId);
  };

  onCommentSubmit = () => {
    if (this.state.currentCommentText === '') {
      return;
    }
    const {user} = this.props;

    const newComment = {
      author: {
        username: user.username,
        displayName: user.displayName,
        photoURL: user.photoURL,
        userId: user.uid,
      },
      text: this.state.currentCommentText,
      likesCount: 0,
      date: Date.now(),
    };

    addNewComment(newComment, this.state.article.id);
    this.setState({
      currentCommentText: '',
    });
  };

  render() {
    const {
      loading,
      commentsLoader,
      article,
      comments,
      currentCommentText,
    } = this.state;

    if (loading) {
      return <></>;
    } else {
      return (
        <View style={styles.container}>
          <Article
            article={article}
            user={this.props.user}
            comments={comments}
            commentsLoader={commentsLoader}
            onLikeCommentPress={this.onLikeCommentPress}
            currentCommentText={currentCommentText}
            handleBack={this.handleBackAction}
            onLikePress={this.onItemLikePress}
            onCommentTextChange={this.onCommentTextChange}
            onCommentSubmit={this.onCommentSubmit}
            onCommentLikePress={this.onLikePress}
            onCommentMorePress={this.onMorePress}
            onCommentReplyMorePress={this.onReplyMorePress}
          />
        </View>
      );
    }
  }
}

export default connect(
  mapState,
  actions,
)(ArtcileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
});
