import {
  POST_CREATE_FAILED,
  POST_CREATE_REQUESTED,
  POST_CREATE_SUCCESSED,
  POST_CHANGE_REQUESTED,
  POST_CHANGE_SUCCESSED,
} from '../../utils/constants';

interface IUser {
  username: string
  id: number
}

interface Post {
  id: number
  image?: string
  title: string
  text: string
  authorId: number
  tags?: string
  user: IUser
}

interface PostSend {
  type: string
  payload: FormData
}

interface PostActionError {
  type: string
  payload: unknown
}

interface PostActionSuccess {
  type: string
  payload: Post
}

export const createPost = (payload: FormData): PostSend => ({
  type: POST_CREATE_REQUESTED,
  payload,
});
export const getError = (error: unknown): PostActionError => ({
  type: POST_CREATE_FAILED,
  payload: error,
});
export const createSuccessed = (payload: Post): PostActionSuccess => ({
  type: POST_CREATE_SUCCESSED,
  payload,
});
export const changePost = (payload: FormData): PostSend => ({
  type: POST_CHANGE_REQUESTED,
  payload,
});
export const changeSuccessed = (payload: Post): PostActionSuccess => ({
  type: POST_CHANGE_SUCCESSED,
  payload,
});
