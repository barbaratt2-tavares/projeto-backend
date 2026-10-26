const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

Category.associate = (models) => {
  Category.belongsToMany(models.Product, {
    through: models.ProductCategory,
    foreignKey: "category_id",
    otherKey: "product_id",
    as: "products",
  });
};

module.exports = Category;
