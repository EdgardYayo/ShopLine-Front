import axios from "axios";
import { AppDispatch } from "../../store/index";
import { User } from "@auth0/auth0-react";

// const API_ENDPOINT = "http://localhost:3001";

export const GET_USER_INFO = "GET_USER_INFO";
export const CLEAN_USER_INFO = "CLEAN_USER_INFO";

export const getUserResource = (accessToken: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const config = {
        url: `/user`,
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios(config);

      dispatch({ type: GET_USER_INFO, payload: response.data });
      return response.data;
    } catch (err: any) {
      throw new Error(err);
    }
  };
};

export const getUserResourceWithGoogle = (
  token: string,
  user: User | undefined
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const config = {
        url: `/user/google`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: user,
      };

      const response = await axios(config);
      window.localStorage.setItem("token", token);
      dispatch({ type: GET_USER_INFO, payload: response.data });
      return response.data;
    } catch (err: any) {
      throw new Error(err);
    }
  };
};

export const loginUser = (user: User) => {
  return async (dispatch: AppDispatch) => {
    try {
      const config = {
        url: `/user/login`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        data: user,
      };
      const response = await axios(config);

      window.localStorage.setItem("token", response.data.token);
      console.log("token stored:", window.localStorage.getItem("token")); // ACA MANEJAMOS EL TOKEN
      return response.data.token;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
};

export const registerUser = (user: User) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      const config = {
        url: `/user/register`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        data: user,
      };
      await axios(config).then(
        function (value) {
          // Success!
          return value.data;
        },
        function (err) {
          // Error!
          throw new Error(err.response.data);
        }
      );
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
};

export const changeUserSettings = (id: string, settings: {}) => {
  return async (dispatch: AppDispatch) => {
    try {
      const config = {
        url: `/user/configure/${id}`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        data: settings,
      };
      const response = await axios(config);
      // response.data
      return dispatch({ type: GET_USER_INFO, payload: response.data });
    } catch (err: any) {
      throw new Error(err);
    }
  };
};


export const cleanUserInfo = () => {
  return {
    type:CLEAN_USER_INFO,
    payload: []
  }
}