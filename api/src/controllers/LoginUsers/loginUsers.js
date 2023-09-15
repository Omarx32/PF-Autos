const { Users } = require("../../db");
const { Op } = require('sequelize');

const loginUser = async (req, res) => {
  try {
    const { fullName, password } = req.body;

    // Buscar al usuario por nombre y contraseña
    const user = await Users.findOne({
      where: {
        fullName,
        password: {
          [Op.iLike]: password
        }
      }
    });

    if (user) {
      // Comprobar si el usuario está baneado
      if (user.isBanned) {
        res.status(403).json({ message: 'El usuario está baneado' });
      } else {
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
      }
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