import { put, call, takeLatest } from 'redux-saga/effects';

import { AxiosError } from 'axios';
import * as actionTypes from '../../utils/constants';
import {
  loginSuccessed,
  loginError,
} from '../actions/auth';

import api from '../api/index';
import toggleModal from '../actions/modal';
import { setToken } from '../../storage/token';

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) return String(error?.response?.data);
  return String(error);
}

function* loginGoogleWorker(action: {type:string, payload: {token: string}}): Generator<any, any, any> {
  try {
    const { data } = yield call(api.post, '/auth/google/login', action);
    yield put(loginSuccessed(data));
    yield call(setToken, data.token);
    yield put(toggleModal({ status: false }));
  } catch (error) {
    yield put(loginError(getErrorMessage(error)));
  }
}

function* loginGoogleWatcher(): Generator<any, any, any> {
  yield takeLatest(actionTypes.LOGIN_VIA_GOOGLE_REQUESTED, loginGoogleWorker);
}

export default loginGoogleWatcher;
