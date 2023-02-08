import axios from "axios";
import { AppDispatch } from "../../store/index";

const API_ENDPOINT = "http://localhost:3001";

export const GET_ALL_LISTS_USER = "GET_ALL_LISTS_USER";
export const GET_LIST = "GET_LIST";
export const CLEAR_ALL_LISTS = "CLEAR_ALL_LISTS";
export const CLEAR_LIST_DETAIL = "CLEAR_LIST_DETAIL";
export const GET_LIST_FAVORITES = "GET_LIST_FAVORITES";

export const getAllListsUser = (userId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/list/all?userId=${userId}`
      );
      dispatch({ type: GET_ALL_LISTS_USER, payload: response.data });
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
};

export const getListFavorite = (userId: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/list/favorites/${userId}`
      );
      console.log(response, "get list")
      dispatch({ type: GET_LIST_FAVORITES, payload: response.data });
    } catch (err: any) {
      console.log(err, "error")
      throw new Error(err.message);
    }
  };
};

export const getList = (id: number | string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/list/${id}`);
      dispatch({ type: GET_LIST, payload: response.data });
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
};

export const clearDetailList = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: CLEAR_LIST_DETAIL });
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
};

export const createList = (list: { name: string; email: string; }) => {
  return async (dispatch: AppDispatch) => {
    try {
      const config = {
        url: `${API_ENDPOINT}/list`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        data: list,
      };
      const response = await axios(config);
      return response.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
};

export const addListProduct = (addProduct: object) => {
  return async (dispatch: AppDispatch) => {
    try {
      const config = {
        url: `${API_ENDPOINT}/list/add`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        data: addProduct,
      };
      const response = await axios(config).then(
        function (value) {
          // Success!
          return value.data;
        },
        function (err) {
          // Error!
          throw new Error(err.response.data);
        }
      );
      console.log(response)
      return response;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
};

export const editListName = (editNameList: object) => {
  return async (dispatch: AppDispatch) => {
    try {
      const config = {
        url: `${API_ENDPOINT}/list/edit`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        data: editNameList,
      };
      const response = await axios(config);
      return response.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
};

export const deleteProductInList = (deleteAnimeInfo: object) => {
  return async (dispatch: AppDispatch) => {
    try {
      const config = {
        url: `${API_ENDPOINT}/list/product`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        data: deleteAnimeInfo,
      };
      const response = await axios(config);
      return response.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
};

export const deleteList = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(`${API_ENDPOINT}/list/${id}`);
      return response.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
};

export const clearAllLists = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: CLEAR_ALL_LISTS });
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
};
