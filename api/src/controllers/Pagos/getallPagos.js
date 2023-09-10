const { Users, Pay } = require("../../db");

const getAllPagos = async () => {
  try {
    const allPagos = await Pay.findAll({
      include: {
        model: Users,
        as: "cliente",
        attributes: ["email", "numberPhone"],
      },
    });
    return allPagos;
  } catch (error) {
    console.log(error);
  }
};

module.exports = getAllPagos;
