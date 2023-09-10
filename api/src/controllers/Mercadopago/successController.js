const { Pay } = require("../../db");

const successPayment = async (req, res) => {
  try {
    const { PayId, mp_preference_id, mp_payment_id, mp_status } = req.query;

    const pago = await Pay.findByPk(PayId);

    if (!pago) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }

    pago.mp_payment_id = mp_payment_id;
    pago.mp_status = mp_status;
    await pago.save();

    res.status(200).json({ message: "Datos de pago actualizados con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar datos de pago" });
  }
};

module.exports = successPayment;
