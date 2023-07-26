import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Пароль слишком маленький!')
    .max(50, 'Пароль слишком длинный!')
    .required(),
  newPassword: Yup.string()
    .min(2, 'Пароль слишком маленький!')
    .max(50, 'Пароль слишком длинный!')
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Пароли не совпадают')
    .required(),
  username: Yup.string()
    .min(2, 'Никнейм слишком маленький!')
    .max(50, 'Никнейм слишком длинный!')
    .required(),
  email: Yup.string().email('Invalid email'),
  avatar: Yup.string(),
});

export default signupSchema;
