const { Users, Ventas } = require('../../db');

const simulacionventa = async (req, res) => {
  try {
    // Obtener el valor de venta del carro, el clienteId y el nombre del producto desde la solicitud JSON
    const { valorDeVenta, clienteId, nombreProducto,cantidad, fechaVenta } = req.body;

    // Buscar el cliente por su ID
    const cliente = await Users.findByClientId(clienteId);
    
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Obtener el nombre del cliente
    const nombreCliente = cliente.fullName;

    // Calcular la comisión siempre como el 5%
    const comision = (5 / 100) * valorDeVenta;

    // Calcular el monto total después de la comisión
    const montoTotal = valorDeVenta - comision;

 
   
    await Ventas.create({
      producto: nombreProducto, 
      cantidad:cantidad,
      monto: montoTotal,
      comision: comision,
      clienteId: clienteId,
      fechaVenta: fechaVenta
    });

    // Simular una compra exitosa
    const simulatedResponse = {
      status: 'approved',
      comision: comision,
      montoTotal: montoTotal,
      nombreCliente: nombreCliente,
      nombreProducto: nombreProducto,
      cantidad:cantidad,
      fechaVenta: fechaVenta
    };

    // Devuelve la respuesta simulada como JSON
    res.json(simulatedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al simular la compra' });
  }
};

module.exports = {
  simulacionventa,
};


module.exports = {
  simulacionventa,
};

