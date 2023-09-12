import React from 'react';
import "../NavBar/NavBar.css";
import { Link } from 'react-router-dom';
import Favorites from '../favorites';

const Navbar = () => {
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
        <li className="nav__item">
          <a href="/registro" className="nav__link">
            REGISTRATE
          </a>
        </li>
        <li className="nav__item">
          <Link to="/Favorites">FAVORITOS</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

