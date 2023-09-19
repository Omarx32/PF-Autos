const { Ventas } = require('../../db');

const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Ventas.findAll();
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message }); 
  }
};

module.exports = {
  obtenerVentas
};
