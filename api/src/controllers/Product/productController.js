
const { Product, Category } = require("../../db");


const getProductByName = async (name) => {
  const productName = await Product.findAll({
    where: { name },
    include: [
      {
        model: Category,
      },
    ],
  });
  return [...productName];
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productInput = req.body;

    // Buscar el producto por su ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    // Actualizar las propiedades del producto
    await product.update(productInput);

    // Si se proporcionan nuevas categorías
    const { category } = productInput;
    if (category && category.length > 0) {
      const categoriesExistentes = await Category.findAll({
        where: {
          name: category,
        },
      });

      const categoriessNoExistentes = category.filter(
        (gen) => !categoriesExistentes.map((g) => g.name).includes(gen)
      );

      const newCategories = await Category.bulkCreate(
        categoriessNoExistentes.map((name) => ({ name })),
        { returning: true }
      );

      await product.setCategories([...categoriesExistentes, ...newCategories]);
    }

    res.status(200).json({ mensaje: "Producto actualizado exitosamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar el producto", error });
  }
};

const getAll = async (req, res) => {
  const products = await Product.findAll({
    include: [
      {
        model: Category,
        attributes: ["name"],
      },
    ],
  });

  return [...products];
};

const getById = async (id) => {
  const product = await Product.findByPk(id, {
    include: [
      {
        model: Category,
        attributes: ["name"],
      },
    ],
  });
  return product;
};

module.exports = {
  getProductByName,
  updateProduct,
  getAll,
  getById,
};
