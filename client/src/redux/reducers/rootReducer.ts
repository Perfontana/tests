import { combineReducers } from 'redux';

import postsReducer from './postsReducer';
import modalReducer from './modalReducer';
import authReducer from './authReducer';
import addPostReducer from './addPostReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  modal: modalReducer,
  auth: authReducer,
  post: addPostReducer,
  search: searchReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export type { RootState };

export default rootReducer;
