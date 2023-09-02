import React, { useState } from "react";
import axios from "axios";
//import { useDispatch } from "react-redux";
//import { postVehiculo } from '../../redux/action/action';

import "./Form.css";

const Form = () => {
  //const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    image: "",
    brand: "",
    description: "",
    price: "",
    stock: "",
    maker: "",
    model: "",
    visible: "",
    category: [],
  });

  const [error, setError] = useState({
    name: "Campo requerido",
    image: "Campo requerido",
    brand: "Campo requerido",
    description: "Campo requerido",
    price: "Campo requerido",
    stock: "Campo requerido",
    maker: "Campo requerido",
    model: "Campo requerido",
    visible: "Campo requerido",
    category: "Campo requerido",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "category") {
      setState({
        ...state,
        [name]: [value], // aquí se actualiza como un array con el valor ingresado
      });
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
    validate(
      {
        ...state,
        [name]: value,
      },
      name
    );
  };

  const validate = (state, name) => {
    if (name === "name") {
      if (state.name !== "") {
        if (/^[A-Za-z\s]+$/.test(state.name)) {
          if (state.name.length >= 1 && state.name.length <= 30) {
            setError({ ...error, name: "" });
          } else {
            setError({
              ...error,
              name: "Debe contener entre 1 y 30 caracteres",
            });
          }
        } else {
          setError({ ...error, name: "Debe contener solo letras y espacios" });
        }
      } else {
        setError({ ...error, name: "Campo requerido" });
      }
    }
    if (name === "stock") {
      const stockValue = state.stock.trim();

      if (!/^\d+$/.test(stockValue)) {
        setError({ ...error, stock: "Debe ser un número" });
      } else if (parseInt(stockValue) > 1000) {
        setError({ ...error, stock: "No puede ser mayor que 1000" });
      } else {
        setError({ ...error, stock: "" });
      }
    }
    if (name === "model") {
      const modelValue = state.model.trim();

      if (!/^\d+$/.test(modelValue)) {
        setError({ ...error, model: "Debe ser un número" });
      } else if (parseInt(modelValue) > 2023) {
        setError({ ...error, model: "No puede ser mayor que 2023" });
      } else {
        setError({ ...error, model: "" });
      }
    }
    if (name === "image") {
      if (state.image !== "") {
        // Expresión regular para validar URL
        const urlPattern =
          /^(http[s]?:\/\/){0,1}(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}[.]{0,1}/;
        if (urlPattern.test(state.image)) {
          setError({ ...error, image: "" });
        } else {
          setError({ ...error, image: "Ingrese una URL válida" });
        }
      } else {
        setError({ ...error, image: "Campo requerido" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realiza la solicitud POST al servidor
    try {
      const response = await axios.post("http://localhost:3001/product", state);
      console.log("Respuesta del servidor:", response.data);

      // Verifica la respuesta del servidor (puedes personalizar esto según tus necesidades)
      if (response.status === 201) {
        console.log("Vehículo creado con éxito");
        // Puedes realizar alguna acción adicional aquí, como redireccionar o mostrar un mensaje de éxito.
      } else {
        console.error("Error al crear el vehículo");
      }
    } catch (error) {
      console.error("Error al crear el vehículo", error);
    }
  };

  return (
    <div className="form-cont">
      <div className="style">
        <form onSubmit={handleSubmit}>
          <h1 className="title-form">VENDER VEHICULO</h1>
          <hr></hr>
          <input
            name="name"
            onChange={handleChange}
            placeholder="NAME"
            type="text"
          ></input>
          <label className="form-error">{error.name}</label>

          <hr></hr>
          <input
            name="image"
            onChange={handleChange}
            placeholder="IMAGE"
            type="text"
          ></input>
          <label className="form-error">{error.image}</label>

          <hr></hr>
          <input
            name="brand"
            onChange={handleChange}
            placeholder="BRAND"
            type="text"
          ></input>
          <label className="form-error">{error.name}</label>

          <hr></hr>
          <input
            name="description"
            onChange={handleChange}
            placeholder="DESCRIPTION"
            type="text"
          ></input>
          <label className="form-error">{error.name}</label>

          <hr></hr>
          <input
            name="price"
            onChange={handleChange}
            placeholder="PRICE"
            type="text"
          ></input>
          <label className="form-error">{error.name}</label>

          <hr></hr>
          <input
            name="stock"
            onChange={handleChange}
            placeholder="STOCK"
            type="text"
          ></input>
          <label className="form-error">{error.stock}</label>

          <hr></hr>
          <input
            name="maker"
            onChange={handleChange}
            placeholder="MAKER"
            type="text"
          ></input>
          <label className="form-error">{error.name}</label>

          <hr></hr>
          <input
            name="model"
            onChange={handleChange}
            placeholder="MODEL"
            type="text"
          ></input>
          <label className="form-error">{error.model}</label>

          <hr></hr>
          <input
            name="visible"
            onChange={handleChange}
            placeholder="VISIBLE"
            type="text"
          ></input>
          <label className="form-error">{error.name}</label>

          <hr></hr>
          <input
            name="category"
            onChange={handleChange}
            placeholder="CATEGORY"
            type="text"
          ></input>
          <label className="form-error">{error.name}</label>

          <hr></hr>
          <input type="submit" value={"PUBLICAR VEHICULO"}></input>
          <hr></hr>
        </form>
      </div>
    </div>
  );
};

export default Form;
