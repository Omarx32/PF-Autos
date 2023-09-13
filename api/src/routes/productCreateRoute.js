const express = require('express');
const { createHandler } = require('../handlers/productHandlers');

const router = express.Router();

router.post('/product', createHandler);

module.exports = router;