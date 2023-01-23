import { AnyAction } from "redux";
import {
  FILTER_BY_CATEGORY,
  FILTER_BY_NAME,
  FILTER_BY_PRICE,
  GET_CATEGORIES,
  GET_DETAIL,
  GET_PRODUCTS,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
} from "../actions/Products";

interface StateProducts {
  products: any[];
  productsBackUp: any[];
  categories: any[];
  detail: any[];
}
const initialState: StateProducts = {
  products: [],
  productsBackUp: [],
  categories: [],
  detail: [],
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
        detail: action.payload
      };
    case FILTER_BY_NAME:
      let filteredName;
      if (action.payload) {
        filteredName = state.productsBackUp.filter(
          (elem) => elem.title.trim() === action.payload.trim()
        );
      }
      return {
        ...state,
        products: filteredName  
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

    default:
      return state;
  }
}

export default rootReducer;
