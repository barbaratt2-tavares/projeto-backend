import * as yup from 'yup';

export const createProductSchema = yup.object({
  enabled: yup.boolean().optional(),
  name: yup.string().required('O campo name é obrigatório e deve ser uma string.'),
  slug: yup.string().required('O campo slug é obrigatório e deve ser uma string.'),
  use_in_menu: yup.boolean().optional(),
  stock: yup.number().integer('O campo stock deve ser um número inteiro.').optional(),
  description: yup.string().optional(),
  price: yup.number().required('O campo price é obrigatório e deve ser um number.'),
  price_with_discount: yup.number().required('O campo price_with_discount é obrigatório e deve ser um number.'),
});

export const updateProductSchema = createProductSchema.partial();