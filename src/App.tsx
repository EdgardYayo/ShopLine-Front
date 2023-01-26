import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Footer from "./components/Footer/Footer";
//import Profile from "./components/Profile/Profile";
import PayForm from "./components/PayForm/PayForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51MUNEFDboVCgRDITHbfMWziUTBVcWxNqo8vqnQMoZ7LbiialaYzgCWzqEINkpsqStseqmS0xQLx7qpPayp4yZrAD00GRJnzYHZ")

function App() {
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
          </Switch>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
