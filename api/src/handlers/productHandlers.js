const { getAll, getById, updateProduct, getProductByName } = require("../controllers/Product/productController")

const getProducts = async (req, res) => {
    const { name } = req.query;
    const result = name ? await getProductByName(name) : await getAll();
    try {
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: "Cannot be process" })
    }
}
const getId = async (req, res) => {
    const { id } = req.params;
    try {
        const productss = await getById(id);

        res.status(200).json(productss)
    } catch (error) {
        res.status(500).json({ message: 'theres a error' })
    }
}


module.exports = {
    getProducts,
    getId
}