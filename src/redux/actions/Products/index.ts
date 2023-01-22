import axios from "axios";
import { AppDispatch } from "../../store/index";

const API_ENDPOINT = "http://localhost:3001";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_DETAIL = "GET_DETAIL";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const FILTER_BY_PRICE = "FILTER_BY_PRICE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";

export const getProducts = () => {
  return async function (dispatch: AppDispatch) {
    const response = await axios.get('https://fakestoreapi.com/products');
    dispatch({
      type: GET_PRODUCTS,
      payload: response.data,
    });
  };
};

export const getCategories = () => {
  return async function (dispatch: AppDispatch) {
    const response = await axios.get(`${API_ENDPOINT}/categories`);
    dispatch({
      type: GET_CATEGORIES,
      payload: response.data,
    });
  };
};

export const getDetail = (id:number) => {
  return async function (dispatch: AppDispatch) {
    const response = await axios.get(`${API_ENDPOINT}/products/${id}`);
    dispatch({
      type: GET_DETAIL,
      payload: response.data,
    });
  };
};

// export const filterByName = (name: string) => {
//   return async function (dispatch: AppDispatch) {
//     const response = await axios.get(`${API_ENDPOINT}/products?name=${name}`);
//     dispatch({
//       type: FILTER_BY_NAME,
//       payload: response.data,
//     });
//   };
// };

export const filterByName = (payload:string) => {
    return {
      type: FILTER_BY_NAME,
      payload
    }
};

export const filterByCategory = (payload: string) => {
  return {
    type: FILTER_BY_CATEGORY,
    payload,
  };
};

export const filterByPrice = (payload: string) => {
  return {
    type: FILTER_BY_PRICE,
    payload,
  };
};

export const orderByName = (payload: string) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const orderByPrice = (payload: string) => {
  return {
    type: ORDER_BY_PRICE,
    payload,
  };
};