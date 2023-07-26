import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { CircularProgress, Alert, Pagination } from '@mui/material';

import Post from '../../components/Post/Post';

import { fetchPosts } from '../../redux/actions/posts';

import { useTypedSelector } from '../../hooks/useTypedSelector';

import { MAX_POSTS_ON_PAGE } from '../../utils/constants';
import { filterCategories, paginatePosts } from '../../utils/filterArray';

import classes from './MainPage.module.css';

const MainPage: React.FC = () => {
  const {
    posts,
    isLoading,
    error,
  } = useTypedSelector((state) => state.posts);
  const { searchValue, category } = useTypedSelector((state) => state.search);

  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = filterCategories(posts, searchValue, category);
  const purePosts = paginatePosts(filteredPosts, page);

  useEffect(() => {
    if (!purePosts.length) {
      setPage(1);
    }
    dispatch(fetchPosts());
  }, [dispatch, filteredPosts.length, purePosts.length]);

  if (isLoading) {
    return (
      <CircularProgress />
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        { error }
      </Alert>
    );
  }
  return (
    <>
      <div className={classes.news}>
        {purePosts.map((post) => <Post post={post} key={post.id} />)}
      </div>
      <Pagination
        count={Math.ceil(filteredPosts.length / MAX_POSTS_ON_PAGE)}
        page={page}
        onChange={handleChange}
      />
    </>
  );
};
export default memo(MainPage);
