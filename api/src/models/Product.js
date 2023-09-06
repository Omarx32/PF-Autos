const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Product", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maker: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    model: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    color:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    kilometraje:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    direccion:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false,
  });
};