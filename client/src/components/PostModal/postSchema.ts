import * as Yup from 'yup';

const postSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Название статьи слишком короткое!')
    .max(50, 'Название статьи слишком длинное!')
    .required(),
  text: Yup.string()
    .min(10, 'Статья слишком короткая!')
    .max(500, 'Статья слишком длинная!')
    .required(),
  tags: Yup.string(),
  image: Yup.string(),
});

export default postSchema;
