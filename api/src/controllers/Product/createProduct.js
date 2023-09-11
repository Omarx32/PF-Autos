const { Category, Product, Brand } = require("../../db");

async function createProduct(req, res) {
  try {
    const productsInput = Array.isArray(req.body) ? req.body : [req.body];
    const products = [];

    for (const productInput of productsInput) {
      const {
        name,
        brand,
        description,
        price,
        stock,
        maker,
        model,
        color,
        kilometraje,
        direccion,
        category,
        image,
      } = productInput;

      if (
        !name ||
        !brand ||
        !description ||
        !price ||
        !stock ||
        !maker ||
        !model ||
        !color ||
        !kilometraje ||
        !direccion ||
        !image
      ) {
        throw new Error("Missing required data");
      }

      const newProduct = {
        name,
        brand,
        description,
        price,
        stock,
        maker,
        model,
        color,
        kilometraje,
        direccion,
        image,
      };

      const createdProduct = await Product.create(newProduct);

      const marcaNombre = brand; // Aquí asumo que marcaNombre es el nombre de la marca
      if (marcaNombre) {
        const marca = await Brand.findOne({ where: { name: marcaNombre } }); // Busca la instancia de la marca por nombre
        if (!marca) {
          throw new Error(`Marca "${marcaNombre}" no encontrada`);
        }
        await createdProduct.setBrand(marca); // Establecer la relación de marca
      }

      // Manejar las relaciones de categoría
      const categories = category;

      if (categories && categories.length > 0) {
        const categoriesExistentes = await Category.findAll({
          where: {
            name: categories,
          },
        });

        const categoriessNoExistentes = categories.filter(
          (gen) => !categoriesExistentes.map((g) => g.name).includes(gen)
        );

        const newCategories = await Category.bulkCreate(
          categoriessNoExistentes.map((name) => ({ name })),
          { returning: true }
        );

        await createdProduct.setCategories([
          ...categoriesExistentes,
          ...newCategories,
        ]);
      }

      products.push(createdProduct);
    }

    res.status(201).json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ mensaje: "Error al crear nuevos productos", error: error.message });
  }
}

module.exports = {
  createProduct,
};
