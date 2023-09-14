import React, { useState } from "react";
import "../FormLogin/FormLogin.css";
import { Link } from "react-router-dom";
const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !role) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Inicio de sesión exitoso
        alert(data.message);
        localStorage.setItem("fullName", username);
        window.location.href = "/Home";
      } else {
        // Credenciales incorrectas
        alert(data.message);
      }
    } catch (error) {
      console.error("Error al enviar las credenciales:", error);
    }
  };

  return (
    <div className="formulinocat">
      <div className="contenedorF">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="role">Rol:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="admin">Admin</option>
              <option value="usuario">Usuario</option>
            </select>
          </div>
          <button className="botonardo" type="submit">
            Iniciar Sesión
          </button>
          <h3 className="jajanotienecuenta">
            No tenes cuenta?
            <a className="hacetecuenta" href="/registro">
              Registrate
            </a>
          </h3>

          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
