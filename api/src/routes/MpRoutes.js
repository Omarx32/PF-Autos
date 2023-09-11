const express = require("express");
const router = express.Router();
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "TEST-2664276290314152-091023-a8dbce86749b18cb2960e492a1d25bea-1476921582",
});

router.post("/createpreference", (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "http://localhost:5173",
      failure: "http://localhost:5173",
      pending: "",
    },
    auto_return: "approved",
  };
  router.get("/mp", (req, res) => {
    res.send("El servidor de Mercado Pago funciona! :)");
  });
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
