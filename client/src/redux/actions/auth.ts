import {
  LOGIN_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCESSED,
  LOGOUT_USER,
  REGISTER_FAILED,
  REGISTER_REQUESTED,
  REGISTER_SUCCESSED,
  CHANGES_SUCCESSED,
  CHANGES_REQUESTED,
  CHANGES_FAILED,
  RESET_MODAL,
  LOGIN_VIA_GOOGLE_REQUESTED,
} from '../../utils/constants';

interface ICandidate {
  id: number
  username: string
  email: string
  avatar: string | null
}

interface IChanges {
  username: string
  email: string
  avatar: string | null
}

interface ChangesAction {
  type: string
  payload: IChanges | FormData
}

interface GoogleAction {
  type:string
  payload: string
}

interface PayloadLoginRequseted {
  email: string | null
  password: string | null
}

interface PayloadLoginSuccessed {
  candidate: ICandidate
  token: string
}

interface PayloadRegistrationRequested extends PayloadLoginRequseted {
  username: string
}

interface LoginActionRequest {
  type: string
  payload: PayloadLoginRequseted
}

interface LoginActionSuccessed {
  type: string
  payload: PayloadLoginSuccessed
}

interface RegistrationActionSuccessed {
  type: string
  payload: ICandidate
}

interface RegistrationActionRequested {
  type: string
  payload: PayloadRegistrationRequested
}

interface ResetModalAction {
  type: string
}

export const loginRequested = (payload: PayloadLoginRequseted): LoginActionRequest => ({
  type: LOGIN_REQUESTED,
  payload,
});

export const loginError = (error: string | null): { type: string, payload: string | null } => ({
  type: LOGIN_FAILED,
  payload: error,
});
export const loginSuccessed = (payload: PayloadLoginSuccessed): LoginActionSuccessed => ({
  type: LOGIN_SUCCESSED,
  payload,
});

export const registerRequested = (payload: PayloadRegistrationRequested): RegistrationActionRequested => ({
  type: REGISTER_REQUESTED,
  payload,
});
export const registerError = (error: string | null): { type: string, payload: string | null } => ({
  type: REGISTER_FAILED,
  payload: error,
});
export const registerSuccessed = (payload: ICandidate): RegistrationActionSuccessed => ({
  type: REGISTER_SUCCESSED,
  payload,
});

export const changesRequested = (payload: FormData): ChangesAction => ({
  type: CHANGES_REQUESTED,
  payload,
});

export const changesSuccessed = (payload: IChanges): ChangesAction => ({
  type: CHANGES_SUCCESSED,
  payload,
});

export const changesFailed = (error: string | null): { type: string, payload: string | null } => ({
  type: CHANGES_FAILED,
  payload: error,
});

export const loginViaGoogleRequested = (payload: string): GoogleAction => ({
  type: LOGIN_VIA_GOOGLE_REQUESTED,
  payload,
});

export const resetModal = (): ResetModalAction => ({
  type: RESET_MODAL,
});

const PayloadAuthUser = (): { type: string } => ({
  type: LOGOUT_USER,
});

export default PayloadAuthUser;
