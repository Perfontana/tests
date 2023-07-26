enum PostActionsTypes {
  POST_CREATE_REQUESTED = 'POST_CREATE_REQUESTED',
  POST_CREATE_SUCCESSED = 'POST_CREATE_SUCCESSED',
  POST_CREATE_FAILED = 'POST_CREATE_FAILED',
  POST_CHANGE_REQUESTED = 'POST_CHANGE_REQUESTED',
  POST_CHANGE_SUCCESSED = 'POST_CHANGE_SUCCESSED',
  POST_CHANGE_FAILED = 'POST_CHANGE_FAILED',
}

interface IUser {
  username: string
  id: number
}

interface Post {
  id: number
  image: string | undefined
  title: string
  text: string
  authorId: number
  tags: string | undefined
  user: IUser
}

interface PostCreateRequestedAction {
  type: PostActionsTypes.POST_CREATE_REQUESTED
}

interface PostsCreateSuccessedAction {
  type: PostActionsTypes.POST_CREATE_SUCCESSED
  payload: Post
}

interface PostsCreateFailedAction {
  type: PostActionsTypes.POST_CREATE_FAILED
  payload: string | null
}

interface PostChangeRequestedAction {
  type: PostActionsTypes.POST_CHANGE_REQUESTED
}

interface PostsChangeSuccessedAction {
  type: PostActionsTypes.POST_CHANGE_SUCCESSED
  payload: Post
}

interface PostsChangeFailedAction {
  type: PostActionsTypes.POST_CHANGE_FAILED
  payload: string | null
}

interface PostState {
  post: Post | null
  isLoading: boolean
  error: string | null
}

type PostAction = PostCreateRequestedAction |
PostsCreateSuccessedAction |
PostsCreateFailedAction |
PostsChangeSuccessedAction |
PostsChangeFailedAction |
PostChangeRequestedAction

const initialState: PostState = {
  post: null,
  isLoading: false,
  error: null,
};

export default function addPostReducer(state = initialState, action: PostAction): PostState {
  switch (action.type) {
    case PostActionsTypes.POST_CREATE_REQUESTED:
    case PostActionsTypes.POST_CHANGE_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case PostActionsTypes.POST_CREATE_SUCCESSED:
    case PostActionsTypes.POST_CHANGE_SUCCESSED:
      return {
        ...state,
        isLoading: false,
        post: action.payload,
      };
    case PostActionsTypes.POST_CREATE_FAILED:
    case PostActionsTypes.POST_CHANGE_FAILED:
      return {
        isLoading: false,
        error: action.payload,
        post: null,
      };
    default: return state;
  }
}
