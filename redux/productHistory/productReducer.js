import {createReducer} from '../util/reducerUtil';
import {
  ADD_PRODUCT,
  REMOVE_FROM_HISTORY,
  FETCH_PRODUCTS,
} from './productConstants';

const initialState = [];

export const addProduct = (state, payload) => {
  if (state.length >= 100) {
    state.shift();
  }

  let filter = state.filter(d => d.id !== payload.product.id);

  let merged = [...filter, payload.product];

  merged &&
    merged.sort(function(a, b) {
      return new Date(b.last_scan) - new Date(a.last_scan);
    });

  return merged;
};

export const fetchProducts = (state, payload) => {
  return payload.products;
};

export const removeProduct = (state, payload) => {
  return [...state.filter(product => product.id !== payload.product.id)];
};

export default createReducer(initialState, {
  [ADD_PRODUCT]: addProduct,
  [REMOVE_FROM_HISTORY]: removeProduct,
  [FETCH_PRODUCTS]: fetchProducts,
});
