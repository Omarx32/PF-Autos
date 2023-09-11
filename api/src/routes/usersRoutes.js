    const express = require('express');
    const users = require('../controllers/Users/users'); // Asegúrate de importar el controlador correcto
    const usersGoogle = require("../controllers/Users/usersGoogle")


    const router = express.Router();

    // Ruta para crear un usuario
    router.post('/user', users.createUser);
    router.post("/user/google",usersGoogle. createUSersGoogle)

    // Otras rutas relacionadas con usuarios, como actualizar, eliminar, obtener, etc.
    // router.put('/user/:id', UserController.updateUser);
    // router.delete('/user/:id', UserController.deleteUser);
    // router.get('/user/:id', UserController.getUserById);
    // router.get('/users', UserController.getAllUsers);

    module.exports = router;
