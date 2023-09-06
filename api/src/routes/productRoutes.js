const express = require('express');
const {getProducts, getId} = require('../handlers/productHandlers')
const router = express.Router();

router.get("/getProduct", getProducts)
router.get("/:id", getId)
module.exports = router;