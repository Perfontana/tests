import { put, call, takeLatest } from 'redux-saga/effects';

import { AxiosError } from 'axios';
import * as actionTypes from '../../utils/constants';
import { registerSuccessed, registerError, loginRequested } from '../actions/auth';
import toggleModal from '../actions/modal';
import api from '../api/index';

interface RegisterAction {
  type: string
  payload: {
    email: string
    username: string
    password: string
  }
}

interface PayloadLoginRequseted {
  email: string
  password: string
}

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) return String(error?.response?.data);
  return String(error);
}

function* registerWorker(action: RegisterAction): Generator<any, any, any> {
  try {
    const { data } = yield call(api.post, '/auth/registration', action.payload);
    yield put(registerSuccessed(data));
    yield put(toggleModal({ status: false }));
    const userLoginData: PayloadLoginRequseted = { email: action.payload.email, password: action.payload.password };
    yield put(loginRequested(userLoginData));
  } catch (error) {
    yield put(registerError(getErrorMessage(error)));
  }
}

function* registerWatcher(): Generator<any, any, any> {
  yield takeLatest(actionTypes.REGISTER_REQUESTED, registerWorker);
}

export default registerWatcher;
