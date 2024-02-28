"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Axolotl extends Model {
    static associate({ Comment }) {
      Axolotl.hasMany(Comment, { foreignKey: "axolotl_id", as: "comments" });
    }
  }

  Axolotl.init(
    {
      axolotlId: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      habitat: DataTypes.STRING,
      location: DataTypes.STRING,
      pic: DataTypes.STRING,
      discovered: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Axolotl", // Removed 'underscored' option, as it's not needed here
    }
  );

  return Axolotl;
};
