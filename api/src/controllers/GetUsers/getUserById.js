const { Users, UsersGoogle } = require('../../db');

async function getUserById(req, res) {
  try {
    const {id}=req.params;
    const user= await Users.findOne({
        where: {id}
    })

    const userGoogle= await UsersGoogle.findOne({
        where: {id}
    })

    res.status(200).json(user? user : userGoogle);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la lista de usuarios', error });
  }
}

module.exports= getUserById;