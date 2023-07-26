import { FILTER_POSTS } from '../../utils/constants';

interface PayloadSearch {
  searchValue: string
  category: string
}

interface ActionSearch {
  type: string
  payload: PayloadSearch
}

const filterPosts = (payload: PayloadSearch): ActionSearch => ({
  type: FILTER_POSTS,
  payload,
});

export default filterPosts;
