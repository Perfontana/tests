import { put, call, takeLatest } from 'redux-saga/effects';

import { AxiosError } from 'axios';
import * as actionTypes from '../../utils/constants';
import { changeSuccessed, getError } from '../actions/post';
import api from '../api/index';

import toggleModal from '../actions/modal';

interface PostCreate {
  type: string
  payload: FormData
}

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) return String(error?.response?.data);
  return String(error);
}

function* postChangeWorker(action: PostCreate): Generator<any, any, any> {
  try {
    const { data } = yield call(api.patch, '/posts/change', action.payload);
    yield put(changeSuccessed(data));
    yield put(toggleModal({ status: false }));
  } catch (error) {
    yield put(getError(getErrorMessage(error)));
  }
}

function* postCreateWatcher(): Generator<any, any, any> {
  yield takeLatest(actionTypes.POST_CHANGE_REQUESTED, postChangeWorker);
}

export default postCreateWatcher;
