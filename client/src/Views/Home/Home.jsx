import React from "react";
import styles from "./Home.module.css";
import Page from '../Paginado/Page'
import Cards from "../../Components/Cards/Cards";
import { OrderByName, OrderByPrice, getCars } from "../../redux/action/action";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



export default function Home() {
  const dispatch = useDispatch();

  const cars = useSelector((state) => state.cars);
  useEffect(() => {
    dispatch(getCars());
  }, []);

  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  
  const handleOrderByName = (e) =>{
    e.preventDefault();
    dispatch(OrderByName(e.target.value))
    setOrder(`Ordenado${e.target.value}`)
  }
  const handleOrderByPrice = (e) =>{
    e.preventDefault();
    dispatch(OrderByPrice(e.target.value))
    setOrder(`Ordenado${e.target.value}`)
  }
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };



  return (
    <div className={styles.container}>
      <div>
        {/* <select ></select> */}
        <div className={`${styles.container_filters}`}>
        <select onChange={handleOrderByName}>
          <option value="Default">Default </option>
          <option value="A-Z">A - Z</option>
          <option value="Z-A">Z - A</option>
        </select>
        <select onChange={handleOrderByPrice}>
        <option value="Default"> Default </option>
        <option value="max_price">Max Price</option>
        <option value="min_price">Min Price</option>
        </select>
        </div>
        <div>
          <h2 className={styles.SubTitle}>Todos los vehículos</h2>
        </div>
        <Cards currentPage={currentPage}/>
      </div>
      <div className={styles.page}>
       
      <Page
  cardsPerPage={8}
  currentPage={currentPage}
  setCurrentPage={setCurrentPage} // Pasa setCurrentPage como prop
  totalCars={cars.length}
/>
      </div>
    </div>
  );
}
