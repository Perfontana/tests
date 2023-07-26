import {
  MY_POSTS_FETCHED_REQUESTED,
  POSTS_FETCHED_FAILED,
  POSTS_FETCHED_REQUESTED,
  POSTS_FETCHED_SUCCESSED,
} from '../../utils/constants';

interface PayloadPosts {
  id: number
  title: string
  text: string
  image?: string
  tags?: string
  user: {
    username: string
    id: number
  }
}

interface PostsActionError {
  type: string
  payload: unknown
}

interface PostsActionSuccess {
  type: string
  payload: PayloadPosts[]
}

export const fetchPosts = (): { type: string } => ({
  type: POSTS_FETCHED_REQUESTED,
});
export const myFetchPosts = (id: number | null): { type: string, payload: number | null } => ({
  type: MY_POSTS_FETCHED_REQUESTED,
  payload: id,
});
export const getError = (error: unknown): PostsActionError => ({
  type: POSTS_FETCHED_FAILED,
  payload: error,
});
export const fetchSuccessed = (payload: PayloadPosts[]): PostsActionSuccess => ({
  type: POSTS_FETCHED_SUCCESSED,
  payload,
});
