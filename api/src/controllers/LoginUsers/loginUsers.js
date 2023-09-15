const { Users} = require("../../db");
const { Op } = require('sequelize');

const loginUser = async (req, res) => {
  try {
    const { fullName, password } = req.body;
    //console.log(password);
    const user = await Users.findOne({ 
      where: { 
        fullName,
        password: {
          [Op.iLike]: password // Hace la comparación sin importar mayúsculas y minúsculas
        }
      }
    });

    if (user) {
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error("Error al autenticar el usuario:", error);
    res.status(500).json({ error: 'Error al autenticar el usuario' });
  }
};

module.exports = {
  loginUser
};
