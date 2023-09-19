import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getDetail, addReview } from "../../redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import "./Detail.css";
import { initMercadoPago } from "@mercadopago/sdk-react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos del carrusel
import { Carousel } from "react-responsive-carousel"; // Importa el componente del carrusel

const Detail = () => {
  const { idCar } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(idCar));
  }, []);

  const carsDetail = useSelector((state) => state.carsDetail);
  if (!carsDetail) {
    return <div>...Loading</div>;
  }

  const {
    id,
    name,
    image,
    brand,
    description,
    price,
    stock,
    model,
    color,
    direccion,
    kilometraje,
  } = carsDetail;

  console.log("algo", carsDetail);
  var [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("TEST-0e901727-9400-4f99-8e37-20e241e7f075");

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/mp/createpreference",
        {
          id,
          title: name,
          price: price,
          quantity: 1,
        }
      );
      console.log(response);
      const init_point = response.data.response.body.init_point;
      console.log("init point mp", init_point);
      return init_point;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const init_point = await createPreference();

    window.location.href = init_point;
  };

  const [input, setInput] = useState({
    title: "",
    description: "",
    rating: 0,
    product: idCar,
    user: "",
  });

  const handleInput = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const [error, setError] = useState({
    title: "",
    description: "",
    rating: "",
    user: "",
  });

  const validation = (input) => {
    let msj = {};
    if (!input.title) {
      msj.title = "Ingresa un título";
    } else {
      msj.title = "";
    }

    if (!input.description) {
      msj.description = "Ingresa contenido";
    } else {
      msj.description = "";
    }

    if (!input.rating || 0 > input.rating > 5) {
      msj.rating = "Solo de 0 a 5 estrellas";
    } else {
      msj.rating = "";
    }

    return msj;
  };

  const handleError = (event) => {
    setError({
      ...validation({ ...input, [event.target.name]: event.target.value }),
    });
  };

  const handleSubmit = (event) => {
    if (!error.title && !error.description) {
      const newReview = {
        title: input.title,
        description: input.description,
        rating: input.rating,
        product: input.product,
        user: input.user,
      };

      setInput({ title: "", description: "", rating: 0 });

      console.log(input);
      dispatch(addReview(newReview));

      alert("Review añadida");
    } else {
      alert("Inténtalo de nuevo");
    }
  };

  return (
    <div className="nomelacontainer">
      <div className="btnOut">
        <NavLink to="/Home">
          <button>x</button>
        </NavLink>
      </div>
      <div className="row">
        <div className="col-md-7">
          <Carousel className="auto" showThumbs={false}>
            {carsDetail &&
              carsDetail.image &&
              carsDetail.image.map((image, index) => (
                <div key={index}>
                  <img className="mb" src={image} alt={`Slide ${index}`} />
                </div>
              ))}
          </Carousel>
        </div>
        <div className="col-md-5">
          <div className="project-info-box mt-0">
            <h5>{name}</h5>
            <p className="mb-0">{description}</p>
          </div>
        </div>

        <div className="info">
          <p className="pepito">
            <b>Marca:</b> {brand}
          </p>
          <p className="pepito">
            <b>Año:</b> {model}
          </p>
          <p className="pepito">
            <b>Kilometraje:</b> {kilometraje}
          </p>
          <p className="pepito">
            <b>Direccion:</b> {direccion}
          </p>
          <p className="pepito">
            <b>Precio:</b> {price}
          </p>
        </div>

        <button onClick={handleBuy} className="button" target="_blank">
          Comprar
        </button>

        <form className="reviu" onSubmit={handleSubmit}>
          <label htmlFor="title">Titula tu comentario</label>
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={handleInput}
          />
          <label htmlFor="review">
            ¿Alguna duda? ¿Crítica constructiva? ¿Puteada al vendedor? Déjala
            aquí
          </label>
          <input
            type="text"
            name="description"
            value={input.description}
            onChange={handleInput}
          />
          <select name="rating" onChange={handleInput}>
            <option value="0">Califica este producto</option>
            <option value="1">&#x2B50; Mierda</option>
            <option value="2">&#x2B50; &#x2B50; Mediocre</option>
            <option value="3">&#x2B50;&#x2B50;&#x2B50; Aceptable</option>
            <option value="4">&#x2B50;&#x2B50;&#x2B50;&#x2B50; Bueno</option>
            <option value="5">
              &#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50; Excelente
            </option>
          </select>
          <label htmlFor="">
            ¿Tu cuenta está autenticada por la página o por google?
          </label>
          <select name="user">
            <option value="google">google</option>
            <option value="ignate motors">Ignate Motors</option>
          </select>
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};
export default Detail;
