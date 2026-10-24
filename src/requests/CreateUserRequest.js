import * as yup from 'yup';

export const createUserSchema = yup.object({
  firstname: yup.string().required('O campo firstname é obrigatório e deve ser uma string.'),
  surname: yup.string().required('O campo surname é obrigatório e deve ser uma string.'),
  email: yup.string().email('O campo email deve ser um e-mail válido.').required('O campo email é obrigatório e deve ser uma string.'),
  password: yup.string().required('O campo password é obrigatório e deve ser uma string.'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'As senhas devem corresponder.')
    .required('O campo confirmPassword é obrigatório e deve ser uma string.'),
});

export const updateUserSchema = createUserSchema.partial();