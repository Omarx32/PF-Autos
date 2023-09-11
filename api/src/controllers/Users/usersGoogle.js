const { UsersGoogle } = require('../../db'); // Asegúrate de importar el modelo

async function createUSersGoogle(req, res) {
  try {
    const { email, familyName, givenName, googleId, imageUrl, name,location } = req.body;

    // Crea un nuevo usuario utilizando el modelo
    const usuario = await UsersGoogle.create({
      email,
      familyName,
      givenName,
      googleId,
      imageUrl,
      name,
      location
    });

    // Envía una respuesta de éxito
    res.status(201).json({ message: 'Usuario guardado correctamente', usuario });
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = {  createUSersGoogle };
