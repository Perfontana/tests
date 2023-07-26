import {
  TOKEN_SENDED,
  TOKEN_SUCCESSED,
  TOKEN_FAILED,
} from '../../utils/constants';

interface PayloadUser {
  id: number
  username: string
  email: string
  avatar: string | undefined
  createdAt: string
  updatedAt: string
}

interface TokenActionError {
  type: string
  payload: unknown
}

interface TokenActionSuccess {
  type: string
  payload: PayloadUser
}

export const fetchToken = (): { type: string } => ({
  type: TOKEN_SENDED,
});
export const getTokenError = (error: unknown): TokenActionError => ({
  type: TOKEN_FAILED,
  payload: error,
});
export const fetchTokenSuccessed = (payload: PayloadUser): TokenActionSuccess => ({
  type: TOKEN_SUCCESSED,
  payload,
});
