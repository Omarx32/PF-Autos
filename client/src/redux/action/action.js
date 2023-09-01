import axios from "axios";
import { GET_CARS, GET_DETAIL } from './typeAction';

export const getCars = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/product/`
      );

   
      const cars = response.data;
      console.log(cars);

      dispatch({ type: GET_CARS, payload: cars });
    } catch (error) {
      
      console.error("Error al obtener datos de los coches:", error);
    }
  };
};

export const getDetail = (idCar)=>{
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/product/${idCar}`)
            
            const detail = response.data;
            console.log(detail);
            dispatch({type: GET_DETAIL, payload: detail })
        } catch (error) {
            console.error("Error");
        }
    }
}


export function postVehiculo(state){
    return async function(dispatch){
        try {
            const response = await axios.post("http://localhost:3001/update/product", state)
            alert("Se publico correctamente.")
        } catch (error) {
            console.log(error)
        }
    }
}