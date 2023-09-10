const mercadopago = require("mercadopago");
const { Users, Pay } = require("../../db");
const { MERCADOPAGO_API_KEY } = process.env;

mercadopago.configure({
  access_token: MERCADOPAGO_API_KEY,
});

const payment = async (req, res) => {
  try {
    const {
      fullName,
      email,
      numberPhone,
      amount,
      receiver,
      description,
      mp_preference_id,
      mp_payment_id,
      mp_status,
    } = req.body;

    // Buscar al usuario por su dirección de correo electrónico
    let user = await Users.findOne({
      where: { email },
    });

    if (!user) {
      // Si el usuario no existe, puedes manejarlo aquí
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const preference = await mercadopago.preferences.create({
      items: [
        {
          title: "Pago",
          unit_price: parseFloat(amount),
          currency_id: "ARS",
          quantity: 1,
        },
      ],
      back_urls: {
        success: "",
        failure: "/failure",
        webhook: "/webhook",
      },
      auto_return: "approved",
    });

    const preferenceId = preference.body.id;

    const newPayment = await Pay.create({
      fullName,
      email,
      numberPhone,
      amount: parseFloat(amount),
      receiver,
      description,
      mp_preference_id: preferenceId,
      mp_payment_id,
      mp_status,
      // Asociar el pago al usuario
      UserId: user.id, // Debes reemplazar "UserId" con el nombre real de la columna que establece la relación
    });

    res.status(201).json({
      preferenceId,
      newPayment,
      message: "Pago realizado con éxito",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la preferencia de pago" });
  }
};

module.exports = payment;
