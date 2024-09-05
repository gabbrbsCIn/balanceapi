"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Condominium extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Condominium.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING, 
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "Condominium",
    }
  );
  return Condominium;
};
