import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store/index";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

//const domain: any = process.env.REACT_APP_AUTH0_DOMAIN;
//const clientId: any = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Auth0Provider
        domain={"dev-4zbd8xzwtn8q8w80.us.auth0.com"}
        clientId={"HIluW97JfnE32EjpXVog5jRmBB4rsWvj"}
        authorizationParams={{
          redirect_url: window.location.origin,
          audience: `https://dev-4zbd8xzwtn8q8w80.us.auth0.com/api/v2/`,
          scope: "read:current_user update:current_user_metadata"
        }}
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
