const { Category, Product, Brand } = require("../../db");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dfg0dgm9r",
  api_key: "589471853742194",
  api_secret: "uU8OMiDxQdFYnJibegcyC0kzIqw",
});

async function createProduct(req, res) {
  const productsInput = Array.isArray(req.body) ? req.body : [req.body];

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

    const imageUrls = [];
    for (const imageData of image) {
      const result = await cloudinary.uploader.upload(imageData, {
        folder: "productsDetail",
      });
      console.log("result:cloudinary", result);
      imageUrls.push(result.secure_url);
    }

    const newProduct = {
      name,
      category,
      brand,
      description,
      price,
      stock,
      maker,
      model,
      color,
      kilometraje,
      direccion,
      image: imageUrls,
    };
    console.log(newProduct.image);

    const createdProduct = await Product.create(newProduct);
    const marcaNombre = newProduct.brand; // Aquí asumo que marcaNombre es el nombre de la marca
    if (marcaNombre) {
      const marca = await Brand.findOne({ where: { name: marcaNombre } }); // Busca la instancia de la marca por nombre
      if (!marca) {
        throw new Error(`Marca "${marcaNombre}" no encontrada`);
      }
      await createdProduct.setBrand(marca); // Establecer la relación de marca
    }
    const categorys = newProduct.category;
    if (categorys) {
      const category = await Category.findOne({ where: { name: categorys } });
      if (!categorys) {
        throw new Error(`Categoría "${category}" no encontrada`);
      }
      await createdProduct.setCategory(category);
    }

    // Manejar las relaciones de categoría
    return createdProduct;
  }
}

module.exports = {
  createProduct,
};
