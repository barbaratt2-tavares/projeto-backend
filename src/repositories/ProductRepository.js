const Product = require("../models/Product");

class ProductRepository {
  async create(data) {
    return await Product.create(data);
  }

  async findAll({
    limit = 12,
    page = 1,
    fields,
    match,
    category_ids,
    priceRange,
    options,
  }) {
    const queryOptions = {
      where: {},
    };

    if (fields) {
      queryOptions.attributes = fields.split(",").map((field) => field.trim());
    }

    if (match) {
      queryOptions.where[Op.or] = [
        { name: { [Op.like]: `%${match}%` } },
        { description: { [Op.like]: `%${match}%` } },
      ];
    }

    if (category_ids) {
      const catIds = category_ids.split(",").map((id) => Number(id.trim()));
      queryOptions.where.category_id = { [Op.in]: catIds }; // Adjust column name if it's different in your model (e.g., categoryId)
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-").map(Number);
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        queryOptions.where.price = { [Op.between]: [minPrice, maxPrice] };
      }
    }

    if (options && typeof options === "object") {
      for (const [optionId, values] of Object.entries(options)) {
        const valueArray = Array.isArray(values) ? values : values.split(",");
        queryOptions.where[`options.${optionId}`] = { [Op.in]: valueArray };
      }
    }

    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    if (parsedLimit !== -1) {
      const take = isNaN(parsedLimit) ? 12 : parsedLimit;
      const currentPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

      queryOptions.limit = take;
      queryOptions.offset = (currentPage - 1) * take;
    }

    const { count, rows } = await Product.findAndCountAll(queryOptions);

    return {
      totalItems: count,
      items: rows,
      limit: parsedLimit,
      page: parsedLimit === -1 ? null : parsedPage,
    };
  }

  async findById(id) {
    return await Product.findByPk(id);
  }

  async update(id, data) {
    const product = await Product.findByPk(id);
    return await product.update(data);
  }

  async delete(id) {
    const product = await Product.findByPk(id);
    await product.destroy();
  }
}

module.exports = new ProductRepository();
