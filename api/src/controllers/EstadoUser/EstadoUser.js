const { Users } = require("../../db");

const estadoUser = async (req, res) => {
    const userId = req.params.id;
    const { status } = req.body;
  
    if (!status) {
      return res.status(400).json({ message: "El campo 'status' es obligatorio" });
    }
  
    try {
      // Buscar al usuario por su ID
      const user = await Users.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // Actualizar el estado del usuario
      user.status = status;
      await user.save();
  
      return res.json({ message: `El usuario ${user.fullName} ha sido ${status === "Baneado" ? "baneado" : "desbaneado"}.` });
    } catch (error) {
      console.error("Error al banear/desbanear el usuario:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  
  module.exports = { estadoUser };