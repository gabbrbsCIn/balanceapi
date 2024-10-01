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
      Condominium.hasMany(models.Section, {
        foreignKey: "condominiumId",
      });
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
      residentAdminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Residents",
          key: "id",
        },
      }
    },
    {
      sequelize,
      modelName: "Condominium",
      tableName: "Condominiums",
    }
  );
  return Condominium;
};
