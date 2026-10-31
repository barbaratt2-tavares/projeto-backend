"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const ProductOption = sequelize.define(
  "ProductOption",
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shape: {
      type: DataTypes.ENUM("square", "circle"),
      allowNull: true,
      defaultValue: "square",
    },
    radius: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.ENUM("text", "color"),
      allowNull: true,
      defaultValue: "text",
    },
    values: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProductOption",
    tableName: "product_options",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

ProductOption.associate = (models) => {
  ProductOption.belongsTo(models.Product, {
    foreignKey: "product_id",
    as: "product",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });
};

module.exports = ProductOption;
