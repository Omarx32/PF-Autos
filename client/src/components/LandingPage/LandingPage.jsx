import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../LandingPage/LandingPage.module.css";

export default function LandingPage() {
  // Declaraciones de estados y refs dentro de la función
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef(null);
  const data = [
    {
      id: 1,
      imgUrl: "img/descargauno.jpg",
    },
    {
      id: 2,
      imgUrl: "img/descargados.jpg",
    },
    {
      id: 3,
      imgUrl: "img/descargatrs.jpg",
    },
    {
      id: 4,
      imgUrl: "img/descarga.jpg",
    },
    {
      id: 5,
      imgUrl:
        "img/ford-f-150-raptor-pickup-trucks-car-wallpaper-d930f81d116a8d1b3637f8bf006166bd.jpg",
    },
  ];
  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll("li > img")[currentIndex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const scrollToImage = (direction) => {
    if (direction === "prev") {
      setCurrentIndex((curr) => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? 0 : curr - 1;
      });
    } else {
      const isLastSlide = currentIndex === data.length - 1;
      if (!isLastSlide) {
        setCurrentIndex((curr) => curr + 1);
      }
    }
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className={styles.background}>
      <div>
        <h1 className={styles.AppTitle}>NN</h1>
        <div className={styles.mainContainer}>
          <div className={styles.sliderContainer}>
            <div
              className={styles.leftArrow}
              onClick={() => scrollToImage("prev")}
            >
              &#10092;
            </div>
            <div
              className={styles.rightArrow}
              onClick={() => scrollToImage("next")}
            >
              &#10093;
            </div>
            <div className={styles.containerImages}>
              <ul ref={listRef}>
                {data.map((item) => {
                  return (
                    <li key={item.id}>
                      <img alt="" src={item.imgUrl} />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.dotsContainer}>
              {data.map((_, idx) => (
                <div
                  key={idx}
                  className={`${styles.dotContainerItem} ${
                    idx === currentIndex ? styles.active : ""
                  }`}
                  onClick={() => goToSlide(idx)}
                >
                  &#9865;
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Link to="/Home">
        <button className={styles.button}>Catalogo</button>
      </Link>
      <div className={styles.imgCont}>
        <img src="img/mercedes.jpg" alt="" />
        <p className={styles.texto}>
          TENEMOS TODO PARA OFRECERTE, DESDE LAS PICKUPS MAS POTENTES PARA EL
          TRABAJO, COMO SEDANES COMODOS Y ELEGANTES, HASTA LAS SUVS MAS
          ESPACIOSAS PARA LA VIDA FAMILIAR.
        </p>
      </div>
    </div>
  );
}
