import { put, call, takeLatest } from 'redux-saga/effects';

import { AxiosError } from 'axios';
import * as actionTypes from '../../utils/constants';
import { fetchSuccessed, getError } from '../actions/posts';
import api from '../api/index';

interface MyPostAction {
  type: string
  payload: number
}

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) return String(error?.message);
  return String(error);
}

function* myPostsWorker(action: MyPostAction): Generator<any, any, any> {
  try {
    const id = action.payload;
    const { data } = yield call(api.get, `/posts/${id}`);
    yield put(fetchSuccessed(data));
  } catch (error) {
    yield put(getError(getErrorMessage(error)));
  }
}

function* myPostsWatcher(): Generator<any, any, any> {
  yield takeLatest(actionTypes.MY_POSTS_FETCHED_REQUESTED, myPostsWorker);
}

export default myPostsWatcher;
