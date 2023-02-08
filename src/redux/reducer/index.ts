import { AnyAction } from "redux";
import {
  CREATE_REVIEW,
  FILTER_BY_CATEGORY,
  FILTER_BY_NAME,
  FILTER_BY_PRICE,
  GET_CATEGORIES,
  GET_DETAIL,
  GET_PAY,
  GET_POPULAR,
  GET_PRODUCTS,
  GET_RECEIPT,
  GET_REVIEWS,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  CLEAR_DETAIL,
} from "../actions/Products";

import { CLEAN_USER_INFO, GET_USER_INFO } from "../actions/Users/index";

import { GET_USERS_BY_SEARCH } from "../actions/Admin/index";

import { UserInterface, UserLists, ListDetail } from "../../types/types";
import {
  ADD_TO_CART,
  CLEAR_CART,
  CREATE_CART,
  GET_CLIENT_CART,
  DELETE_FROM_CART,
  DELETE_CART_AFTER_PAYMENT,
  PLUS_PRODUCT,
  MINUS_PRODUCT,
} from "../actions/Cart";

import {
  GET_ALL_LISTS_USER,
  GET_LIST,
  GET_LIST_FAVORITES,
  CLEAR_ALL_LISTS,
  CLEAR_LIST_DETAIL,
} from "../actions/List/index";

interface StateProducts {
  products: any[];
  productsBackUp: any[];
  categories: any[];
  detail: any;
  reviews: any;
  user: UserInterface;
  cart: any;
  popular: any[];
  receipts: any;
  userLists: Array<UserLists>;
  listDetail: ListDetail;
}

const initialState: StateProducts = {
  products: [],
  productsBackUp: [],
  categories: [],
  detail: [],
  reviews: [],
  user: {} as UserInterface,
  cart: [],
  popular: [],
  receipts: [],
  userLists: [],
  listDetail: {} as ListDetail,
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
    case GET_POPULAR:
      return {
        ...state,
        popular: action.payload,
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
    case GET_PAY:
      return { ...state };
    case GET_USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAN_USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case CREATE_CART:
      return { ...state };
    case ADD_TO_CART:
      return { ...state };
    case GET_CLIENT_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case DELETE_FROM_CART:
      return { ...state };
    case DELETE_CART_AFTER_PAYMENT:
      return { ...state };
    case GET_RECEIPT:
      return {
        ...state,
        receipts: action.payload,
      };
    case GET_USERS_BY_SEARCH:
      return {
        ...state,
        users: action.payload,
      };

    case PLUS_PRODUCT:
      return { ...state };
    case MINUS_PRODUCT:
      return { ...state };
    case CLEAR_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case GET_ALL_LISTS_USER:
      return {
        ...state,
        userLists: action.payload,
      };
    case GET_LIST:
      return {
        ...state,
        listDetail: action.payload,
      };
    case CLEAR_ALL_LISTS:
      return {
        ...state,
        userLists: [],
      };
    case GET_LIST_FAVORITES:
      return {
        ...state,
        listDetail: action.payload,
      };
    case CLEAR_LIST_DETAIL:
      return {
        ...state,
        listDetail: {},
      };
    default:
      return state;
  }
}

export default rootReducer;
