import React, { useState } from "react";
import axios from "axios";
import styles from "./Form.module.css";
import { validateField } from "./validationUser";

const FormUser = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Usuario",
    status: "Activo",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value, setErrors, errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.keys(errors).length > 0;
    const isFormEmpty = Object.values(formData).some((value) => value === "");

    if (!hasErrors && !isFormEmpty) {
      // Obtener la ubicación del usuario antes de enviar la solicitud POST
      axios
        .get("http://ip-api.com/json")
        .then((locationResponse) => {
          const location = locationResponse.data.city; // Cambia "city" por el campo de ubicación que desees almacenar

          // Agregar la ubicación al objeto formData
          const formDataWithLocation = {
            ...formData,
            location: location,
          };

          // Enviar la solicitud POST con la ubicación incluida
          axios
            .post("http://localhost:3001/users/user", formDataWithLocation)
            .then((response) => {
              console.log("Usuario registrado con éxito:", response.data);
            })
            .catch((error) => {
              console.error("Error al registrar el usuario:", error);
            });
        })
        .catch((error) => {
          console.error("Error al obtener la ubicación del usuario:", error);
        });
    } else {
      alert("Debes digitar todos los campos.");
    }
  };

  return (
    <div>
      <div className={styles.fondo} />
      <div className={styles.formContainer}>
        <img
          className={styles.fotofoto}
          src="img/mercedes.jpg"
          alt="Imagen de Mercedes"
        />
        <div className={styles.formulario}>
          <h2 className={styles.cuenta}>Crea una cuenta</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Nombre Completo:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              {errors.fullName && (
                <span className={styles.error}>{errors.fullName}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Contraseña:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength="8"
                required
              />
              {errors.password && (
                <span className={styles.error}>{errors.password}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Rol:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="Usuario">Usuario</option>
                <option value="Admin">Admin</option>
              </select>
              {errors.role && (
                <span className={styles.error}>{errors.role}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Estado:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Activo">Activo</option>
                <option value="Baneado">Baneado</option>
              </select>
              {errors.status && (
                <span className={styles.error}>{errors.status}</span>
              )}
            </div>

            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormUser;
