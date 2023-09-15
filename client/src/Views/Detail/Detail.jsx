import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getDetail } from "../../redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import "./Detail.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
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
  console.log("505", carsDetail);
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
    console.log("llego a handler");
    const init_point = await createPreference();
    console.log("termina handler");
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
            <div>
              <img
                src="https://cloudfront-us-east-1.images.arcpublishing.com/artear/QVKIE7QSDVDILNQMAV67YTHB7Y.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://tn.com.ar/resizer/Q6JFzmyUuUV-pE5Yu6BT2weBO5U=/arc-anglerfish-arc2-prod-artear/public/JXYQG5VUFJAC7GDSL2VVO7NEGI.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://www.diariomotor.com/imagenes/2016/02/ford-focus-rs-2016-prueba-31-mapdm.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://cloudfront-us-east-1.images.arcpublishing.com/artear/7WGHH66RBZDQDHKSSHNMIZGI6Q.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://cloudfront-us-east-1.images.arcpublishing.com/artear/GGYY5HEV2FCZ7GJNCVC7WZZXYM.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://cloudfront-us-east-1.images.arcpublishing.com/artear/K2VYSYWODLFNIOPCFTA3AORRTI.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://tn.com.ar/resizer/DJzHJz60jpzT1ZOrToVlLOYZ7SY=/767x0/smart/filters:format(webp)/cloudfront-us-east-1.images.arcpublishing.com/artear/ZAMXXWHM6FFLRNCJI5FANV2COA.jpg"
                alt=""
              />
            </div>
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
