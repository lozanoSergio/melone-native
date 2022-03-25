import {FETCH_ARTICLES, LIKE_ARTICLE} from './articlesConstants';
import AsyncStorage from '@react-native-community/async-storage';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/asyncActions';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

export const getArticlesForDashboard = lastArticle => async (
  dispatch,
  getState,
) => {
  try {
    dispatch(asyncActionStart());
    const queryLastFetch = await AsyncStorage.getItem('articles_timestamp');

    if (queryLastFetch !== null && !lastArticle) {
      const lastFetch = Number(queryLastFetch);

      const momentum = lastFetch + 3600000; //Fetch new articles every 4h
      const current = new Date().getTime();

      const localArtcilesString = await AsyncStorage.getItem('articles');
      const articles = JSON.parse(localArtcilesString);

      const querySnap = {
        docs: articles,
      };

      if (articles !== null && articles.length !== 0 && momentum >= current) {
        dispatch({type: FETCH_ARTICLES, payload: {articles}});
        dispatch(asyncActionFinish());
        return querySnap;
      } else {
        const fetchArticles = await getArticles(lastArticle);

        if (fetchArticles.querySnap.docs.length === 0) {
          dispatch(asyncActionFinish());
          return fetchArticles.querySnap;
        }

        const articles = fetchArticles.articles;

        dispatch({type: FETCH_ARTICLES, payload: {articles}});
        dispatch(asyncActionFinish());
        return fetchArticles.querySnap;
      }
    } else {
      const fetchArticles = await getArticles(lastArticle);

      if (fetchArticles.querySnap.docs.length === 0) {
        dispatch(asyncActionFinish());
        return fetchArticles.querySnap;
      }

      const articles = fetchArticles.articles;

      dispatch({type: FETCH_ARTICLES, payload: {articles}});
      dispatch(asyncActionFinish());
      return fetchArticles.querySnap;
    }
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

const getArticles = async lastArticle => {
  const firestore = firebase.firestore();
  const articlesRef = firestore.collection('Articles');
  const date = Date.now().toString();

  let startAfter =
    lastArticle &&
    (await firestore
      .collection('Articles')
      .doc(lastArticle.id)
      .get());
  let query;

  lastArticle
    ? (query = articlesRef
        .where('visible', '==', true)
        .orderBy('date', 'desc')
        .startAfter(startAfter)
        .limit(5))
    : (query = articlesRef
        .where('visible', '==', true)
        .orderBy('date', 'desc')
        .limit(15));

  let querySnap = await query.get();

  if (querySnap.docs.length === 0) {
    return {querySnap};
  }

  const userLikes = await getLikedArticles();

  let articles = [];

  for (let i = 0; i < querySnap.docs.length; i++) {
    let article = {
      ...querySnap.docs[i].data(),
      id: querySnap.docs[i].id,
    };
    let date = querySnap.docs[i].data().date.toDate();
    article.date = date;
    if (userLikes.length !== 0) {
      userLikes.map(userLike => {
        if (userLike.articleId === article.id) {
          article.liked = true;
        }
      });
    } else {
      article.liked = false;
    }

    articles.push(article);
  }

  if (articles && !lastArticle) {
    try {
      await AsyncStorage.multiSet([
        ['articles', JSON.stringify(articles)],
        ['articles_timestamp', date],
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  return {querySnap, articles};
};

const getLikedArticles = async () => {
  const user = firebase.auth().currentUser;
  const firestore = firebase.firestore();
  const likesRef = firestore.collection('Likes');

  let query = await likesRef
    .where('userId', '==', user.uid)
    .orderBy('postDate', 'desc')
    .limit(5);

  let querySnap = await query.get();

  let likes = [];

  for (let i = 0; i < querySnap.docs.length; i++) {
    let like = {...querySnap.docs[i].data(), id: querySnap.docs[i].id};
    likes.push(like);
  }

  return likes;
};

export const likeArticle = article => async (dispatch, getState) => {
  const user = firebase.auth().currentUser;
  const firestore = firebase.firestore();
  const articleLikesRef = firestore.collection('Articles').doc(article.id);

  const likesRef = firestore.collection('Likes');

  const localArtcilesString = await AsyncStorage.getItem('articles');
  const localArtciles = JSON.parse(localArtcilesString);

  try {
    if (article.liked) {
      let query = likesRef
        .where('userId', '==', user.uid)
        .where('articleId', '==', article.id);
      query.get().then(snapshot => {
        snapshot.forEach(doc => {
          doc.ref.delete();
        });
      });
      articleLikesRef.update({
        likes: firebase.firestore.FieldValue.increment(-1),
      });

      article.liked = false;
      article.likes = article.likes - 1;
      dispatch({type: LIKE_ARTICLE, payload: {article}});

      if (localArtciles !== null) {
        localArtciles.filter(localArtcile => {
          if (localArtcile.id === article.id) {
            localArtcile.liked = false;
            localArtcile.likes = localArtcile.likes - 1;
          }
        });
        await AsyncStorage.setItem('articles', JSON.stringify(localArtciles));
      }
    } else {
      likesRef
        .add({
          articleId: article.id,
          likedAt: Date.now(),
          postDate: article.date,
          userId: user.uid,
        })
        .then(
          articleLikesRef.update({
            likes: firebase.firestore.FieldValue.increment(1),
          }),
        );
      article.liked = true;
      article.likes = article.likes + 1;
      dispatch({type: LIKE_ARTICLE, payload: {article}});
      try {
        if (localArtciles !== null) {
          localArtciles.filter(localArtcile => {
            if (localArtcile.id === article.id) {
              localArtcile.liked = true;
              localArtcile.likes = localArtcile.likes + 1;
            }
          });
          await AsyncStorage.setItem('articles', JSON.stringify(localArtciles));
        }
      } catch (err) {
        console.log(err);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
