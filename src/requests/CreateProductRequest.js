import * as yup from 'yup';

export const createProductSchema = yup.object({
  enabled: yup.boolean().optional(),
  name: yup.string().required('O campo name é obrigatório e deve ser uma string.'),
  slug: yup.string().required('O campo slug é obrigatório e deve ser uma string.'),
  category_ids: yup.array().of(yup.number().integer('Cada categoria deve ser um número inteiro.')).required('O campo category_ids é obrigatório.'),
  images: yup.array().of(yup.object({
    type: yup.string().required('O campo type da imagem é obrigatório e deve ser uma string.'),
    content: yup.string().required('O campo content da imagem é obrigatório e deve ser uma string.'),
  })).optional(),
  options: yup.array().of(yup.object({
    title: yup.string().required('O campo name da opção é obrigatório e deve ser uma string.'),
    shape: yup.string().required('O campo shape da opção é obrigatório e deve ser uma string.'),
    radius: yup.string().required('O campo radius da opção deve ser um número inteiro.').optional(),
    type: yup.string().required('O campo type da opção é obrigatório e deve ser uma string.'),
    value: yup.string().required('O campo value da opção é obrigatório e deve ser uma string.'),
  })).optional(),
  use_in_menu: yup.boolean().optional(),
  stock: yup.number().integer('O campo stock deve ser um número inteiro.').optional(),
  description: yup.string().optional(),
  price: yup.number().required('O campo price é obrigatório e deve ser um number.'),
  price_with_discount: yup.number().required('O campo price_with_discount é obrigatório e deve ser um number.'),
});

export const updateProductSchema = createProductSchema.partial();