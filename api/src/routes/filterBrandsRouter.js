const express = require('express');
const { filterBrandHandler }= require("../handlers/Handler")
const router = express.Router();

router.get('/', filterBrandHandler);

module.exports = router;