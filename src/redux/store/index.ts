import { legacy_createStore as createStore, applyMiddleware, AnyAction} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, {ThunkDispatch, ThunkMiddleware} from "redux-thunk";
import rootReducer from "../reducer/index";

type State = { a: string };
const mw: ThunkMiddleware<State, AnyAction> = thunk;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(mw))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<State, any, AnyAction>;;