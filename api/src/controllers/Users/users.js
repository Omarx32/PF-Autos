const { Users } = require('../../db.js');

async function emailAlreadyExists(email) {
  const user = await Users.findOne({ where: { email } });
  return user !== null;
}

async function createUser(req, res) {
  try {
    const userData = req.body;

    const isEmailTaken = await emailAlreadyExists(userData.email);

    if (isEmailTaken) {
      return res.status(400).json({ mensaje: 'Este correo electrónico ya está registrado' });
    }

    const newUser = await Users.create(userData);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el usuario', error });
  }
}

module.exports = {
  createUser,
  emailAlreadyExists
};
