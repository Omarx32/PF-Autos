import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Form.css";
import {postProduct, getCategorys, getBrands,} from '../../redux/action/action'
 import validation from "./validation"

 // 589471853742194   uU8OMiDxQdFYnJibegcyC0kzIqw     
const Form = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  const brand = useSelector((state)=> state.brands)
  const [inputValues, setInputValues] = useState(["", "", ""]);

  const [postCarForm, setPostCarForm] = useState({
    name: "",
    images: [],
    imageUrl: '',
    brand: "",
    description: "",
    price: "",
    stock: "",
    maker: "",
    model: "",
    color: "",
    kilometraje:"",
    direccion: "",
    category: [],
  });
  
  useEffect(()=>{
    dispatch(getCategorys());
    dispatch(getBrands())
  }, [])

  const [errors, setErrors] = useState({});
  const changeHandler = (event)=>{
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
    })
  }

  
  const submitHandler = (e) => {
    e.preventDefault();
    const additionalValues = inputValues.filter(Boolean);
    setPostCarForm({
      ...postCarForm, 
      image: additionalValues,
    })
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
        images: [],
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
      setInputValues(["","",""])
      alert("Your Publish has been created successfully");
    } else {
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div >
      <div>
      <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="">
          Name:
        </label>
        <input type="text" value={postCarForm.name} name="name" onChange={changeHandler} />
      </div>
      <div>
      <label htmlFor="Categorys">
          Brands:
        </label>
        <select>
          <option default >
            -
          </option>
          {brand?.map(brand =>(
            <option value={brand.name} key={brand.id}>{brand.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="">
          Description:
        </label>
        <input type="text" value={postCarForm.description} name="description" onChange={changeHandler} />
      </div>
      <div>
        <label htmlFor="">
          Price:
        </label>
        <input type="text" value={postCarForm.price} name="price" onChange={changeHandler} />
      </div>
      <div>
        <label htmlFor="">
         Stock:
        </label>
        <input type="text" value={postCarForm.stock} name="stock" onChange={changeHandler} />
      </div>
      <div>
        <label htmlFor="">
          Maker:
        </label>
        <input type="text" value={postCarForm.maker} name="maker" onChange={changeHandler} />
      </div>
      <div>
        <label htmlFor="">
          Model:
        </label>
        <input type="text" value={postCarForm.model} name="model" onChange={changeHandler} />
      </div>
      <div>
        <label htmlFor="">
          Color:
        </label>
        <input type="text" value={postCarForm.color} name="color" onChange={changeHandler} />
      </div>
      <div>
        <label htmlFor="">
          Kilometraje:
        </label>
        <input type="text" value={postCarForm.kilometraje} name="kilometraje" onChange={changeHandler} />
      </div>
      <div>
        <label htmlFor="">
          Direccion:
        </label>
        <input type="text" value={postCarForm.direccion} name="direccion" onChange={changeHandler} />
      </div>
      <div>
        <label htmlFor="Categorys">
          Categorys:
        </label>
        <select >
          <option disable defaultValue="-">
            -
          </option>
          {category && category.map((cat)=>(
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
      <input
  type="text"
  value={inputValues[0]}
  onChange={(e) => {
    const newValues = [...inputValues];
    newValues[0] = e.target.value;
    setInputValues(newValues);
  }}
/>

<input
  type="text"
  value={inputValues[1]}
  onChange={(e) => {
    const newValues = [...inputValues];
    newValues[1] = e.target.value;
    setInputValues(newValues);
  }}
/>

<input
  type="text"
  value={inputValues[2]}
  onChange={(e) => {
    const newValues = [...inputValues];
    newValues[2] = e.target.value;
    setInputValues(newValues);
  }}
/>
  </div>


      <input type="submit" value="Create" onSubmit={submitHandler}/>
      </form>
      </div>
    </div>
  )
};

export default Form;
