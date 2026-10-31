"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const ProductCategory = sequelize.define(
  "ProductCategory",
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "products",
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "ProductCategory",
    tableName: "product_categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

ProductCategory.associate = (models) => {
  ProductCategory.belongsTo(models.Product, {
    foreignKey: "product_id",
    as: "product",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  ProductCategory.belongsTo(models.Category, {
    foreignKey: "category_id",
    as: "category",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });
};

module.exports = ProductCategory;
