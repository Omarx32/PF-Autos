

const { Product, Category, Product_Category } = require("../../db");



const diacriticless = require("diacriticless");

const filterCars = async (categorycar) => {
  const carsFilt = [];
  try {
    const catcar = diacriticless(categorycar.toLowerCase());

    const cars = await Product.findAll({
      include: {
        model: Category,
        attruibutes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    for (let i = 0; i < cars.length; i++) {
      for (let j = 0; j < cars[i].Categories.length; j++) {
        cars[i].Categories[j].dataValues.name = diacriticless(
          cars[i].Categories[j].dataValues.name.toLowerCase()
        );
      }
    }

    console.log(cars);
    for (let i = 0; i < cars.length; i++) {
      if (Array.isArray(cars[i].Categories)) {
        for (let j = 0; j < cars[i].Categories.length; j++) {
          if (
            cars[i].Categories[j].dataValues.name === catcar &&
            !carsFilt.includes(cars[i])
          ) {
            carsFilt.push(cars[i]);
          }
        }
      }
    }

    if (!carsFilt.length) {
      return "No hay auto de tal categoría";
    }
    return carsFilt;
  } catch (error) {
    console.error(error);
    throw new Error("No se encontró el auto", error);
  }
};

module.exports = filterCars;
