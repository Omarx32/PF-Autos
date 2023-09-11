const Pays = require("../controllers/Mercadopago/paymentController");
const webhookPayment = require("../controllers/Mercadopago/webhookController");
const successPayment = require("../controllers/Mercadopago/successController");
const failurePayment = require("../controllers/Mercadopago/failureController");
const handleGetAllPays = require("../handlers/payHandlers");

const express = require("express");

const router = express.Router();
//Routes MERCADO PAGO(y POST PAGOS)
router.post("/payment", Pays);
router.post("/success", successPayment);
router.get("/failure", failurePayment);
router.post("/webhook", webhookPayment);
router.post("/savePayment");

//PAGOS
router.get("/all", handleGetAllPays);

module.exports = router;
