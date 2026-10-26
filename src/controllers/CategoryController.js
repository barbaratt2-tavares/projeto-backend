import CategoryRepository from "../repositories/CategoryRepository";

export class CategoryController {
  async create(req, res) {
    try {
      const createdCategory = await CategoryRepository.create(req.body);
      return res.status(201).json(createdCategory);
    } catch (error) {
      console.log(error);

      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        return res.status(400).json({ message: error.message });
      }

      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({ message: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const { page = 1, limit = 10, fields, use_in_menu } = req.query;
      const data = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        fields,
        use_in_menu,
      };
      const categories = await CategoryRepository.findAll(data);
      return res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({ message: error.message });
    }
  }
}
