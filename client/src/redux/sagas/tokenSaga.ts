import { put, call, takeLatest } from 'redux-saga/effects';

import { AxiosError } from 'axios';
import * as actionTypes from '../../utils/constants';
import { fetchTokenSuccessed, getTokenError } from '../actions/token';
import api from '../api/index';

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) return String(error?.message);
  return String(error);
}

function* tokenWorker(): Generator<any, any, any> {
  try {
    const { data } = yield call(api.get, '/auth/token');
    yield put(fetchTokenSuccessed(data));
  } catch (error) {
    yield put(getTokenError(getErrorMessage(error)));
  }
}

function* tokenWatcher(): Generator<any, any, any> {
  yield takeLatest(actionTypes.TOKEN_SENDED, tokenWorker);
}

export default tokenWatcher;
