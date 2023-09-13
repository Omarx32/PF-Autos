const express = require("express");
const router = express.Router();
const handlePlaceOrder = require("../handlers/handlePlaceOrder");
const handleSuccessfulPayment = require("../handlers/handleSuccessfulPayment");

router.post("/createpreference", handlePlaceOrder);
router.get("/success", handleSuccessfulPayment);
// router.get("/failure", handleFailureOrder);

module.exports = router;
