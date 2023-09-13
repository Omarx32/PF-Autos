import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../../redux/action/action";


import "./Admin.css"

const Admin = () => {
    const cars = useSelector((state) => state.cars);
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getCars());
    }, []);

    const handleTogglePublish = async (productId, isPublished) => {
        try {
            await axios.put(`http://localhost:3001/product/update/${productId}`, {
                isPublished: !isPublished, // Cambiar el estado opuesto
            });
            // Recargar la lista de vehículos después de la actualización
            dispatch(getCars()); // Asegúrate de que esta acción obtenga los vehículos actualizados
        } catch (error) {
            console.error('Error al actualizar el estado de publicación:', error);

        }
    };





    // Supongamos que tienes estos datos iniciales
    const initialUsers = [
        { id: 1, name: 'Usuario 1' },
        { id: 2, name: 'Usuario 2' },
        // Agrega más usuarios si es necesario
    ];

    const initialSales = [
        { id: 1, product: 'Producto 1', amount: 1500 },
        { id: 2, product: 'Producto 2', amount: 2200 },
        { id: 3, product: 'Producto 3', amount: 800 },
        // Agrega más ventas ficticias si es necesario
    ];

    const [users, setUsers] = useState(initialUsers);
    const [car, setCars] = useState([]);
    const [sales, setSales] = useState(initialSales);


    const totalSales = sales.reduce((total, sale) => total + sale.amount, 0);
    return (
        <div className="admin-container">
            <div className="users-section">
                <h2>Usuarios</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            </div>
            <div className='posts-section'>
                {cars.map((car) => (
                    <div key={car.id}>
                        <h3>{car.name}</h3>
                        <p>{car.id}</p>
                        {/* Agrega aquí más campos del objeto car si es necesario */}
                        <button onClick={() => handleTogglePublish(car.id, car.isPublished)}>
                            {car.isPublished ? 'Despublicar' : 'Publicar'}
                        </button>
                    </div>
                ))}
            </div>
            <div className="sales-section">
                <h2>Estadísticas de Ventas</h2>
                <p>Total de Ventas del Mes: ${totalSales}</p>
                <ul>
                    {sales.map((sale) => (
                        <li key={sale.id}>
                            <span>{sale.product}: ${sale.amount}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Admin;    