import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Пароль слишком маленький!')
    .max(50, 'Пароль слишком длинный!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export default signupSchema;
