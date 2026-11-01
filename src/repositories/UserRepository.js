const User = require("../models/User");
const bcrypt = require("bcryptjs");

class UserRepository {
  async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    return await User.create(data);
  }

  async findAll() {
    return await User.findAll();
  }

  async findById(id) {
    return await User.findByPk(id);
  }

  async update(id, data) {
    const user = await User.findByPk(id);
    return await user.update(data);
  }

  async delete(id) {
    const user = await User.findByPk(id);
    await user.destroy();
  }
}

module.exports = new UserRepository();
