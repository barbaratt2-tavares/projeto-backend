import { Router } from "express";
import { validateSchema } from "../middlewares/ValidateSchemaMiddleware";
import { createProductSchema } from "../requests/CreateProductRequest";
import { ProductController } from "../controllers/ProductController";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.post("/", validateSchema(createProductSchema), (req, res) =>
  productController.create(req, res),
);

productRoutes.get("/search", (req, res) => productController.findAll(req, res));
productRoutes.get("/:id", (req, res) => productController.findById(req, res));
productRoutes.put("/:id", validateSchema(createProductSchema), (req, res) =>
  productController.update(req, res),
);
productRoutes.delete("/:id", (req, res) => productController.delete(req, res));

export default productRoutes;
