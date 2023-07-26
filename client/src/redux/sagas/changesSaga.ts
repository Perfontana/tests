import { put, call, takeLatest } from 'redux-saga/effects';

import { AxiosError } from 'axios';
import * as actionTypes from '../../utils/constants';

import {
  changesSuccessed,
  changesFailed,
} from '../actions/auth';
import toggleModal from '../actions/modal';
import api from '../api';

interface IChanges {
  username: string
  email: string
  avatar: string | Blob
}

interface ChangesAction {
  type: string
  payload: IChanges
}

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) return String(error?.response?.data);
  return String(error);
}

function* changesWorker(action: ChangesAction): Generator<any, any, any> {
  try {
    const { data } = yield call(api.patch, '/auth/change', action.payload);
    yield put(changesSuccessed(data));
    yield put(toggleModal({ status: false }));
  } catch (error) {
    yield put(changesFailed(getErrorMessage(error)));
  }
}

function* changesWatcher(): Generator<any, any, any> {
  yield takeLatest(actionTypes.CHANGES_REQUESTED, changesWorker);
}

export default changesWatcher;
