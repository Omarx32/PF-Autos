import React from "react";
import styles from "./Home.module.css";

import Cards from "../../Cards/Cards";
import { getCars } from "../../../redux/action/action";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Page from "../../Page";

export default function Home() {
  const dispatch = useDispatch();

  const cars = useSelector((state) => state.cars);
  useEffect(() => {
    dispatch(getCars());
  }, []);

  const [startPag, setStartPag] = useState(0);
  const [endPag, setEndPag] = useState(5);

  const actPag = cars.slice(startPag, endPag);
  const cantCars = cars.length;

  const next = () => {
    if (endPag <= cantCars - 1) {
      setStartPag(endPag);
      setEndPag(endPag + 5);
    } else {
      alert("Fin del catálogo");
    }
  };

  const prev = () => {
    if (startPag > 1) {
      setStartPag(setStartPag - 5);
      setEndPag(endPag - 5);
    } else {
      alert("Estás en la primera página");
    }
  };

  return (
    <div className={styles.container}>

    
      

      <div>
        <div>
          <h2 className={styles.SubTitle}>Todos los vehiculos</h2>
        </div>


        <Cards></Cards>
      </div>
  <div className={styles.page}>
        <Page prev={prev} next={next}/>
      <div></div>
     
    </div>
  );
}
