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

interface LoginAction {
  type: string
  payload: {
    email: string
    password: string
  }
}

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) return String(error?.response?.data);
  return String(error);
}

function* loginWorker(action: LoginAction): Generator<any, any, any> {
  try {
    const { data } = yield call(api.post, '/auth/login', action.payload);
    yield put(loginSuccessed(data));
    yield call(setToken, data.token);
    yield put(toggleModal({ status: false }));
  } catch (error) {
    yield put(loginError(getErrorMessage(error)));
  }
}

function* loginWatcher(): Generator<any, any, any> {
  yield takeLatest(actionTypes.LOGIN_REQUESTED, loginWorker);
}

export default loginWatcher;
