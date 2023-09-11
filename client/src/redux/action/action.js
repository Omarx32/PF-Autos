import axios from "axios";
import { FILTER_BRANDS, GET_BRANDS, GET_CARS, GET_CATEGORYS, GET_DETAIL, ON_SEARCH, ORDER_BY_NAME, ORDER_BY_PRICE, POST_PRODUCT, UPLOAD_IMAGE, UPLOAD_IMAGE_ERROR, UPLOAD_IMAGE_SUCCESS } from './typeAction';

export const getCars = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/product/getProduct`
      );
      const cars = response.data;
       
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
           
            dispatch({type: GET_DETAIL, payload: detail })
        } catch (error) {
            console.error("Error");
        }
    }
}

export const onSearch = (name)=>{
  return async (dispatch)=>{
    const response = await axios.get(`http://localhost:3001/product/?name=${name}`)
    const onSearch = response.data;
    return dispatch({
      type: ON_SEARCH,
      payload: onSearch,
    })
  }
}

export const OrderByName = (payload)=>{
  return{
    type: ORDER_BY_NAME,
    payload
  }
}

export const OrderByPrice = (payload)=>{
  return{
    type: ORDER_BY_PRICE,
    payload
  }
}
export const getCategorys = ()=>{
  return async (dispatch)=>{
    try{
      const response = await axios.get(`http://localhost:3001/category`)
      const category = response.data
      console.log(response);
      return dispatch({type: GET_CATEGORYS, payload: category})
      
    }catch(error){
      console.log(error.message);
    }
  }
}

export const getBrands=()=>{
  return async (dispatch)=>{
    try {
      const response=await axios.get('http://localhost:3001/brand')
      const brands= response.data;
      console.log(" Marcas:", brands)
      return dispatch({type: GET_BRANDS, payload: brands})
    } catch (error) {
      console.error(error.message);
    }
  }
}

export const postProduct = (createProduct)=>{
  return async function (dispatch){
    const response = await axios.post(`http://localhost:3001/create/product`, createProduct)
    return dispatch ({type: POST_PRODUCT})
  }
}

export const filterBrands=(brand)=>{
  return async (dispatch)=>{
    try {
      const response = await axios.get(`http://localhost:3001/filt/brands?brandcar=${brand}`)
      const cars= response.data;
      return dispatch({type: FILTER_BRANDS, payload: cars});
    } catch (error) {
        console.error(error.message);
    }
  }
}
 export const uploadImage = () =>{{
  type: UPLOAD_IMAGE
 }}
 
 export const uploadImageSuccess = (imageUrl) => ({
  type: UPLOAD_IMAGE_SUCCESS,
  payload: imageUrl,
});

export const uploadImageError = (error) => ({
  type: UPLOAD_IMAGE_ERROR,
  payload: error,
});