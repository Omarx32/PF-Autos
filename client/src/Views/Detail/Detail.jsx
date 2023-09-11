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

  console.log(carsDetail);
  var [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("TEST-0e901727-9400-4f99-8e37-20e241e7f075");

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/createpreference",
        {
          price: { price },
          quantity: 1,
          currency_id: "ARS",
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
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
        <button onClick={handleBuy} className={style.button}>
          Comprar
        </button>
        {preferenceId && <Wallet initialization={{ preferenceId }} />}
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
