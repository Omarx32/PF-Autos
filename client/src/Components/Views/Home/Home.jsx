import React from "react";
import styles from "./Home.module.css";
//import Footer from "../../Components/Footer/Footer";
import Cards from "../../Cards/Cards";
import { getCars } from "../../../redux/action/action";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../NavBar/Navbar";

export default function Home() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars);
  useEffect(() => {
    dispatch(getCars());
  }, []);

  return (
    <div className={styles.container}>
      <Navbar></Navbar>
      <div className={styles.background}>
        <h1 className={styles.AppTitle}>IGNITE MOTORS</h1>
        <a href="/Form" target="_blank">
          Form
        </a>
        <Cards></Cards>
      </div>
      <h2 className={styles.SubTitle}>Todas Las Categorias</h2>
      <div classname={styles.enlaces}>
        <a href="/" target="_blank">
          <p>Prueba</p>
        </a>
      </div>

      <div></div>
      {/* <Footer /> */}
    </div>
  );
}
