const express = require('express');
const brandHandler=require("../handlers/brandHandler")

const router = express.Router();

router.get('/', brandHandler);

module.exports = router;
