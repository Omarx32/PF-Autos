const express = require('express');
const getCategorys = require('../controllers/Categorys/getCategorysCon'); 


const router = express.Router();

router.get('/', getCategorys)

module.exports = router