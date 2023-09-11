const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Brand', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    }
  },
    {
      timestamps: false
    });
};