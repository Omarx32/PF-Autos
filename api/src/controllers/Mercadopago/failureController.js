const failurePayment = (req, res) => {
  try {
    window.alert("Algo salió mal y tu pago no se ha realizado");
    res.status(400).redirect("");
    /*res.send('Pago Rechazado')*/
  } catch (error) {
    console.error(error);
  }
};

module.exports = failurePayment;
