import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store/index";
import { Provider } from "react-redux";
import { Auth0ProviderWithHistory } from "./components/NavBar/Auth0-provider-with-history";
import { BrowserRouter } from "react-router-dom";

//const domain: any = process.env.REACT_APP_AUTH0_DOMAIN;
//const clientId: any = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(
  document.getElementById("root") as Element
);
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
