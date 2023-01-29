import React, { useCallback, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Footer from "./components/Footer/Footer";
import PayForm from "./components/PayForm/PayForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Login from "./components/Login_and_Register/Login";
import Register from "./components/Login_and_Register/Register";
import { useAppDispatch } from "./redux/store/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getUserResource,
  getUserResourceWithGoogle,
} from "./redux/actions/Users";
import { getCategories } from "./redux/actions/Products";
import Loading from "./utils/Loading";
import Profile from "./components/Profile/Profile";

const stripePromise = loadStripe("pk_test_51MUNEFDboVCgRDITHbfMWziUTBVcWxNqo8vqnQMoZ7LbiialaYzgCWzqEINkpsqStseqmS0xQLx7qpPayp4yZrAD00GRJnzYHZ")

function App() {
  const dispatch = useAppDispatch();

  const { isLoading, getAccessTokenSilently, user } = useAuth0();
  const regularToken = window.localStorage.getItem("token");
  const emailUser = user?.email ? user?.email : "";

  const getRegularToken = useCallback(async () => {
    return window.localStorage.getItem("token");
  }, []);

  const getToken = useCallback(async () => {
    const accesToken = await getAccessTokenSilently();
    await dispatch(getUserResourceWithGoogle(accesToken, emailUser));
  }, [getAccessTokenSilently, emailUser, dispatch]);

  const getUserInfo = useCallback(async () => {
    const regTok = await getRegularToken();
    await dispatch(getUserResource(regTok ? regTok : ""));
  }, [dispatch, getRegularToken]);

  useEffect(() => {
    dispatch(getCategories());
    getToken();
    getUserInfo();
    getRegularToken();
  }, [getRegularToken, getUserInfo, getToken, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  console.log("esto es regulartoken: ", regularToken);
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <NavBar></NavBar>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/detail/:id" component={ProductDetail}/>
            <Elements stripe={stripePromise}>
            <Route exact path="/payment/:id" component={PayForm}/>
            </Elements>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/detail/:id" component={ProductDetail} />
            {/* <Route exact path="/profile" component={Profile} /> */}
          </Switch>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
