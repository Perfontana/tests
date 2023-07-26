import React, { memo } from 'react';

import {
  CircularProgress,
  Alert,
  Button,
  Modal,
  Box,
} from '@mui/material';

import AuthModal from '../AuthModal';
import PostModal from '../PostModal';

import { useTypedSelector } from '../../hooks/useTypedSelector';

import classes from './ModalWindow.module.css';

interface ModalProps {
  isOpen: boolean
  modalType: string
  handleClose: () => void
}

const ModalWindow = (props: ModalProps): JSX.Element => {
  const { isOpen, modalType, handleClose } = props;
  const { isLoading, error } = useTypedSelector((state) => state.auth);
  const isAuthModal = ['login', 'signup', 'change'].includes(modalType);
  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modal_window}>
        {isLoading
              && (
                <CircularProgress />
              )}
        {error
            && (
            <Alert severity="error">
              { error }
            </Alert>
            )}
        {isAuthModal
          ? <AuthModal modalType={modalType} />
          : <PostModal modalType={modalType} />}
        <div className={classes.buttons}>
          <Button variant="contained" onClick={handleClose}> Close </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default memo(ModalWindow);
