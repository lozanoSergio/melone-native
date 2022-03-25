import {createReducer} from '../util/reducerUtil';
import {FETCH_PRODUCT, REMOVE_PRODUCT} from './scannedProductConstants';

const initialState = [];

export const fetchProduct = (state, payload) => {
  return payload.scannedProduct;
};

export const removeProduct = (state, payload) => {
  return null;
};

export default createReducer(initialState, {
  [FETCH_PRODUCT]: fetchProduct,
  [REMOVE_PRODUCT]: removeProduct,
});
