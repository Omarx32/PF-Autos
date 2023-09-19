import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getDetail } from "../../redux/action/action";
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

  return (
    <div className="nomelacontainer">
      <div className="btnOut">
        <NavLink to="/Home">
          <button>x</button>
        </NavLink>
      </div>
      <div className="row">
        <div className="col-md-7">
          <Carousel className="auto">
            {carsDetail &&
              carsDetail.image &&
              carsDetail.image.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Slide ${index}`} />
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
      </div>
    </div>
  );
};
export default Detail;
