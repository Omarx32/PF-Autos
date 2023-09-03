import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Form.css";

const Form = () => {
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

  const [successMessage, setSuccessMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
    if (name === "category") {
      if (state.category.length === 0) {
        setError({ ...error, category: "Campo requerido" });
      } else {
        setError({ ...error, category: "" });
      }
    }
    if (name === "visible") {
      if (state.visible === "") {
        setError({ ...error, visible: "Campo requerido" });
      } else {
        setError({ ...error, visible: "" });
      }
    }
    if (name === "maker") {
      if (state.maker === "") {
        setError({ ...error, maker: "Campo requerido" });
      } else {
        setError({ ...error, maker: "" });
      }
    }
    if (name === "brand") {
      if (state.brand === "") {
        setError({ ...error, brand: "Campo requerido" });
      } else {
        setError({ ...error, brand: "" });
      }
    }
    if (name === "description") {
      if (state.description === "") {
        setError({ ...error, description: "Campo requerido" });
      } else {
        setError({ ...error, description: "" });
      }
    }
    if (name === "price") {
      if (state.price === "") {
        setError({ ...error, price: "Campo requerido" });
      } else {
        setError({ ...error, price: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      state.name === "" ||
      state.image === "" ||
      state.brand === "" ||
      state.description === "" ||
      state.price === "" ||
      state.stock === "" ||
      state.maker === "" ||
      state.model === "" ||
      state.category.length === 0
    ) {
      alert("Debes llenar todos los campos.");
      return;
    }

    // Realiza la solicitud POST al servidor
    try {
      const response = await axios.post("http://localhost:3001/product", state);
      console.log("Respuesta del servidor:", response.data);

      // Verifica la respuesta del servidor (puedes personalizar esto según tus necesidades)
      if (response.status === 201) {
        console.log("Vehículo creado con éxito");
        setSuccessMessage("Vehículo creado con éxito");
        setTimeout(() => {
          setSuccessMessage(false);
        }, 5000);
        // Puedes realizar alguna acción adicional aquí, como redireccionar o mostrar un mensaje de éxito.
        setSubmitted(true);
        setState({
          // Reinicia el estado del formulario a un objeto vacío
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
      } else {
        console.error("Error al crear el vehículo");
      }
    } catch (error) {
      console.error("Error al crear el vehículo", error);
    }
  };

  const categories = [
    "Sedán",
    "SUV",
    "Deportivo",
    "Camioneta",
    "Camión",
    "Furgoneta",
    "Hatchback",
    "Convertible",
    "Coupé",
    "Minivan",
  ];

  return (
    <div className="form-outer-container">
      <div className="form-cont">
        <div className="style">
          <div className="cardForm">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h3 className="title-form">VENDE TU VEHICULO</h3>
                <hr></hr>
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <input
                    name="name"
                    id="name"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.name}
                  ></input>
                  {error.name && (
                    <label className="form-error">{error.name}</label>
                  )}
                </div>

                <hr></hr>
                <div className="form-group">
                  <label htmlFor="image">Imagen</label>
                  <input
                    name="image"
                    id="image"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.image}
                  ></input>
                  {error.image && (
                    <label className="form-error">{error.image}</label>
                  )}
                </div>

                <hr></hr>
                <div className="form-group">
                  <label htmlFor="brand">Marca</label>
                  <input
                    name="brand"
                    id="brand"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.brand}
                  ></input>
                  {error.brand && (
                    <label className="form-error">{error.brand}</label>
                  )}
                </div>

                <hr></hr>
                <div className="form-group">
                  <label htmlFor="description">Descripcion</label>
                  <textarea
                    name="description"
                    id="description"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.description}
                  ></textarea>
                  {error.description && (
                    <label className="form-error">{error.description}</label>
                  )}
                </div>

                <hr></hr>
                <div className="form-group">
                  <label htmlFor="price">Precio</label>
                  <input
                    name="price"
                    id="price"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.price}
                  ></input>
                  {error.price && (
                    <label className="form-error">{error.price}</label>
                  )}
                </div>

                <hr></hr>
                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    name="stock"
                    id="stock"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.stock}
                  ></input>
                  {error.stock && (
                    <label className="form-error">{error.stock}</label>
                  )}
                </div>

                <hr></hr>
                <div className="form-group">
                  <label htmlFor="maker">Maker</label>
                  <input
                    name="maker"
                    id="maker"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.maker}
                  ></input>
                  {error.maker && (
                    <label className="form-error">{error.maker}</label>
                  )}
                </div>

                <hr></hr>
                <div className="form-group">
                  <label htmlFor="model">Modelo</label>
                  <input
                    name="model"
                    id="model"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.model}
                  ></input>
                  {error.model && (
                    <label className="form-error">{error.model}</label>
                  )}
                </div>

                <hr></hr>
                <div className="form-group">
                  <label htmlFor="visible">Visible</label>
                  <input
                    name="visible"
                    id="visible"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.visible}
                  ></input>
                  {error.visible && (
                    <label className="form-error">{error.visible}</label>
                  )}
                </div>

                <hr></hr>
                <div className="form-group">
                  <label htmlFor="category">Categoria</label>
                  <select
                    name="category"
                    id="category"
                    onChange={handleChange}
                    value={submitted ? "" : state.category}
                  >
                    <option value="" disabled>
                      Selecciona una categoría
                    </option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {error.category && (
                    <label className="form-error">{error.category}</label>
                  )}
                </div>

                <hr></hr>
                {successMessage && (
                  <div className="success-message">{successMessage}</div>
                )}
                <hr></hr>
                <div className="button-container">
                  <input type="submit" value={"PUBLICAR VEHICULO"}></input>
                  <Link to="/Home">
                    <button className="return-button">Home</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
