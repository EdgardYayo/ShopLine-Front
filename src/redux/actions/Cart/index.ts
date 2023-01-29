import axios from "axios";
import { AppDispatch } from "../../store/index";
const API_ENDPOINT = "http://localhost:3001";


export const CREATE_CART = "CREATE_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const GET_CLIENT_CART = "GET_CLIENT_CART";



export const createCart = (payload:any) => {
    return async function () {
      const response = await axios.post(`${API_ENDPOINT}/cart/create`, payload);
      return response
    };
};


export const addToCart = (id:any, payload:any) => {
    return async function () {
      const response = await axios.post(`${API_ENDPOINT}/cart/add/${id}`, payload);
      return response
    };
};

export const getClientCart = (id:any) => {
    return async function (dispatch: AppDispatch) {
      const response = await axios.get(`${API_ENDPOINT}/cart/${id}`);
      dispatch({
        type: GET_CLIENT_CART,
        payload: response.data,
      });
    };
  };


