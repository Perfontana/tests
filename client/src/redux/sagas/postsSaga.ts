import { put, call, takeLatest } from 'redux-saga/effects';

import { AxiosError } from 'axios';
import * as actionTypes from '../../utils/constants';
import { fetchSuccessed, getError } from '../actions/posts';
import api from '../api/index';

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) return String(error?.message);
  return String(error);
}

function* postsWorker(): Generator<any, any, any> {
  try {
    const { data } = yield call(api.get, '/posts');
    yield put(fetchSuccessed(data));
  } catch (error) {
    yield put(getError(getErrorMessage(error)));
  }
}

function* postsWatcher(): Generator<any, any, any> {
  yield takeLatest(actionTypes.POSTS_FETCHED_REQUESTED, postsWorker);
}

export default postsWatcher;
