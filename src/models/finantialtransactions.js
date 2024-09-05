"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FinantialTransactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
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
    },
    {
      sequelize,
      modelName: "FinantialTransactions",
    }
  );

  
  return FinantialTransactions;
};
