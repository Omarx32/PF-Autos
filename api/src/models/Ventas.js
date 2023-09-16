const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
     sequelize.define(
        "Ventas",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            producto: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            monto: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            comision: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            cantidad: {  // Nuevo campo "cantidad"
                type: DataTypes.INTEGER,  // Tipo de dato para la cantidad (puede cambiar según tus necesidades)
                allowNull: false,  // Si la cantidad es obligatoria
            },
            clienteId: {
                type: DataTypes.UUID,  
                allowNull: false,
              },
            fechaVenta: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
        },
        {
            timestamps: false, 
          
        }
    );

    
};
