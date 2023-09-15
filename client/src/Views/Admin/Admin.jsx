import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../../redux/action/action";
import axios from 'axios';

import "./Admin.css"

const Admin = () => {
    const cars = useSelector((state) => state.cars);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCars());
    }, []);

    const [usersData, setUsersData] = useState([]); // Declarar usersData en el estado

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users/getUsers');
                const usersData = response.data; // Suponiendo que los datos se encuentran en la propiedad "data" de la respuesta
                console.log("users", usersData);
                // Actualiza el estado con los datos de usuarios
                setUsersData(usersData);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleTogglePublish = async (id, isPublished) => {
        try {
            await axios.put(`http://localhost:3001/product/productAdmin/${id}`, {
                isPublished: !isPublished,
            });
            dispatch(getCars());
        } catch (error) {
            console.error('Error al actualizar el estado de publicación:', error);
        }
    };


    const handleBanUser = async (id, isBanned) => {
        try {
            await axios.put(`http://localhost:3001/users/adminUser/${id}`, {
                status: !isBanned,
            });
            // Actualiza la lista de usuarios después de banear/desbanear
            const updatedUsers = usersData.map((user) => {
                if (user.id === id) {
                    return { ...user, isBanned: !isBanned };
                }
                return user;
            });
            setUsersData(updatedUsers);
        } catch (error) {
            console.error('Error al banear/desbanear el usuario:', error);
        }
    };

    const initialSales = [
        { id: 1, product: 'Producto 1', amount: 1500 },
        { id: 2, product: 'Producto 2', amount: 2200 },
        { id: 3, product: 'Producto 3', amount: 800 },
    ];
    const [car, setCars] = useState([]);
    const [sales, setSales] = useState(initialSales);

    const totalSales = sales.reduce((total, sale) => total + sale.amount, 0);

    return (
        <div className="admin-container">
            <div className="users-section">
                {usersData.map((user) => (
                    <div key={user.id}>
                        <h3>{user.fullName}</h3>
                        <p>{user.id}</p>
                        <button onClick={() => handleBanUser(user.id, user.isBanned)}>
                            {user.isBanned ? 'Desbanear' : 'Banear'}
                        </button>
                    </div>
                ))}
            </div>
            <div className='posts-section'>
                {cars.map((car) => (
                    <div key={car.id}>
                        <h3>{car.name}</h3>
                        <p>{car.id}</p>
                        <button onClick={() => {
                            console.log("productId:", car.id); // Agrega esta línea
                            handleTogglePublish(car.id, car.isPublished);
                        }}>
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