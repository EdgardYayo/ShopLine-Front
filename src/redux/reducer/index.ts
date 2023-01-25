import { AnyAction } from "redux";
import {
  CREATE_REVIEW,
  FILTER_BY_CATEGORY,
  FILTER_BY_NAME,
  FILTER_BY_PRICE,
  GET_CATEGORIES,
  GET_DETAIL,
  GET_PRODUCTS,
  GET_REVIEWS,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
} from "../actions/Products";

import { GET_USER_INFO } from "../actions/Users/index";

import { UserInterface } from "../../types/types";

interface StateProducts {
  products: any[];
  productsBackUp: any[];
  categories: any[];
  detail: any;
  reviews: any[];
  user: UserInterface;
}
const initialState: StateProducts = {
  products: [],
  productsBackUp: [],
  categories: [],
  detail: [],
  reviews: [],
  user: {} as UserInterface,
};

function rootReducer(state: StateProducts = initialState, action: AnyAction) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        productsBackUp: action.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case FILTER_BY_NAME:
      // let filteredName;
      // if (action.payload) {
      //   filteredName = state.productsBackUp.filter(
      //     (elem) => elem.title.trim().toLowerCase().includes(action.payload.trim().toLowerCase())
      //   );
      // }
      return {
        ...state,
        products: action.payload,
      };
    case FILTER_BY_CATEGORY:
      let filteredCategory;
      if (action.payload === "electronics") {
        filteredCategory = state.productsBackUp.filter(
          (elem) => elem.category === action.payload
        );
      } else if (action.payload === "jewelery") {
        filteredCategory = state.productsBackUp.filter(
          (elem) => elem.category === action.payload
        );
      } else if (action.payload === "men's clothing") {
        filteredCategory = state.productsBackUp.filter(
          (elem) => elem.category === action.payload
        );
      } else if (action.payload === "women's clothing") {
        filteredCategory = state.productsBackUp.filter(
          (elem) => elem.category === action.payload
        );
      }
      return {
        ...state,
        products:
          action.payload === "all" ? state.productsBackUp : filteredCategory,
      };
    case FILTER_BY_PRICE:
      let filteredPrice;
      if (action.payload === "lessThan100") {
        filteredPrice = state.productsBackUp.filter((elem) => elem.price < 100);
      } else if (action.payload === "moreThan100") {
        filteredPrice = state.productsBackUp.filter((elem) => elem.price > 100);
      } else if (action.payload === "lessThan500") {
        filteredPrice = state.productsBackUp.filter((elem) => elem.price < 500);
      } else if (action.payload === "moreThan500") {
        filteredPrice = state.productsBackUp.filter((elem) => elem.price > 500);
      } else if (action.payload === "lessThan900") {
        filteredPrice = state.productsBackUp.filter((elem) => elem.price < 900);
      } else if (action.payload === "moreThan900") {
        filteredPrice = state.productsBackUp.filter((elem) => elem.price > 900);
      } else {
        filteredPrice = state.productsBackUp;
      }
      return {
        ...state,
        products: filteredPrice,
      };
    case ORDER_BY_NAME:
      const products = state.products;
      let orderedName;
      if (action.payload === "asc") {
        orderedName = products.sort((a, b) => {
          if (a.title > b.title) return 1;
          else if (b.title > a.title) return -1;
          else return 0;
        });
      } else if (action.payload === "desc") {
        orderedName = products.sort((a, b) => {
          if (a.title > b.title) return -1;
          else if (b.title > a.title) return 1;
          else return 0;
        });
      }
      return {
        ...state,
        products: action.payload === "all" ? state.products : orderedName,
      };
    case ORDER_BY_PRICE:
      let orderedPrice;
      if (action.payload === "asc") {
        orderedPrice = state.products.sort((a, b) => {
          if (a.price > b.price) return -1;
          else if (b.price > a.price) return 1;
          else return 0;
        });
      } else if (action.payload === "desc") {
        orderedPrice = state.products.sort((a, b) => {
          if (a.price > b.price) return 1;
          else if (b.price > a.price) return -1;
          else return 0;
        });
      }
      return {
        ...state,
        products: action.payload === "all" ? state.products : orderedPrice,
      };
    case CREATE_REVIEW:
      return { ...state };
    case GET_USER_INFO:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
