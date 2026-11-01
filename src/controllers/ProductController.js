import ProductRepository from "../repositories/ProductRepository";

export class ProductController {
  async create(req, res) {
    try {
      const createdProduct = await ProductRepository.create(req.body);
      return res.status(201).json(createdProduct);
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
      const {
        limit = req.query.limit || 10,
        page = req.query.page || 1,
        fields,
        match,
        category_ids,
        "price-range": priceRange,
        option: options,
      } = req.query;

      const result = await ProductRepository.findAll({
        limit: Number(limit),
        page: Number(page),
        fields,
        match,
        category_ids,
        priceRange,
        options,
      });
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({ message: error.message });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductRepository.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductRepository.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const updatedProduct = await ProductRepository.update(id, req.body);
      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.log(error);
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductRepository.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      await ProductRepository.delete(id);
      return res.status(204).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.log(error);
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({ message: error.message });
    }
  }
}
