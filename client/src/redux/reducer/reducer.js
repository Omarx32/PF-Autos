import {all} from "axios";
import { FILTER_BRANDS, GET_BRANDS, GET_CARS, GET_CATEGORYS, GET_DETAIL, ON_SEARCH, ORDER_BY_NAME, ORDER_BY_PRICE, UPLOAD_IMAGE, UPLOAD_IMAGE_ERROR, UPLOAD_IMAGE_SUCCESS } from "../action/typeAction";
let initialState = {
    allVehiculos: [],
    allCars: [],
    cars: [],
    carsDetail: {},
    onSearch: {},
    category: [],
    brands:[],
    uploadedImages: [],
    uploading: false,
    error:null,
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CARS:
            return{
                ...state,
                 cars: action.payload,
                 allVehiculos: action.payload,
                 allCars: action.payload,
            };
            case GET_DETAIL:
                return{
                    ...state,
                    carsDetail: action.payload
                }
        case ORDER_BY_NAME:
            if(action.payload === "Default"){
                return{
                    ...state,
                    cars: state.allCars
                }
            }

                const sortedName = 
                action.payload === "A-Z"
                ? state.allVehiculos.sort((a, b)=> {
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                })
                : state.allVehiculos.sort((a, b)=> {
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                })
                return {
                    ...state,
                    cars: sortedName,
                }
            
        case ORDER_BY_PRICE:
            if(action.payload === "Default"){
                return{
                    ...state,
                    cars: state.allCars
                }
            }

                const sortedPrice = action.payload === "min_price"
                ?[...state.allVehiculos].sort((a, b)=> parseInt(a.price) - parseInt(b.price))
                :[...state.allVehiculos].sort((a, b) => parseInt(b.price)- parseInt(a.price));
                console.log(sortedPrice);
                
                return{
                    ...state,
                    cars: sortedPrice,
                }
        case ON_SEARCH:
            return{
                ...state, 
                onSearch: action.payload
            }
        case GET_CATEGORYS:
            return {
                ...state, category: action.payload
            }
        case GET_BRANDS:
            return {
                ...state, brands: action.payload
            }

        case FILTER_BRANDS:
            return {
                ...state, allVehiculos: action.payload
            }
        case UPLOAD_IMAGE:
            return{
                ...state,
                uploading:true,
                error: null,
            }
        case UPLOAD_IMAGE_SUCCESS:
            return{
                ...state,
                uploading: false,
                uploadedImages:[ ...state.uploadedImages, action.payload],
            }
        case UPLOAD_IMAGE_ERROR:
            return{
                ...state,
                uploading: false,
                error: action.payload,
            }
        default:
            return{ ...state}
            
    }

}


export default rootReducer;