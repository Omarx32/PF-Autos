import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Form.css";

const Form = () => {
  const [state, setState] = useState({
    name: "",
    image: [],
    brand: "",
    description: "",
    price: "",
    stock: "",
    maker: "",
    model: "",
    color: "",
    kilometraje: "",
    direccion: "",
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
    color: "",
    kilometraje: "",
    direccion: "",
    category: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "category" || name === "image") {
      setState({
        ...state,
        [name]: [value],
      });
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }

    setError({
      ...error,
      [name]: "", // Limpiar el mensaje de error cuando el campo se llena
    });

    validate(
      {
        ...state,
        [name]: value,
      },
      name
    );
  };

  const validate = (state, name) => {
    if (name === "name" && state.name.trim() === "") {
      setError({ ...error, name: "Campo requerido" });
    }
    if (name === "stock" && state.stock.trim() === "") {
      setError({ ...error, stock: "Campo requerido" });
    }
    if (name === "model" && state.model.trim() === "") {
      setError({ ...error, model: "Campo requerido" });
    }
    if (name === "image" && state.image.length === 0) {
      setError({ ...error, image: "Campo requerido" });
    }
    if (name === "category" && state.category.length === 0) {
      setError({ ...error, category: "Campo requerido" });
    }
    if (name === "visible") {
      // Validación de la visibilidad (agrega la lógica según corresponda)
    }
    if (name === "maker" && state.maker.trim() === "") {
      setError({ ...error, maker: "Campo requerido" });
    }
    if (name === "brand" && state.brand.trim() === "") {
      setError({ ...error, brand: "Campo requerido" });
    }
    if (name === "description" && state.description.trim() === "") {
      setError({ ...error, description: "Campo requerido" });
    }
    if (name === "price" && state.price.trim() === "") {
      setError({ ...error, price: "Campo requerido" });
    }
    if (name === "color" && state.color.trim() === "") {
      setError({ ...error, color: "Campo requerido" });
    }
    if (name === "kilometraje" && state.kilometraje.trim() === "") {
      setError({ ...error, kilometraje: "Campo requerido" });
    }
    if (name === "direccion" && state.direccion.trim() === "") {
      setError({ ...error, direccion: "Campo requerido" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén completos
    const requiredFields = [
      "name",
      "image",
      "brand",
      "description",
      "price",
      "stock",
      "maker",
      "model",
      "color",
      "kilometraje",
      "direccion",
      "category",
    ];

    const missingFields = requiredFields.filter(
      (field) => state[field] === "" || state[field].length === 0
    );

    if (missingFields.length > 0) {
      alert("Debes llenar todos campos");
      return;
    }

    // Realizar la solicitud POST al servidor
    try {
      const response = await axios.post(
        "http://localhost:3001/create/product",
        state
      );
      console.log("Respuesta del servidor:", response.data);

      // Verificar la respuesta del servidor (puedes personalizar esto según tus necesidades)
      if (response.status === 201) {
        console.log("Vehículo creado con éxito");
        setSuccessMessage("Vehículo creado con éxito");
        setTimeout(() => {
          setSuccessMessage(false);
        }, 5000);
        // Puedes realizar alguna acción adicional aquí, como redireccionar o mostrar un mensaje de éxito.
        setSubmitted(true);
        setState({
          // Reiniciar el estado del formulario a un objeto vacío
          name: "",
          image: [],
          brand: "",
          description: "",
          price: "",
          stock: "",
          maker: "",
          model: "",
          color: "",
          kilometraje: "",
          direccion: "",
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
                  />
                  {error.name && (
                    <label className="form-error">{error.name}</label>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="image">Imagen</label>
                  <input
                    name="image"
                    id="image"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.image}
                  />
                  {error.image && (
                    <label className="form-error">{error.image}</label>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="brand">Marca</label>
                  <input
                    name="brand"
                    id="brand"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.brand}
                  />
                  {error.brand && (
                    <label className="form-error">{error.brand}</label>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="description">Descripción</label>
                  <textarea
                    name="description"
                    id="description"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.description}
                  />
                  {error.description && (
                    <label className="form-error">{error.description}</label>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="price">Precio</label>
                  <input
                    name="price"
                    id="price"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.price}
                  />
                  {error.price && (
                    <label className="form-error">{error.price}</label>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    name="stock"
                    id="stock"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.stock}
                  />
                  {error.stock && (
                    <label className="form-error">{error.stock}</label>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="maker">Maker</label>
                  <input
                    name="maker"
                    id="maker"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.maker}
                  />
                  {error.maker && (
                    <label className="form-error">{error.maker}</label>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="model">Modelo</label>
                  <input
                    name="model"
                    id="model"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.model}
                  />
                  {error.model && (
                    <label className="form-error">{error.model}</label>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="color">Color</label>
                  <input
                    name="color"
                    id="color"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.color}
                  />
                  {error.color && (
                    <label className="form-error">{error.color}</label>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="kilometraje">Kilometraje</label>
                  <input
                    name="kilometraje"
                    id="kilometraje"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.kilometraje}
                  />
                  {error.kilometraje && (
                    <label className="form-error">{error.kilometraje}</label>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="direccion">Dirección</label>
                  <input
                    name="direccion"
                    id="direccion"
                    onChange={handleChange}
                    type="text"
                    value={submitted ? "" : state.direccion}
                  />
                  {error.direccion && (
                    <label className="form-error">{error.direccion}</label>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="category">Categoría</label>
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

                {successMessage && (
                  <div className="success-message">{successMessage}</div>
                )}

                <div className="button-container">
                  <input type="submit" value={"PUBLICAR VEHICULO"} />
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
