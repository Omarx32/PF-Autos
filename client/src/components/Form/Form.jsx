import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";


//import { useDispatch } from "react-redux";
//import { postVehiculo } from '../../redux/action/action';

import "./Form.css"

const Form = () => {
  //const dispatch = useDispatch();
  let listCategory = useSelector((state) => state.category);
  console.log(listCategory)


  const [state, setState] = useState({
    name: '',
    image: '',
    brand: '',
    description: '',
    price: 0,
    stock: 0,
    maker: '',
    model: 0,
    visible: '',
    category: '',
  })

  const [error, setError] = useState({
    name: "Provide the vehicle's name",
    image: "Upload an image of the vehicle",
    brand: "Specify the brand or manufacturer of the vehicle",
    description: "Provide a detailed description of the vehicle",
    price: "Enter the price of the vehicle",
    stock: "Specify the available quantity in stock",
    maker: "Enter the manufacturer of the vehicle",
    model: "Enter the model year of the vehicle",
    visible: "Indicate whether the vehicle is visible for sale",
    category: "Select the category or categories the vehicle belongs to"
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "category") {
      setState({
        ...state,
        [name]: [value] // aquí se actualiza como un array con el valor ingresado
      });
    } else {
      setState({
        ...state,
        [name]: value
      });
    }
    validate({
      ...state,
      [name]: value
    }, name);
  }

  const validate = (state, name) => {
    if (name === "name") {
      if (state.name !== "") {
        if (/^[A-Za-z\s]+$/.test(state.name)) {
          if (state.name.length >= 1 && state.name.length <= 30) {
            setError({ ...error, name: "" });
          } else {
            setError({ ...error, name: "1 and 30 characters." });
          }
        } else {
          setError({ ...error, name: "Only letters and spaces." });
        }
      } else {
        setError({ ...error, name: "Provide the vehicle's name" });
      }
    }
    if (name === "image") {
      if (state.image !== "") {
        // Expresión regular para validar URL
        const urlPattern = /^(http[s]?:\/\/){0,1}(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}[.]{0,1}/;
        if (urlPattern.test(state.image)) {
          setError({ ...error, image: "" });
        } else {
          setError({ ...error, image: "Enter a valid URL." });
        }
      } else {
        setError({ ...error, image: "Upload an image of the vehicle" });
      }
    }
    if (name === "brand") {
      if (state.brand !== "") {
        if (state.brand.length >= 1 && state.brand.length <= 30) {
          setError({ ...error, brand: "" });
        } else {
          setError({ ...error, brand: "1 and 30 characters." });
        }
      } else {
        setError({ ...error, brand: "Specify the brand or manufacturer of the vehicle" });
      }
    }
    if (name === "description") {
      if (state.description !== "") {
        if (state.description.length >= 1 && state.description.length <= 500) {
          setError({ ...error, description: "" });
        } else {
          setError({ ...error, description: "1 and 500 characters." });
        }
      } else {
        setError({ ...error, description: "Provide a detailed description of the vehicle" });
      }
    }
    if (name === "price") {
      if (state.price !== "") {
        if (/^\d+(\.\d{1,2})?$/.test(state.price)) {
          setError({ ...error, price: "" });
        } else {
          setError({ ...error, price: "It must be a valid price." });
        }
      } else {
        setError({ ...error, price: "Enter the price of the vehicle" });
      }
    }

    if (name === "stock") {
      const stockValue = state.stock.trim();

      if (!/^\d+$/.test(stockValue)) {
        setError({ ...error, stock: "It must be a number." });
      } else if (parseInt(stockValue) > 1000) {
        setError({ ...error, stock: "It cannot be greater than 1000." });
      } else {
        setError({ ...error, stock: "" });
      }
    }
    if (name === "maker") {
      if (state.maker !== "") {
        if (state.maker.length >= 1 && state.maker.length <= 30) {
          setError({ ...error, maker: "" });
        } else {
          setError({ ...error, maker: "1 and 30 characters." });
        }
      } else {
        setError({ ...error, maker: "Enter the manufacturer of the vehicle" });
      }
    }
    if (name === "model") {
      const modelValue = state.model.trim();

      if (!/^\d+$/.test(modelValue)) {
        setError({ ...error, model: "It must be a number." });
      } else if (parseInt(modelValue) > 2023) {
        setError({ ...error, model: "It cannot be greater than 2023" });
      } else if (parseInt(modelValue) < 1500) { // Validación añadida
        setError({ ...error, model: "It cannot be less than 1500." });
      } else {
        setError({ ...error, model: "" });
      }
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realiza la solicitud POST al servidor
    try {
      const response = await axios.post("http://localhost:3001/product", state);
      console.log("Respuesta del servidor:", response.data);

      // Verifica la respuesta del servidor (puedes personalizar esto según tus necesidades)
      if (response.status === 201) {
        console.log('Vehículo creado con éxito');
        alert('Vehicle published successfully');
        // Puedes realizar alguna acción adicional aquí, como redireccionar o mostrar un mensaje de éxito.
        window.location.reload();
      } else {
        console.error('Error al crear el vehículo');
      }
    } catch (error) {
      console.error('Error al crear el vehículo', error);
    }
  };

  return (
    <div className='form-cont'>
      <form onSubmit={handleSubmit}>
        <h1 className='title-form'>SELL VEHICLE</h1>
        <hr></hr>
        <label>NAME: </label>
        <input name="name" onChange={handleChange} placeholder='NAME' type="text" className='input-form' ></input>
        <label className='form-error'>{error.name}</label>

        <hr></hr>
        <label>IMAGE: </label>
        <input name="image" onChange={handleChange} placeholder='IMAGE' type="text" className='input-form'></input>
        <label className='form-error'>{error.image}</label>

        <hr></hr>
        <label>BRAND: </label>
        <input name="brand" onChange={handleChange} placeholder='BRAND' type="text" className='input-form'></input>
        <label className='form-error'>{error.brand}</label>

        <hr></hr>
        <label>DESCRIPTION: </label>
        <input name="description" onChange={handleChange} placeholder='DESCRIPTION' type="text" className='input-form'></input>
        <label className='form-error'>{error.description}</label>

        <hr></hr>
        <label>PRICE: </label>
        <input name="price" onChange={handleChange} placeholder='PRICE' type="text" className='input-form'></input>
        <label className='form-error'>{error.price}</label>

        <hr></hr>
        <label>STOCK: </label>
        <input name="stock" onChange={handleChange} placeholder='STOCK' type="text" className='input-form'></input>
        <label className='form-error'>{error.stock}</label>

        <hr></hr>
        <label>MAKER: </label>
        <input name="maker" onChange={handleChange} placeholder='MAKER' type="text" className='input-form'></input>
        <label className='form-error'>{error.maker}</label>

        <hr></hr>
        <label>MODEL: </label>
        <input name="model" onChange={handleChange} placeholder='MODEL' type="text" className='input-form'></input>
        <label className='form-error'>{error.model}</label>

        <hr></hr>
        <label>CATEGORY:</label>
        <select name="category" value={state.category} onChange={handleChange}>
          <option value="">Seleccionar</option>
          <option value="Sedan">Sedan</option>
          <option value="Compacto">Compacto</option>
          <option value="Cxc">Cxc</option>
        </select>
        <hr></hr>
        <label>VISIBLE</label>
        <select name="visible" onChange={handleChange}>
          <option value="">Seleccionar</option>
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <hr></hr>
        <div className="button-container">
          <button className="button-form" type="submit">PUBLISH VEHICLE</button>
        </div>
        <hr></hr>
        <div className='button-home-cont'>
          <Link to="/home" className='button-home'>
            <button >HOME</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Form;
