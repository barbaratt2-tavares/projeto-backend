"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const ProductImage = sequelize.define(
  "ProductImage",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProductImage",
    tableName: "product_images",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

ProductImage.associate = (models) => {
  ProductImage.belongsTo(models.Product, {
    foreignKey: "product_id",
    as: "product",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });
};

module.exports = ProductImage;
