import React from 'react';
import "../NavBar/NavBar.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="divLogo">
        Ignite Motors
      </div>
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
          <a href="#" className="nav__link">
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
      </ul>
    </nav>
  );
};

export default Navbar;

