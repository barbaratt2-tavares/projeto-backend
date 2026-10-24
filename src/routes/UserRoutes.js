import { Router } from "express";
import { validateSchema } from "../middlewares/ValidateSchemaMiddleware";
import { createUserSchema } from "../requests/CreateUserRequest";
import { UserController } from '../controllers/UserController';


const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", validateSchema(createUserSchema), (req, res) =>
  userController.create(req, res),
);

userRoutes.get("/", (req, res) => userController.findAll(req, res));
userRoutes.get("/:id", (req, res) => userController.findById(req, res));
userRoutes.put("/:id", validateSchema(createUserSchema), (req, res) =>
  userController.update(req, res),
);
userRoutes.delete("/:id", (req, res) => userController.delete(req, res));

export default userRoutes;
