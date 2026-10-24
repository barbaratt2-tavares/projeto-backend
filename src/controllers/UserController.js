import UserRepository from "../repositories/UserRepository";

export class UserController {
  async create(req, res) {
    try {
      const createdUser = await UserRepository.create(req.body);
      return res.status(201).json(createdUser);
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
      const users = await UserRepository.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({ message: error.message });
    }
  }

  async findById(req, res) {
    try {
      const user = await UserRepository.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const user = await UserRepository.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const updatedUser = await UserRepository.update(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const user = await UserRepository.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const deletedUser = await UserRepository.delete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.log(error);
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({ message: error.message });
    }
  }
}
