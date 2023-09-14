const express = require('express');
const {getProducts, getId} = require('../handlers/productHandlers')
const ProductsAdmin =require("../controllers/ProductsAdmin/ProductsAdmin")
const router = express.Router();

router.get("/getProduct", getProducts)
router.get("/:id", getId)
router.put("/productAdmin",ProductsAdmin)
module.exports = router;