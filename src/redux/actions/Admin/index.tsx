import axios from "axios";
import { AppDispatch } from "../../store/index";

const API_ENDPOINT = "http://localhost:3001";
export const GET_USERS_BY_SEARCH = "GET_USERS_BY_SEARCH";

export const adminActions = (options: {
  admin: string;
  user: string;
  action: string;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      const config = {
        url: `${API_ENDPOINT}/admin`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        data: options,
      };
      const response = await axios(config);
      return response.data;
      // dispatch({type: types.DELETE_EPISODE_POST, payload: response.data})
    } catch (err: any) {
      throw new Error(err);
    }
  };
};

export const searchUsers = (name: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/user/search?name=${name}`
      );
      dispatch({ type: GET_USERS_BY_SEARCH, payload: response.data });
      return response;
    } catch (err) {
      dispatch({
        type: GET_USERS_BY_SEARCH,
        payload: { error: { message: "Users not founded" } },
      });
    }
  };
};
