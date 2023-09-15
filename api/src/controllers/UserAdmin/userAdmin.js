const { PassAdmins } = require("../../db");

const userAdmins = async (req, res) => {
  try {
    const { username, password } = req.body; // Obtén las credenciales enviadas desde el front-end
    console.log("Credenciales recibidas:", username, password);
    const adminExiste = await PassAdmins.findOne({ where: { es_administrador: true } });
    if (!adminExiste) {
      await PassAdmins.create({
        username: 'Fabian Salcedo',
        password: '12345678Fas',
        es_administrador: true,
      });
      res.status(200).json({ message: 'Administrador creado exitosamente' });
    } else {
      // Verifica si las credenciales coinciden con el usuario administrador 
      if (adminExiste.username === username && adminExiste.password === password) {
        res.status(200).json({ message: 'Inicio de sesión modo  Administrador' });
      } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    }
  } catch (error) {
    console.error("Error al crear el administrador:", error);
    res.status(500).json({ error: 'Error al crear el administrador' });
  }
};

module.exports = {
  userAdmins
};

