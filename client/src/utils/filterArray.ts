import { MAX_POSTS_ON_PAGE } from './constants';

interface IUser {
  username: string
  id: number
}

interface Posts {
  id: number
  image?: string
  title: string
  text: string
  authorId: number
  tags?: string
  user: IUser
}

const filterCategories = (Posts: Posts[], searchValue: string, category: string) : Posts[] => {
  const modifiedPosts = Posts.map((post) => ({
    ...post, username: post.user.username, authorId: post.user.id, tags: post.tags || '',
  }));
  if (category === 'all') {
    return modifiedPosts.filter((post) => (
      `${post.text}${post.title}${post.tags}${post.username}`.toLowerCase().includes(searchValue)));
  }
  if (category === 'tags') {
    return modifiedPosts.filter((post) => (post.tags?.toLowerCase().includes(searchValue.toLowerCase())
      && post.tags));
  }
  return modifiedPosts.filter((post) => (
    post[category as keyof Posts]?.toString().toLowerCase().includes(searchValue.toLowerCase())));
};

const paginatePosts = (Posts: Posts[], page: number) : Posts[] => {
  const purePosts = Posts.slice((page - 1) * MAX_POSTS_ON_PAGE, page * MAX_POSTS_ON_PAGE);
  return purePosts;
};

export { paginatePosts, filterCategories };
