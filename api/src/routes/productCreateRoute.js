const express = require('express');
const { createProduct } = require('../controllers/Product/createProduct');

const router = express.Router();

router.post('/product', createProduct);

module.exports = router;