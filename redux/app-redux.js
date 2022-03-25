import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import asyncReducer from './async/asyncReducer';
import articlesReducer from './articles/articlesReducer';
import userReducer from './user/userReducer';
import productReducer from './productHistory/productReducer';
import scannedProductReducer from './scannedProduct/scannedProductReducer';

const rootReducer = combineReducers({
  async: asyncReducer,
  articles: articlesReducer,
  user: userReducer,
  products: productReducer,
  scannedProduct: scannedProductReducer,
});

//
// Store...
//

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export {store};
