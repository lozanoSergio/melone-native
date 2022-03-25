import {createReducer} from '../util/reducerUtil';
import {
  CREATE_ARTICLE,
  DELETE_ARTICLE,
  LIKE_ARTICLE,
  FETCH_ARTICLES,
} from './articlesConstants';

const initialState = [];

export const createArticle = (state, payload) => {
  return [...state, Object.assign({}, payload.article)];
};

export const likeArticle = (state, payload) => {
  return [...state];
};

export const deleteArticle = (state, payload) => {
  return [...state.filter(article => article.id !== payload.articleId)];
};

export const fetchArticles = (state, payload) => {
  return payload.articles;
};

export default createReducer(initialState, {
  [CREATE_ARTICLE]: createArticle,
  [LIKE_ARTICLE]: likeArticle,
  [DELETE_ARTICLE]: deleteArticle,
  [FETCH_ARTICLES]: fetchArticles,
});
