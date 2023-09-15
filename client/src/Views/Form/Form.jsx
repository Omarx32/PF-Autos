import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Form.css";
import {
  postProduct,
  getCategorys,
  getBrands,
} from "../../redux/action/action";
import validation from "./validation";

const Form = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const brand = useSelector((state) => state.brands);
  const [file, setFile] = useState([]);
  const [image, setImage] = useState([]);
  const [products, setProducts] = useState([]); // Agregamos un estado para almacenar los productos

  const [postCarForm, setPostCarForm] = useState({
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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCategorys());
    dispatch(getBrands());
  }, []);

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

  const selectBrandHandler = (event) => {
    const brandValue = event.target.value;
    setPostCarForm({
      ...postCarForm,
      brand: brandValue,
    });
  };

  const selectCategoryHandler = (event) => {
    const categoryValue = event.target.value;
    setPostCarForm({
      ...postCarForm,
      category: [categoryValue],
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !errors.name ||
      !errors.brand ||
      !errors.description ||
      !errors.price ||
      !errors.stock ||
      !errors.maker ||
      !errors.model ||
      !errors.color ||
      !errors.kilometraje ||
      !errors.direccion ||
      postCarForm.category.length === 0
    ) {
      // Crear un objeto de producto
      const newProduct = {
        name: postCarForm.name,
        image: file,
        brand: postCarForm.brand,
        description: postCarForm.description,
        price: postCarForm.price,
        stock: postCarForm.stock,
        maker: postCarForm.maker,
        model: postCarForm.model,
        color: postCarForm.color,
        kilometraje: postCarForm.kilometraje,
        direccion: postCarForm.direccion,
        category: postCarForm.category,
      };

      // Agregar el nuevo producto al estado de productos
      setProducts([...products, newProduct]);

      // Limpiar el formulario
      setPostCarForm({
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
      console.log("dispatch:", postCarForm);

      dispatch(postProduct(postCarForm));

      alert("Tu producto ha sido creado exitosamente");
    } else {
      alert("Algo salió mal. Por favor, inténtalo de nuevo.");
    }
  };

  const previewFiles = (files) => {
    const imagePreviews = [];
    const readers = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      readers.push(reader);

      reader.readAsDataURL(files[i]);

      reader.onloadend = () => {
        imagePreviews.push(reader.result);

        // Verificar si hemos previsualizado todas las imágenes
        if (imagePreviews.length === files.length) {
          setImage(imagePreviews);
        }
      };
    }
  };

  const handleChange = (e) => {
    const file = e.target.files;
    const fileList = [];

    for (let i = 0; i < file.length; i++) {
      fileList.push(file[i]);
    }

    console.log(fileList);
    setFile(fileList);
    previewFiles(fileList);
  };

  return (
    <div>
      <div>
        <form onSubmit={submitHandler} className="form-container">
          <div>
            <div>
              <label htmlFor="name">Nombre del vehículo:</label>
              <input
                type="text"
                value={postCarForm.name}
                name="name"
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="brand">Marca:</label>
              <select
                name="brand"
                value={postCarForm.brand}
                onChange={selectBrandHandler}
              >
                <option value="">-</option>
                {brand?.map((brand) => (
                  <option value={brand.name} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="price">Precio:</label>
              <input
                type="text"
                value={postCarForm.price}
                name="price"
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="stock">Cantidad:</label>
              <input
                type="text"
                value={postCarForm.stock}
                name="stock"
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="maker">Fabricante:</label>
              <input
                type="text"
                value={postCarForm.maker}
                name="maker"
                onChange={changeHandler}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="model">Año:</label>
              <input
                type="text"
                value={postCarForm.model}
                name="model"
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="color">Color:</label>
              <input
                type="text"
                value={postCarForm.color}
                name="color"
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="kilometraje">Kilometraje:</label>
              <input
                type="text"
                value={postCarForm.kilometraje}
                name="kilometraje"
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="direccion">Dirección:</label>
              <input
                type="text"
                value={postCarForm.direccion}
                name="direccion"
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="category">Tipo: (ej: Sedán)</label>
              <select
                name="category"
                value={postCarForm.category}
                onChange={selectCategoryHandler}
              >
                <option value="">-</option>
                {category &&
                  category.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
              </select>
              <div>
                <label htmlFor="description"> Agrega una descripción:</label>
                <input
                  type="text"
                  value={postCarForm.description}
                  name="description"
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div>
              <label htmlFor="fileInput">Subir imagen aqui</label>
              <input type="file" multiple onChange={handleChange} />
              {image.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Preview ${index}`}
                  style={{ width: "100px", height: "100px", margin: "5px" }}
                />
              ))}
              <button>Subir</button>
            </div>
          </div>
          <input type="submit" value="Publicar" />
        </form>
      </div>
    </div>
  );
};

export default Form;
