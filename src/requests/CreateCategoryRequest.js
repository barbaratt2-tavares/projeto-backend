import * as yup from 'yup';

export const createCategorySchema = yup.object({
  name: yup.string().required('O campo name é obrigatório e deve ser uma string.'),
  slug: yup.string().required('O campo slug é obrigatório e deve ser uma string.'),
  use_in_menu: yup.boolean().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();