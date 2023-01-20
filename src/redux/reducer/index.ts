import { AnyAction } from "redux";
import { GET_PRODUCTS } from "../actions/Products";

interface StateProducts {
  products: any[]
}

const initialState: StateProducts = {
  products: []
};

function rootReducer(state: StateProducts = initialState, action: AnyAction) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    default:
      return state;
  }
}

export default rootReducer;
