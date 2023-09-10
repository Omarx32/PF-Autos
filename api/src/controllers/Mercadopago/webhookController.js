const mercadopago = require("mercadopago");
const { Pay } = require("../../db");

const webHookPayment = async (req, res) => {
  const { payment, clienteId } = req.query;
  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);
      const { mp_payment_id, mp_status, Id } = data; // Asegúrate de que estos valores estén disponibles en el objeto 'data'.

      const pago = await Pay.findByPk(Id);

      if (pago) {
        pago.mp_payment_id = mp_payment_id;
        pago.mp_status = mp_status;
        await pago.save();
      }
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = webHookPayment;
