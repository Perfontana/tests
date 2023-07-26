import { all } from 'redux-saga/effects';

import postsSaga from './postsSaga';
import authSaga from './authSaga';
import loginGoogle from './authGoogleSaga';
import changesSaga from './changesSaga';
import registerSaga from './registerSaga';
import tokenSaga from './tokenSaga';
import myPostsWatcher from './myPostsSaga';
import postCreateWatcher from './postCreateSaga';
import postChangeWatcher from './postChangeSaga';

export default function* rootSaga(): Generator<any, any, any> {
  yield all([
    postsSaga(),
    authSaga(),
    loginGoogle(),
    registerSaga(),
    tokenSaga(),
    changesSaga(),
    myPostsWatcher(),
    postCreateWatcher(),
    postChangeWatcher(),
  ]);
}
