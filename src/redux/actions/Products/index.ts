import axios from "axios";
import { AppDispatch } from "../../store/index";
 
const API_ENDPOINT = "http://localhost:3001"
export const GET_PRODUCTS = "GET_PRODUCTS";

export const getProducts = () => {
    return async function(dispatch:AppDispatch) {
        const response = await axios.get(API_ENDPOINT)
        dispatch({
            type:GET_PRODUCTS,
            payload:response.data 
        })
    }
}

