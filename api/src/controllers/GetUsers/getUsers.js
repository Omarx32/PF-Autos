const { Users, UsersGoogle } = require('../../db');

async function getUsers(req, res) {
  try {
    const usersApp = await Users.findAll();
    const usersGoogle = await UsersGoogle.findAll();
    const allUsers = [...usersApp, ...usersGoogle];
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la lista de usuarios', error });
  }
}

module.exports = {
  getUsers
};