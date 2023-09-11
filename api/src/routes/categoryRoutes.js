const express = require("express");
const categoryHandler = require("../handlers/categoryHandler");

const router = express.Router();

router.get("/", categoryHandler);

module.exports = router;
