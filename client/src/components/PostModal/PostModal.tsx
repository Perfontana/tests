import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';

import {
  Typography,
} from '@mui/material';

import {
  createPost,
  changePost,
} from '../../redux/actions/post';

import postSchema from './postSchema';

import { useTypedSelector } from '../../hooks/useTypedSelector';

import classes from './PostModal.module.css';
import takeImage from '../../utils/imagePath';

interface PostModalProps {
  modalType: string
}

interface FormikValues {
  title: string
  text: string
  image: string | Blob
  tags: string
}

const PostModal = (props: PostModalProps): JSX.Element => {
  const { id } = useTypedSelector((state) => state.modal);
  const { posts } = useTypedSelector((state) => state.posts);
  const { modalType } = props;
  const dispatch = useDispatch();
  const isAdd = modalType === 'add';
  const isUpdate = modalType === 'update';
  const post = posts.find((post) => post.id === id) || {
    title: '',
    text: '',
    image: '',
    tags: '',
  };
  const {
    title,
    text,
    image,
    tags,
  } = post;
  const userImage = takeImage(image);
  const formikInitialValues = {
    title,
    text,
    tags: tags || '',
    image: image || '',
  };

  const authHandle = (values: FormikValues): void => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key as keyof typeof values]);
    });
    if (isUpdate && (id)) {
      formData.append('id', String(id));
      dispatch(changePost(formData));
    } else {
      dispatch(createPost(formData));
    }
  };

  return (
    <>
      <Typography id="modal-modal-title" variant="h5" component="h5">
        {isAdd ? 'Добавить новость' : 'Изменить новость'}
      </Typography>
      <Formik
        initialValues={formikInitialValues}
        validationSchema={postSchema}
        onSubmit={authHandle}
      >
        {({ errors, setFieldValue }) => (
          <Form className={classes.form}>
            <Typography id="modal-modal-title" variant="h6" component="h3">
              Заголовок статьи
            </Typography>
            <Field name="title" type="title" />
            {errors.title && (
              <div>{errors.title}</div>
            )}
            <Typography id="modal-modal-text" variant="h6" component="h3">
              Текст статьи
            </Typography>
            <Field name="text" />
            {errors.text && (
              <div>{errors.text}</div>
            )}
            <Typography id="modal-modal-tags" variant="h6" component="h3">
              Теги
            </Typography>
            <Field name="tags" type="tags" />
            {errors.tags && (
              <div>{errors.tags}</div>
            )}
            <Typography id="modal-modal-image" variant="h6" component="h3">
              Картинка
            </Typography>
            { image
              && <img src={userImage} alt="Post_image" />}
            <input
              id="filepost"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/gif,image/jpg"
              onChange={(event) => {
                setFieldValue('image', event.currentTarget.files?.[0]);
              }}
            />
            <button className={classes.buttons} type="submit">
              {isAdd ? 'Создать новость' : 'Изменить новость'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default memo(PostModal);
