import { AnyAction } from "redux";

interface StateProducts {}

const initialState = {};

function rootReducer(state: StateProducts = initialState, action: AnyAction) {
  switch (action.type) {
    default:
      return state;
  }
}

export default rootReducer;
