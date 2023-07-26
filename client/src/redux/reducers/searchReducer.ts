import { FILTER_POSTS } from '../../utils/constants';

interface SearchAction {
  type: string
  payload: {
    searchValue: string
    category: string
  }
}

interface SearchState {
  searchValue: string
  category: string
}

const initialState = {
  searchValue: '',
  category: 'all',
};

export default function searchReducer(state = initialState, action: SearchAction): SearchState {
  switch (action.type) {
    case FILTER_POSTS:
      return {
        searchValue: action.payload.searchValue,
        category: action.payload.category,
      };
    default: return state;
  }
}
