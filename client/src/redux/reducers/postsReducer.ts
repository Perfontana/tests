enum PostsActionsTypes {
  POSTS_FETCHED_REQUESTED = 'POSTS_FETCHED_REQUESTED',
  POSTS_FETCHED_SUCCESSED = 'POSTS_FETCHED_SUCCESSED',
  POSTS_FETCHED_FAILED = 'POSTS_FETCHED_FAILED',
}

interface IUser {
  username: string
  id: number
}

interface Posts {
  id: number
  image: string | undefined
  title: string
  text: string
  authorId: number
  tags: string | undefined
  user: IUser
}

interface PostsState {
  posts: Posts[]
  isLoading: boolean
  error: string | null
}

interface PostsRequestedAction {
  type: PostsActionsTypes.POSTS_FETCHED_REQUESTED
}

interface PostsSuccessedAction {
  type: PostsActionsTypes.POSTS_FETCHED_SUCCESSED
  payload: Posts[]
}

interface PostsFailedAction {
  type: PostsActionsTypes.POSTS_FETCHED_FAILED
  payload: string | null
}

type PostsAction = PostsRequestedAction | PostsFailedAction | PostsSuccessedAction

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
};

export default function postsReducer(state = initialState, action: PostsAction): PostsState {
  switch (action.type) {
    case PostsActionsTypes.POSTS_FETCHED_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case PostsActionsTypes.POSTS_FETCHED_SUCCESSED:
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };
    case PostsActionsTypes.POSTS_FETCHED_FAILED:
      return {
        isLoading: false,
        error: action.payload,
        posts: [],
      };
    default: return state;
  }
}
