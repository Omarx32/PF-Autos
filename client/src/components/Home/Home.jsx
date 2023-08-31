import React from "react";
import Navbar from "../NavBar/Navbar";
import styles from "../Home/Home.module.css";
import Footer from "../Footer/Footer";
import Cards from "../Cards/Cards";
import cars from "../../data";
export default function Home() {
  return (
    <div>
      <div className={styles.background}>
        <h1 className={styles.AppTitle}>IGNITE MOTORS</h1>
        <Navbar></Navbar>
      </div>
      <h2 className={styles.SubTitle}>Todas Las Categorias</h2>
      <div classname={styles.enlaces}>
        <a href="/" target="_blank">
          <p>Prueba</p>
        </a>
        <a href="/Form" target="_blank">
          Form
        </a>
      </div>
      <div className="App">
        <div>
          <Cards cars={cars}></Cards>
        </div>
        <Footer />
      </div>
    </div>
  );
}
