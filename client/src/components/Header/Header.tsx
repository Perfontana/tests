import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  InputBase,
} from '@mui/material';

import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';

import RadioButton from '../RadioButton/RadioButton';

import ModalWindow from '../ModalWindow';
import toggleModal from '../../redux/actions/modal';
import filterPosts from '../../redux/actions/search';

import { deleteToken } from '../../storage/token';
import authUser, { loginViaGoogleRequested, resetModal } from '../../redux/actions/auth';
import { fetchToken } from '../../redux/actions/token';

import { useTypedSelector } from '../../hooks/useTypedSelector';

import { categories } from '../../utils/constants';

import classes from './Header.module.css';

const Header: React.FC = () => {
  const { isOpen, modalType } = useTypedSelector((state) => state.modal);
  const { isAuth, currentUser } = useTypedSelector((state) => state.auth);
  const { username } = currentUser;

  const { category } = useTypedSelector((state) => state.search);

  const dispatch = useDispatch();

  const handleOpen = (type: string): void => {
    dispatch(toggleModal({ status: true, type }));
  };
  const handleClose = (): void => {
    dispatch(toggleModal({ type: '', status: false }));
    dispatch(resetModal());
  };

  const openSignUp = (): void => {
    handleOpen('signup');
  };

  const openLogin = (): void => {
    handleOpen('login');
  };

  const logout = (): void => {
    deleteToken();
    dispatch(authUser());
  };
  const changeSearchField = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchValue = event.target.value;
    dispatch(filterPosts({ searchValue, category }));
  };

  useEffect(() => {
    const handleLogin = (res: { credential: string }) => {
      dispatch(loginViaGoogleRequested(res.credential));
    };
    if (window.google && !isAuth) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleLogin,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        { theme: 'outline', size: 'large' },
      );
    }
    if (isAuth) {
      dispatch(fetchToken());
    }
    dispatch(resetModal());
  }, [isAuth, dispatch]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            className={classes.box}
          >
            News Site
          </Typography>
          <>
            <SearchIcon className={classes.searchIcon} />
            <InputBase
              className={classes.inputBase}
              placeholder="Искать..."
              inputProps={{ 'aria-label': 'search' }}
              onChange={changeSearchField}
            />
          </>
          <div className={classes.news}>
            {
            categories.map((radioButton) => <RadioButton value={radioButton} key={radioButton} />)
            }
          </div>
          { isAuth
            ? (
              <div className={classes.userprofile}>
                Welcome,
                <Link className={classes.link} to="/me">{username}</Link>
                <Button onClick={logout} variant="contained" color="warning">
                  Logout
                </Button>
                <ModalWindow isOpen={isOpen} modalType={modalType} handleClose={handleClose} />
              </div>
            )
            : (
              <div className={classes.buttons}>
                <div id="signInDiv" />
                <Button onClick={openSignUp} variant="contained" color="warning">
                  Register
                </Button>
                <Button onClick={openLogin} variant="contained" color="warning">
                  Sign in
                </Button>
                <ModalWindow isOpen={isOpen} modalType={modalType} handleClose={handleClose} />
              </div>
            )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default memo(Header);
