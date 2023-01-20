import { AnyAction } from "redux";
import { FILTER_BY_CATEGORY, FILTER_BY_NAME, GET_CATEGORIES, GET_PRODUCTS, ORDER_BY_NAME } from "../actions/Products";

interface StateProducts {
  products: any[]
  productsBackUp: any[]
  categories: any[]
}

const initialState: StateProducts = {
  products: [],
  productsBackUp: [],
  categories: []
};

function rootReducer(state: StateProducts = initialState, action: AnyAction) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        productsBackUp: action.payload
      }
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    case FILTER_BY_NAME:
      return {
        ...state,
        products: action.payload
      }
    case FILTER_BY_CATEGORY:
      let filteredCategory;
      if(action.payload === 'electronics'){
        filteredCategory = state.productsBackUp.filter((elem) => elem.category === action.payload)
      } else if (action.payload === 'jewelery'){
        filteredCategory = state.productsBackUp.filter((elem) => elem.category === action.payload)
      } else if (action.payload === "men's clothing"){
        filteredCategory = state.productsBackUp.filter((elem) => elem.category === action.payload)
      } else if (action.payload === "women's clothing"){
        filteredCategory = state.productsBackUp.filter((elem) => elem.category === action.payload)
      }
      return {
        ...state,
        products: action.payload === 'all' ? state.productsBackUp : filteredCategory
      }
    case ORDER_BY_NAME:
      const products = state.products;
      let orderedName;
      if(action.payload === 'asc'){
        orderedName = products.sort((a,b) => a.title.localCompare(b.title))
      } else if(action.payload === 'desc'){
        orderedName = products.sort((a,b) => b.title.localCompare(a.title))
      }
      return{
        ...state,
        products: orderedName
      }
    
    default:
      return state;
  }
}

export default rootReducer;
