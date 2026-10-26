const Category = require("../models/Category");

class CategoryRepository {
  async create(data) {
    return await Category.create(data);
  }

  async findAll({ page, limit, fields, use_in_menu }) {

    limit = parseInt(limit, 10);
    page = parseInt(page, 10);

    const where = {};
    if (use_in_menu === "true" || use_in_menu === "false") {
      where.use_in_menu = use_in_menu === "true";
    }

    let attributes = undefined;
    if (fields) {
      attributes = fields.split(",").map((field) => field.trim());
    }

    let queryOptions = {
      where,
      attributes,
    };

    if (limit !== -1) {
      const parsedLimit = limit > 0 ? limit : 12;
      const parsedPage = page > 0 ? page : 1;

      queryOptions.limit = parsedLimit;
      queryOptions.offset = (parsedPage - 1) * parsedLimit;
    }

    const { count, rows } = await Category.findAndCountAll(queryOptions);
    
    return {
      total: count,
      page,
      limit,
      data: rows,
    };
  }

  async findById(id) {
    return await Category.findByPk(id);
  }

  async update(id, data) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    return await category.update(data);
  }

  async delete(id) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    await category.destroy();
    return true;
  }
}

module.exports = new CategoryRepository();
