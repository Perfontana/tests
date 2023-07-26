import { put, call, takeLatest } from 'redux-saga/effects';

import { AxiosError } from 'axios';
import * as actionTypes from '../../utils/constants';
import { createSuccessed, getError } from '../actions/post';
import api from '../api/index';

import toggleModal from '../actions/modal';

interface PostCreate {
  type: string
  payload: FormData
}

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) return String(error?.message);
  return String(error);
}

function* postCreateWorker(action: PostCreate): Generator<any, any, any> {
  try {
    const { data } = yield call(api.post, '/posts/create', action.payload);
    yield put(createSuccessed(data));
    yield put(toggleModal({ status: false }));
  } catch (error) {
    yield put(getError(getErrorMessage(error)));
  }
}

function* postCreateWatcher(): Generator<any, any, any> {
  yield takeLatest(actionTypes.POST_CREATE_REQUESTED, postCreateWorker);
}

export default postCreateWatcher;
