const {
  getAll,
  getById,
  updateProduct,
  getProductByName,
} = require("../controllers/Product/productController");
const { createProduct } = require("../controllers/Product/createProduct");
const cleanArray = require("../cloudinary/cleanArray");

const getProducts = async (req, res) => {
  const { name } = req.query;
  const result = name ? await getProductByName(name) : await getAll();
  try {
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Cannot be process" });
  }
};
const getId = async (req, res) => {
  const { id } = req.params;
  try {
    const productss = await getById(id);

    res.status(200).json(productss);
  } catch (error) {
    res.status(500).json({ message: "theres a error" });
  }
};

const createHandler = async (req, res) => {
  try {
    const response = await createProduct(req, res);
    console.log(response.image);
    const form = cleanArray([response]);

    res.status(200).json(form);
  } catch (error) {
    res.status(404).json({ message: "Failed to create" });
  }
};

module.exports = {
  getProducts,
  getId,
  createHandler,
};
