import {createReducer} from '../util/reducerUtil';
import {FETCH_USER, UPDATE_PROFILE} from './userConstants';

const initialState = [];

export const fetchUser = (state, payload) => {
  return payload.user;
};

export const updateProfile = (state, payload) => {
  return payload.user;
};

export default createReducer(initialState, {
  [FETCH_USER]: fetchUser,
  [UPDATE_PROFILE]: updateProfile,
});
