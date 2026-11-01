const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const ProductImage = require("../models/ProductImage");
const ProductOption = require("../models/ProductOption");

class ProductRepository {
  async create(data) {
    const { category_ids, images, options, ...productData } = data;

    const transaction = await Product.sequelize.transaction();

    try {
      const product = await Product.create(productData, { transaction });

      if (images && Array.isArray(images) && images.length > 0) {
        const imageRecords = images.map((image) => ({
          ...image,
          product_id: product.id,
        }));
        await ProductImage.bulkCreate(imageRecords, { transaction });
      }

      if (options && Array.isArray(options) && options.length > 0) {
        const optionRecords = options.map((option) => {
          const { values, ...rest } = option;
          return {
            ...rest,
            value: option.value || values,
            product_id: product.id,
          };
        });
        await ProductOption.bulkCreate(optionRecords, { transaction });
      }

      if (
        category_ids &&
        Array.isArray(category_ids) &&
        category_ids.length > 0
      ) {
        const categoryRecords = category_ids.map((categoryId) => ({
          product_id: product.id,
          category_id: categoryId,
        }));
        await ProductCategory.bulkCreate(categoryRecords, { transaction });
      }

      await transaction.commit();

      return await this.findById(product.id);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
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
      queryOptions.where.category_id = { [Op.in]: catIds };
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
    const product = await Product.findByPk(id, {
      include: [
        {
          model: ProductCategory,
          as: "categories",
          attributes: ["category_id"],
        },
        {
          model: ProductImage,
          as: "images",
          attributes: ["id", "content", "type"],
        },
        {
          model: ProductOption,
          as: "options",
        },
      ],
    });

    if (!product) return null;

    const plainProduct = product.get({ plain: true });

    return {
      id: plainProduct.id,
      enabled: plainProduct.enabled,
      name: plainProduct.name,
      slug: plainProduct.slug,
      stock: plainProduct.stock,
      description: plainProduct.description,
      price: plainProduct.price,
      price_with_discount: plainProduct.price_with_discount,
      category_ids: plainProduct.categories
        ? plainProduct.categories.map((cat) => cat.category_id || cat.id)
        : [],
      images: plainProduct.images || [],
      options: plainProduct.options || [],
    };
  }

  async update(id, data) {
    const product = await Product.findByPk(id);
    if (!product) return null;

    const { category_ids, images, options, ...productData } = data;
    const transaction = await Product.sequelize.transaction();

    try {
      await product.update(productData, { transaction });

      if (images !== undefined) {
        await ProductImage.destroy({ where: { product_id: id }, transaction });
        if (Array.isArray(images) && images.length > 0) {
          const imageRecords = images.map((image) => ({
            ...image,
            product_id: id,
          }));
          await ProductImage.bulkCreate(imageRecords, { transaction });
        }
      }

      if (options !== undefined) {
        await ProductOption.destroy({ where: { product_id: id }, transaction });
        if (Array.isArray(options) && options.length > 0) {
          const optionRecords = options.map((option) => {
            const { values, ...rest } = option;
            return {
              ...rest,
              value: option.value || values,
              product_id: id,
            };
          });
          await ProductOption.bulkCreate(optionRecords, { transaction });
        }
      }

      if (category_ids !== undefined) {
        await ProductCategory.destroy({
          where: { product_id: id },
          transaction,
        });
        if (Array.isArray(category_ids) && category_ids.length > 0) {
          const categoryRecords = category_ids.map((categoryId) => ({
            product_id: id,
            category_id: categoryId,
          }));
          await ProductCategory.bulkCreate(categoryRecords, { transaction });
        }
      }

      await transaction.commit();

      return await this.findById(id);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(id) {
    const product = await Product.findByPk(id);
    if (!product) return null;

    const transaction = await Product.sequelize.transaction();

    try {
      await ProductImage.destroy({ where: { product_id: id }, transaction });
      await ProductOption.destroy({ where: { product_id: id }, transaction });

      await product.destroy({ transaction });

      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = new ProductRepository();
