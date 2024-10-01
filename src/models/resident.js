"use strict";
const { Model } = require("sequelize");
const { FinantialTransactions } = require("./finantialtransactions");
module.exports = (sequelize, DataTypes) => {
  class Resident extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Resident.belongsTo(models.Apartment, {
        foreignKey: "apartmentId",
      });
    }
  }
  Resident.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      apartmentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Apartments",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Resident",
    }
  );

  return Resident;
};
