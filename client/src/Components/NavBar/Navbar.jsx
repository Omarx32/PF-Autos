
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../NavBar/NavBar.css";
// import { Link } from 'react-router-dom'
import Favorites from '../favorites';

const Navbar = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    // Obtener el nombre del usuario del localStorage al cargar la página
    const storedFullName = localStorage.getItem('fullName');
    if (storedFullName) {
      setFullName(storedFullName);
    }
  }, []);

  const handleLogout = () => {
    // Eliminar el nombre del usuario del localStorage al cerrar sesión
    localStorage.removeItem('fullName');
    navigate('/');
    setFullName('');
    // Aquí puedes agregar cualquier otra lógica para cerrar la sesión, como redirigir al usuario a la página de inicio de sesión, etc.
  };

  return (
    <nav className="nav">
      <div className="divLogo">IGNITE MOTORS</div>
      <a href="#" className="nav__brand">
        {" "}
      </a>
      <ul className="nav__menu">
        <li className="nav__item">
          <a href="/home" className="nav__link">
            VEHICULOS
          </a>
        </li>
        <li className="nav__item">
          <a href="/About" className="nav__link">
            NOSOTROS
          </a>
        </li>
        <li className="nav__item">
          <a href="/Form" className="nav__link">
            VENDER VEHICULO
          </a>
        </li>
        {fullName ? (
          <li className="nav__item">
            <span className="nav__welcome">Bienvenido {fullName} 🚗</span>
            <button className="nav__logout" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </li>
        ) : (
          <>
            <li className="nav__item">
              <a href="/registro" className="nav__link">
                REGISTRATE
              </a>
            </li>
            <li className="nav__item">
              <a href="/Login" className="nav__link">
                INICIAR SESION
              </a>
            </li>
          </>
        )}
        {/* <li className="nav__item">
          <Link to="/Favorites">FAVORITOS</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;