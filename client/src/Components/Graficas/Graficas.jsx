import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, BarElement, Title, Filler,} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, BarElement, Title, Filler );


const Graficas = () => {
    const [ventas, setVentas] = useState([]);
    const [datosCargados, setDatosCargados] = useState(false);
    const [comisionesPorDia, setComisionesPorDia] = useState({});


    const obtenerDatosDeVentas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/product/getSell');
            if (response.status === 200) {
                const data = response.data;
                setVentas(data);
                setDatosCargados(true);
                const comisionesDia = {};
            data.forEach((venta) => {
                const fecha = venta.fechaVenta;
                if (comisionesDia[fecha]) {
                    comisionesDia[fecha] += venta.comision;
                } else {
                    comisionesDia[fecha] = venta.comision;
                }
            });
            setComisionesPorDia(comisionesDia);
            } else {
                throw new Error('Error al obtener los datos de ventas');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        obtenerDatosDeVentas();
    }, []);

    // Crear un objeto para almacenar los totales de ventas y comisiones por producto
    const productosTotales = {};

    if (datosCargados) {
        ventas.forEach((venta) => {
            if (productosTotales[venta.producto]) {
                productosTotales[venta.producto].ventas += venta.monto;
                productosTotales[venta.producto].comisiones += venta.comision;
            } else {
                productosTotales[venta.producto] = {
                    ventas: venta.monto,
                    comisiones: venta.comision,
                };
            }
        });

        // Obtener nombres de productos y calcular porcentajes
        const productos = Object.keys(productosTotales);
        const ventasPorProducto = productos.map((producto) => productosTotales[producto].ventas);
        const comisionesPorProducto = productos.map((producto) => productosTotales[producto].comisiones);

        const pieChartData = {
            labels: productos,
            datasets: [
                {
                    data: ventasPorProducto,
                    backgroundColor: ['rgba(75, 192, 192, 0.6)'],
                    label: 'Ventas',
                },
                {
                    data: comisionesPorProducto,
                    backgroundColor: ['rgba(255, 99, 132, 0.6)'],
                    label: 'Comisiones',
                },
            ],
        };

        const barrasComisionesPorDiaData = {
            labels: Object.keys(comisionesPorDia),
            datasets: [
                {
                    label: 'Comisiones por Día',
                    data: Object.values(comisionesPorDia),
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                },
            ],
        };

        return (
            <div>
                <h1>Ventas por marca</h1>
                <Pie data={pieChartData} />
                <h1>Comisiones por dia</h1>
                <Bar data={barrasComisionesPorDiaData} />

            </div>
        );
    }

    return <div>Loading...</div>; // Puedes mostrar un indicador de carga mientras los datos se cargan.
};

export default Graficas;