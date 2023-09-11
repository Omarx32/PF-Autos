const { Product, Brand } = require("../../db");

const getBrands = async () => {
  try {
    // Consulta todas las marcas en la base de datos
    const existingBrands = await Brand.findAll();

    // Si las marcas ya existen, no las vuelvas a crear
    if (existingBrands.length === 0) {
      // Si no existen, crea las marcas
      const brandNames = ["Toyota", "Ford", "Chevrolet"]; // Reemplaza con tus marcas reales
      const createdBrands = await Promise.all(
        brandNames.map((name) => Brand.create({ name }))
      );

      return createdBrands;
    }

    return existingBrands;
  } catch (error) {
    console.error("Error al obtener/marcar marcas:", error);
    throw new Error("Error al obtener marcas", error);
  }
};

module.exports = getBrands;
