"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Section.hasMany(models.Apartment, {
        foreignKey: "sectionId",
      });

      // A Section belongs to a Condominium
      Section.belongsTo(models.Condominium, {
        foreignKey: "condominiumId",
      });
    }
  }
  Section.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      condominiumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Condominiums",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Section",
      indexes: [
        {
          unique: true,
          fields: ["name", "condominiumId"],
        },
      ],
    }
  );
  return Section;
};
