import React from "react";

import styles from "../Home/Home.module.css";
import Footer from "../Footer/Footer";

export default function Home() {
  return (
    <div>
      <div className={styles.background}>
        <h1 className={styles.AppTitle}>NN</h1>
        <h2 className={styles.SubTitle}>Todas Las Categorias</h2>
        <div classname={styles.enlaces}>
          <a href="/" target="_blank">
            <p>Prueba</p>
          </a>
          <a href="/Form" target="_blank">
            Form
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
}
