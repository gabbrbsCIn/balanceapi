"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FinantialTransactions extends Model {
    static associate(models) {
      FinantialTransactions.belongsTo(models.Resident, {
        foreignKey: "residentId",
      });
    }
  }
  FinantialTransactions.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      residentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Residents",
          key: "id",
        },
      },
      transactionData: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      paid: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "FinantialTransactions",
    }
  );

  return FinantialTransactions;
};
