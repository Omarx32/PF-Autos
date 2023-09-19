
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../NavBar/NavBar.css";
import { Link } from "react-router-dom";
import Favorites from "../Favorites/Favorites";

const Navbar = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    if (storedFullName) {
      setFullName(storedFullName);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fullName");
    navigate("/");
    setFullName("");
    setIsLoggedIn(false);
  };

  return (
    <nav className="nav">
      <div className="divLogo">IGNITE MOTORS</div>
      <a href="#" className="nav__brand">
        {" "}
      </a>
      <ul className="nav__menu">
        <li className="nav__item">
          <a href="/home" className="nav__link nav__logout ">
            VEHICULOS
          </a>
        </li>
        <li className="nav__item">
          <a href="/About" className="nav__link nav__logout ">
            NOSOTROS
          </a>
        </li>
        <li className="nav__item">
          <a href="/Favorites" className="nav__link nav__logout ">
            FAVORITOS
          </a>
        </li>
        {isLoggedIn && (
          <li className="nav__item">
            <a href="/Form" className="nav__link nav__logout">
              VENDER VEHICULO
            </a>
          </li>
        )}
        {isLoggedIn && localStorage.getItem("role") === "admin" && (
          <li className="nav__item nav__logout " >
            <a href="/admin" className="nav__link">
              ADMINISTRADOR
            </a>
          </li>
        )}
        <li className="nav__item">
          {fullName ? (
            <>
              <span className="nav__welcome">¡Bienvenido, {fullName}! </span>
              <button className="nav__logout" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <div className="nav__link-group " >
                <a href="/registro" className="nav__link nav__logout ">
                  REGISTRATE
                </a>
                <a href="/Login" className="nav__link nav__logout">
                  INICIAR SESION
                </a>
              </div>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;