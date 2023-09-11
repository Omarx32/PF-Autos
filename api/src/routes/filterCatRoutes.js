const express = require('express');
const { createHandler, filterCatHandler }= require("../handlers/Handler")
const router = express.Router();

router.post('/product', createHandler);
router.get('/', filterCatHandler);

module.exports = router;
