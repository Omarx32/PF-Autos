const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "UsersGoogle",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      familyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      givenName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {  // Agregamos el campo 'location'
        type: DataTypes.STRING, // O el tipo de dato apropiado para la ubicación
        allowNull: true, // Puede ser opcional
      },
    },
    {
      timestamps: false,
    }
  );
};
