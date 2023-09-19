const express = require('express');
const {getProducts, getId} = require('../handlers/productHandlers')
const { ProductsAdmin } =require("../controllers/ProductsAdmin/ProductsAdmin")
const{simulacionventa} =require("../controllers/Ventas/simulacionventa")
const{obtenerVentas} =require("../controllers/Ventas/obtenerVentas")
const router = express.Router();

router.get("/getProduct", getProducts)
router.get("/getSell",obtenerVentas)
router.get("/:id", getId)
router.put("/productAdmin/:id",ProductsAdmin)
router.post("/sell",simulacionventa)
module.exports = router;