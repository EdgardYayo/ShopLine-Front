import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Footer from "./components/Footer/Footer";

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
          </Switch>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
