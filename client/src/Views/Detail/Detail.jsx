import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getDetail } from "../../redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import style from "./Detail.module.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

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
          price: 450000,
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
    <div className={style.container}>
      <div className={style.autos}>
        <img src={image} alt="" />
      </div>
      <div className={style.info}>
        <h2>{name}</h2>
        <p>Marca: {brand}</p>
        <p>{description}</p>
        <p>Precio: {price}</p>
        <p>Stock: {stock}</p>
        <p>Año: {model}</p>
        <p>Color: {color}</p>
        <p>Direccion: {direccion}</p>
        <p>Kilometraje: {kilometraje}</p>
        <button onClick={handleBuy} className={style.button} Target="_blank">
          Comprar
        </button>
      </div>
      <div className={style.btnOut}>
        <NavLink to="/Home">
          <button>x</button>
        </NavLink>
      </div>
    </div>
  );
};
export default Detail;
