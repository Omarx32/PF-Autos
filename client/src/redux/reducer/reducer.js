import {all} from "axios";
import { GET_CARS, GET_DETAIL } from "../action/typeAction";
let initialState = {
    allVehiculos: [],
    cars: [],
    carsDetail: {},
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CARS:
            return{
                ...state,
                 cars: action.payload,
            };
            case GET_DETAIL:
                return{
                    ...state,
                    carsDetail: action.payload
                }
        default:
            return{ ...state}
            
    }

}


export default rootReducer;