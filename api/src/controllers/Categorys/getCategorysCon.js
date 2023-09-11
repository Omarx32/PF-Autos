const { Category } = require("../../db");

const getCategorys = async (req, res) => {
  try {
    const category = await Category.findAll();

    return category;
  } catch (error) {
    throw new Error("Theres a Error");
  }
};

module.exports = getCategorys;
