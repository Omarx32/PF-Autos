const { Category } = require("../../db");

const getCategorys = async () => {
  try {
    const category = await Category.findAll();

    if (category.length === 0) {
      // Si no existen, crea las categorías
      const brandNames = [
        "Sedán",
        "Compacto",
        "Pickup",
        "Convertible",
        "Coupé",
        "Hatchback",
        "Deportivo",
        "Minivan",
        "Electrico",
        "Utilitario",
      ]; // Reemplaza con tus categorías reales
      const createdCategories = await Promise.all(
        brandNames.map((name) => Category.create({ name }))
      );

      return createdCategories;
    }
    return category;
  } catch (error) {
    throw new Error("Theres a Error");
  }
};

module.exports = getCategorys;
