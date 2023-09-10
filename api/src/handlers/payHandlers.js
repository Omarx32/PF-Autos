const getAllPagos = require("../controllers/Pagos/getallPagos");

const handleGetAllPays = async (req, res) => {
  try {
    const pagos = await getAllPagos();
    return res.status(200).json(pagos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleGetAllPays;
