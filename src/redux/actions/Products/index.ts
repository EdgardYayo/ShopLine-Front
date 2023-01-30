import axios from "axios";
import swa from "sweetalert";
import { AppDispatch } from "../../store/index";

const API_ENDPOINT = "http://localhost:3001";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_DETAIL = "GET_DETAIL";
export const GET_REVIEWS = "GET_REVIEWS";
export const GET_POPULAR = "GET_POPULAR";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const FILTER_BY_PRICE = "FILTER_BY_PRICE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";
export const CREATE_REVIEW = "CREATE_REVIEW";
export const GET_PAY = "GET_PAY";

export const getProducts = () => {
  return async function (dispatch: AppDispatch) {
    const response = await axios.get(`${API_ENDPOINT}/products`);
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

export const getReviews = () => {
  return async function (dispatch: AppDispatch) {
    const response = await axios.get(`${API_ENDPOINT}/reviews`);
    dispatch({
      type: GET_REVIEWS,
      payload: response.data,
    });
  };
};

export const getPopular = () => {
  return async function (dispatch: AppDispatch) {
    const response = await axios.get(`${API_ENDPOINT}/products/popular`);
    dispatch({
      type: GET_POPULAR,
      payload: response.data,
    });
  };
};



export const filterByName = (name: string) => {
  return async function (dispatch: AppDispatch) {
    try {
      const response = await axios.get(`${API_ENDPOINT}/products?name=${name}`);
      dispatch({
        type: FILTER_BY_NAME,
        payload: response.data,
      });
      
    } catch (error) {
      swa("This name doesn't match with any product", "Try other", "warning")
    }
  };
};

// export const filterByName = (payload:string) => {
//     return {
//        type: FILTER_BY_NAME,
//        payload
//      }
// };

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

export const createReview = (payload:any) => {
  return async function () {
    const response = await axios.post(`${API_ENDPOINT}/reviews/create`, payload);
    return response
  };
};


export const getPay = (payload:any) => {
  return async function () {
    try {
      const response = await axios.post(`${API_ENDPOINT}/payments`, payload);
      return response;   
    } catch (error) {
      console.log(error)
    }
  };
};