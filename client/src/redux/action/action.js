import axios from "axios";



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