import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Form.css";
import { postProduct, getCategorys } from "../../redux/action/action";
import validation from "./validation";
// 589471853742194   uU8OMiDxQdFYnJibegcyC0kzIqw
const Form = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  const [postCarForm, setPostCarForm] = useState({
    name: "",
    image: [],
    imageUrl: "",
    brand: [],
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
  useEffect(() => {
    dispatch(getCategorys());
  }, []);
  const [errors, setErrors] = useState({});
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setErrors(
      validation({
        ...postCarForm,
        [property]: value,
      })
    );
    setPostCarForm({
      ...postCarForm,
      [property]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.image &&
      !errors.brand &&
      !errors.description &&
      !errors.price &&
      !errors.stock &&
      !errors.maker &&
      !errors.model &&
      !errors.color &&
      !errors.kilometraje &&
      !errors.direccion &&
      !errors.category
    ) {
      dispatch(postProduct(postCarForm));
      setPostCarForm({
        name: "",
        image: [],
        brand: [],
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
      alert("Your Publish has been created succesfully");
    } else {
      alert("Something being went wrong, Please try again");
    }
  };
  const urlImageFromCloud = async (e) => {
    const imageUrl = e.target.value; // Obtener la URL de la imagen desde el input
    setPostCarForm((prevForm) => ({
      ...prevForm,
      image: [...prevForm.image, imageUrl], // Agregar la URL al arreglo image
    }));
  };

  const addImage = (imageUrl) => {
    if (imageUrl) {
      setPostCarForm((prevForm) => ({
        ...prevForm,
        image: [...prevForm.image, imageUrl],
      }));
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="">Name:</label>
            <input
              type="text"
              value={postCarForm.name}
              name="name"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="">Brand:</label>
            <input
              type="text"
              value={postCarForm.brand}
              name="brand"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="">Description:</label>
            <input
              type="text"
              value={postCarForm.description}
              name="description"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="">Price:</label>
            <input
              type="text"
              value={postCarForm.price}
              name="price"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="">Stock:</label>
            <input
              type="text"
              value={postCarForm.stock}
              name="stock"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="">Maker:</label>
            <input
              type="text"
              value={postCarForm.maker}
              name="maker"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="">Model:</label>
            <input
              type="text"
              value={postCarForm.model}
              name="model"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="">Color:</label>
            <input
              type="text"
              value={postCarForm.color}
              name="color"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="">Kilometraje:</label>
            <input
              type="text"
              value={postCarForm.kilometraje}
              name="kilometraje"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="">Direccion:</label>
            <input
              type="text"
              value={postCarForm.direccion}
              name="direccion"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="Categorys">Categorys:</label>
            <select>
              <option disable defaultValue="-">
                -
              </option>
              {category &&
                category.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="image">Image URL:</label>
            <input type="text" name="image" onChange={changeHandler} />
            <button onClick={() => addImage(postCarForm.imageUrl)}>
              Add Image
            </button>
          </div>
          <input type="submit" value="Create" />
        </form>
      </div>
    </div>
  );
};

export default Form;
