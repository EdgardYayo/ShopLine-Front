import axios from "axios";
import { AppDispatch } from "../../store/index";
const API_ENDPOINT = "http://localhost:3001";


export const CREATE_CART = "CREATE_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const GET_CLIENT_CART = "GET_CLIENT_CART";
export const CLEAR_CART = "CLEAR_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_CART_AFTER_PAYMENT = "DELETE_CART_AFTER_PAYMENT";



// export const createCart = (payload:any) => {
//     return async function () {
//       const response = await axios.post(`${API_ENDPOINT}/cart/create`, payload);
//       return response
//     };
// };


export const addToCart = (id:any, productId:number) => {
    return async function () {
      const response = await axios.post(`${API_ENDPOINT}/cart/add/${id}`, productId);
      console.log(response, productId)
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


export const clearCart = () => {
  return {
    type: CLEAR_CART,
    payload: []
  }
}

export const deleteFromCart = (id:any, productId:number | any) => {
  return async function () {
    const response = await axios.delete(`${API_ENDPOINT}/cart/delete/${id}?productId=${productId}`);
    return response.config
  };
};


export const deleteCartAfterPayment = (userId: any) => {
  return async function () {
    const response = await axios.delete(`${API_ENDPOINT}/cart/delete?userId=${userId}`)
    return response
  }
}

