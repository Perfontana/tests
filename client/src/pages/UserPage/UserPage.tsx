import { Navigate } from 'react-router-dom';
import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  Grid,
  Button,
  Alert,
  CircularProgress,
  Pagination,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import Post from '../../components/Post/Post';

import toggleModal from '../../redux/actions/modal';
import { myFetchPosts } from '../../redux/actions/posts';

import { useTypedSelector } from '../../hooks/useTypedSelector';

import classes from './UserPage.module.css';

import { MAX_POSTS_ON_PAGE } from '../../utils/constants';
import { filterCategories, paginatePosts } from '../../utils/filterArray';
import takeImage from '../../utils/imagePath';

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

const UserPage: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuth, currentUser } = useTypedSelector((state) => state.auth);
  const [page, setPage] = React.useState(1);
  const {
    posts,
    isLoading,
    error,
  } = useTypedSelector((state) => state.posts);
  const { searchValue, category } = useTypedSelector((state) => state.search);
  const { post } = useTypedSelector((state) => state.post);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const {
    id, email, avatar, username,
  } = currentUser;
  const userAvatar = takeImage(String(avatar));

  const handleOpen = (type: string, id?: number): void => {
    dispatch(toggleModal({ status: true, type, id }));
  };
  const openChangeData = (): void => {
    handleOpen('change');
  };
  const openAddPost = (): void => {
    handleOpen('add');
  };
  const openUpdatePost = (id: number): void => {
    handleOpen('update', id);
  };

  const filteredPosts = filterCategories(posts, searchValue, category);
  const purePosts = paginatePosts(filteredPosts, page);

  useEffect(() => {
    if (!purePosts.length) {
      setPage(1);
    }
    if (id) {
      dispatch(myFetchPosts(id));
    }
  }, [post, dispatch, id, filteredPosts.length, purePosts.length]);

  if (!isAuth) {
    return (
      <Navigate to="/" />
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        { (error)
          && (
          <Alert severity="error">
            { error }
          </Alert>
          )}
        { isLoading
          && <CircularProgress />}
        <>
          <div className={classes.news}>
            {purePosts.map((post: Posts) => (
              <Post
                post={post}
                key={post.id}
                postsModal={openUpdatePost}
                isUserPage
              />
            ))}
          </div>
          <Pagination
            count={Math.ceil(filteredPosts.length / MAX_POSTS_ON_PAGE)}
            page={page}
            onChange={handleChange}
          />
        </>
      </Grid>
      <Grid item xs={4}>
        <Card className={classes.userCard}>
          {(avatar)
            && (
            <CardMedia
              component="img"
              image={userAvatar}
              alt="your profile"
            />
            )}
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              {username}
            </Typography>
            <Typography variant="h6" component="div">
              email - {email}
            </Typography>
            <Button className={classes.sendButton} onClick={openChangeData}>Изменить данные пользователя</Button>
          </CardContent>
        </Card>
        <Button className={classes.sendButton} onClick={openAddPost}>Добавить новую новость</Button>
      </Grid>
    </Grid>
  );
};

export default memo(UserPage);
