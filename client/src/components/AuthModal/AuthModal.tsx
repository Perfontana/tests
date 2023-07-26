import React, { memo, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';

import { Typography } from '@mui/material';
import {
  loginRequested,
  registerRequested,
  changesRequested,
} from '../../redux/actions/auth';

import signupSchema from './signupSchema';
import registrationSchema from './registrationSchema';
import changeDataSchema from './changeDataSchema';

import { useTypedSelector } from '../../hooks/useTypedSelector';

import classes from './AuthModal.module.css';

interface AuthModalProps {
  modalType: string
}

interface AuthValues {
  email: string
  username: string
  password: string
  avatar: string | Blob
  newPassword: string
  confirmPassword: string
}

interface formDataValues{
  email: string
  username: string
  password: string
  avatar: string | Blob
  newPassword: string
  confirmPassword?: string
}

const AuthModal = (props: AuthModalProps): JSX.Element => {
  const dispatch = useDispatch();
  const { currentUser } = useTypedSelector((state) => state.auth);
  const { modalType } = props;
  const isSignUp = modalType === 'signup';
  const isChangeData = modalType === 'change';

  const { modalTitle, authSchema } = useMemo(() => {
    if (modalType === 'signup') {
      return {
        modalTitle: 'Registration',
        authSchema: registrationSchema,
      };
    }
    if (modalType === 'change') {
      return {
        modalTitle: 'Change information',
        authSchema: changeDataSchema,
      };
    }
    return {
      modalTitle: 'Login',
      authSchema: signupSchema,
    };
  }, [modalType]);

  const authHandle = (values: AuthValues): void => {
    const formData = new FormData();
    const userChangeValues: formDataValues = { ...values };
    delete userChangeValues.confirmPassword;
    Object.keys(userChangeValues).forEach((key) => {
      formData.append(key, userChangeValues[key as keyof typeof userChangeValues] || '');
    });
    const { email, password, username } = values;
    if (isSignUp) {
      dispatch(registerRequested({ email, password, username }));
      return;
    }
    if (isChangeData) {
      dispatch(changesRequested(formData));
      return;
    }
    dispatch(loginRequested({ email, password }));
  };
  return (
    <>
      <Typography id="modal-modal-title" variant="h5" component="h5">
        {modalTitle}
      </Typography>
      <Formik
        initialValues={{
          ...currentUser,
          password: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={authSchema}
        onSubmit={authHandle}
      >
        {({ errors, setFieldValue }) => (
          <Form className={classes.form}>
            <Typography id="modal-modal-email" variant="h6" component="h3">
              Email
            </Typography>
            <Field name="email" type="email" />
            {errors.email && <div>{errors.email}</div>}

            {(isSignUp || isChangeData) && (
            <>
              <Typography id="modal-modal-username" variant="h6" component="h3">
                Username
              </Typography>
              <Field name="username" />
            </>
            )}

            {isSignUp && (errors.username) && (
            <div>{errors.username}</div>
            )}
            <Typography id="modal-modal-password" variant="h6" component="h3">
              Password
            </Typography>
            <Field name="password" type="password" />
            {(errors.password) && (
            <div>{errors.password}</div>
            )}
            {isChangeData
                && (
                <>
                  <Typography id="modal-modal-password" variant="h6" component="h3">
                    New password
                  </Typography>
                  {(errors.password) && (
                  <div>{errors.newPassword}</div>
                  )}
                  <Field name="newPassword" type="password" />
                  <Typography id="modal-modal-password" variant="h6" component="h3">
                    Confirm Passrod
                  </Typography>
                  {(errors.password) && (
                  <div>{errors.confirmPassword}</div>
                  )}
                  <Field name="confirmPassword" type="password" />
                  <Typography id="modal-modal-avatar" variant="h6" component="h3">
                    Аватар
                  </Typography>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/jpg"
                    onChange={(event) => {
                      setFieldValue('avatar', event.currentTarget.files?.[0]);
                    }}
                  />
                </>
                )}
            <button className={classes.buttons} type="submit">
              {modalTitle}
            </button>
          </Form>
        )}

      </Formik>
    </>
  );
};

export default memo(AuthModal);
