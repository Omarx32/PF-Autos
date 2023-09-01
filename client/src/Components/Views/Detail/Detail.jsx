import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getDetail } from "../../../redux/action/action";
import { useDispatch, useSelector } from "react-redux";
import style from "./Detail.module.css";

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

  const { id, name, image, brand, description, price, stock, model } =
    carsDetail;

  return (
    <div className={style.container}>
      <div className={style.img}>
        <img src={image} alt={name} />
      </div>
      <div className={style.info}>
        <h2>{name}</h2>
        <p>Brand: {brand}</p>
        <p>{description}</p>
        <p>Price: {price}</p>
        <p>Stock: {stock}</p>
        <p>Year: {model}</p>
        <button className={style.btn}>Buy</button>

        <div className={style.btnOut}>
          <NavLink to="/home">
            <button>x</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Detail;
