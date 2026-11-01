import { Router } from "express";
import { validateSchema } from "../middlewares/ValidateSchemaMiddleware";
import { createUserSchema } from "../requests/CreateUserRequest";
import { UserController } from "../controllers/UserController";
import AuthController from "../controllers/AuthController";
import { verifyToken } from "../middlewares/AuthMiddleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", verifyToken, validateSchema(createUserSchema), (req, res) =>
  userController.create(req, res),
);
userRoutes.post("/token", (req, res) => AuthController.login(req, res));

userRoutes.get("/", (req, res) => userController.findAll(req, res));
userRoutes.get("/:id", (req, res) => userController.findById(req, res));
userRoutes.put("/:id", verifyToken, validateSchema(createUserSchema), (req, res) =>
  userController.update(req, res),
);
userRoutes.delete("/:id", verifyToken, (req, res) => userController.delete(req, res));


export default userRoutes;
