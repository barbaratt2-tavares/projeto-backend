import { Router } from "express";
import { validateSchema } from "../middlewares/ValidateSchemaMiddleware";
import { createCategorySchema } from "../requests/CreateCategoryRequest";
import { CategoryController } from '../controllers/CategoryController';


const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.post("/", validateSchema(createCategorySchema), (req, res) =>
  categoryController.create(req, res),
);

categoryRoutes.get("/search", (req, res) => categoryController.findAll(req, res));
//categoryRoutes.get("/:id", (req, res) => categoryController.findById(req, res));
/*categoryRoutes.put("/:id", validateSchema(createCategorySchema), (req, res) =>
  categoryController.update(req, res),
);*/
//categoryRoutes.delete("/:id", (req, res) => categoryController.delete(req, res));

export default categoryRoutes;
