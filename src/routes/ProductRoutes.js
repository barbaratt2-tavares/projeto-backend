import { Router } from "express";
import { validateSchema } from "../middlewares/ValidateSchemaMiddleware";
import { createProductSchema } from "../requests/CreateProductRequest";
import { ProductController } from "../controllers/ProductController";
import { verifyToken } from "../middlewares/AuthMiddleware";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.post("/", verifyToken, validateSchema(createProductSchema), (req, res) =>
  productController.create(req, res),
);

productRoutes.get("/search", (req, res) => productController.findAll(req, res));
productRoutes.get("/:id", (req, res) => productController.findById(req, res));
productRoutes.put("/:id", verifyToken, validateSchema(createProductSchema), (req, res) =>
  productController.update(req, res),
);
productRoutes.delete("/:id", verifyToken, (req, res) => productController.delete(req, res));

export default productRoutes;
