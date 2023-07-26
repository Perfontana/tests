import { getToken } from '../../storage/token';

enum AuthActionsTypes {
  LOGIN_REQUESTED = 'LOGIN_REQUESTED',
  LOGIN_SUCCESSED = 'LOGIN_SUCCESSED',
  LOGIN_FAILED = 'LOGIN_FAILED',
  REGISTER_REQUESTED = 'REGISTER_REQUESTED',
  REGISTER_SUCCESSED = 'REGISTER_SUCCESSED',
  REGISTER_FAILED = 'REGISTER_FAILED',
  CHANGES_REQUESTED = 'CHANGES_REQUESTED',
  CHANGES_SUCCESSED = 'CHANGES_SUCCESSED',
  CHANGES_FAILED = 'CHANGES_FAILED',
  LOGOUT_USER = 'LOGOUT_USER',
  TOKEN_FAILED = 'TOKEN_FAILED',
  TOKEN_SENDED = 'TOKEN_SENDED',
  TOKEN_SUCCESSED = 'TOKEN_SUCCESSED',
  RESET_MODAL = 'RESET_MODAL',
}

interface IUser {
  id: number | null
  avatar: string | Blob
  email: string
  username: string
}

interface LoginRequestedAction {
  type: AuthActionsTypes.LOGIN_REQUESTED
}

interface LoginSuccessedAction {
  type: AuthActionsTypes.LOGIN_SUCCESSED
  payload: IUser
}

interface LoginFailedAction {
  type: AuthActionsTypes.LOGIN_FAILED
  payload: string
}

interface RegisterRequestedAction {
  type: AuthActionsTypes.REGISTER_REQUESTED
}

interface RegisterSuccessedAction {
  type: AuthActionsTypes.REGISTER_SUCCESSED
  payload: IUser
}

interface RegisterFailedAction {
  type: AuthActionsTypes.REGISTER_FAILED
  payload: string
}

interface ChangesRequestedAction {
  type: AuthActionsTypes.CHANGES_REQUESTED
}

interface ChangesSuccessedAction {
  type: AuthActionsTypes.CHANGES_SUCCESSED
  payload: IUser
}

interface ChangesFailedAction {
  type: AuthActionsTypes.CHANGES_FAILED
  payload: string
}

interface ToggleModalAction {
  type: AuthActionsTypes.LOGOUT_USER
}

interface AuthState {
  isAuth: boolean
  isLoading: boolean
  error: string | null
  currentUser: IUser
}

interface TokenSendedAction {
  type: AuthActionsTypes.TOKEN_SENDED
}

interface TokenSuccessAction {
  type: AuthActionsTypes.TOKEN_SUCCESSED
  payload: IUser
}

interface TokenFailedAction {
  type: AuthActionsTypes.TOKEN_FAILED
  payload: string | null
}

interface ResetModalAction {
  type: AuthActionsTypes.RESET_MODAL
}

type AuthAction =
LoginFailedAction |
LoginRequestedAction |
LoginSuccessedAction |
RegisterRequestedAction |
RegisterSuccessedAction |
RegisterFailedAction |
ChangesRequestedAction |
ChangesSuccessedAction |
ChangesFailedAction |
ToggleModalAction |
TokenFailedAction |
TokenSuccessAction |
TokenSendedAction |
ResetModalAction

const initialState: AuthState = {
  isAuth: Boolean(getToken()),
  currentUser: {
    id: null,
    username: '',
    email: '',
    avatar: '',
  },
  isLoading: false,
  error: null,
};

export default function authReducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionsTypes.LOGIN_REQUESTED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AuthActionsTypes.LOGIN_SUCCESSED:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        error: null,
        currentUser: action.payload,
      };
    case AuthActionsTypes.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case AuthActionsTypes.REGISTER_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActionsTypes.REGISTER_SUCCESSED:
      return {
        ...state,
        isLoading: false,
        error: null,
        currentUser: action.payload,
      };
    case AuthActionsTypes.REGISTER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case AuthActionsTypes.LOGOUT_USER:
      return {
        ...state,
        currentUser: {
          id: null,
          email: '',
          username: '',
          avatar: '',
        },
        isAuth: false,
      };
    case AuthActionsTypes.CHANGES_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActionsTypes.CHANGES_SUCCESSED:
      return {
        ...state,
        isLoading: false,
        error: null,
        currentUser: action.payload,
      };
    case AuthActionsTypes.CHANGES_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case AuthActionsTypes.TOKEN_SENDED:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActionsTypes.TOKEN_SUCCESSED:
      return {
        isAuth: true,
        currentUser: action.payload,
        isLoading: false,
        error: null,
      };
    case AuthActionsTypes.TOKEN_FAILED:
      return {
        isAuth: false,
        currentUser: {
          id: null,
          username: '',
          email: '',
          avatar: '',
        },
        isLoading: false,
        error: action.payload,
      };
    case AuthActionsTypes.RESET_MODAL:
      return {
        ...state,
        error: null,
      };
    default: return state;
  }
}
