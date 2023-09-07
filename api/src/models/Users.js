const { DataTypes, ValidationError } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Asegura que el correo electrónico sea único
      },
      password: {
        type: DataTypes.STRING, // Utiliza el tipo de datos STRING para almacenar contraseñas
        allowNull: false,
        validate: {
          isPasswordValid(value) {
            if (!/(?=.*[A-Za-z])(?=.*\d).{8,}/.test(value)) {
              throw new ValidationError("La contraseña debe tener al menos 8 caracteres y contener letras y números.");
            }
          },
        },
      },
      location: {
        type: DataTypes.STRING, // Cambia el tipo de datos según el formato de ubicación que desees almacenar
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("Admin", "Usuario"),
        allowNull: true,
        defaultValue: "Usuario",
      },
      status: {
        type: DataTypes.ENUM("Activo", "Baneado"),
        allowNull: true,
        defaultValue: "Activo",
      },
    },
    {
      timestamps: false,
    }
  );
};

