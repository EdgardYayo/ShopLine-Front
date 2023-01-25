import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { PropsWithChildren } from "react";
import { useHistory } from "react-router-dom";

// interface Auth0ProviderWithConfigProps {
//   children: React.ReactNode;
// }

export const Auth0ProviderWithHistory = (
  prop: PropsWithChildren
): JSX.Element => {
  const history = useHistory();

  // const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  // const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  // const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
  // const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

  const onRedirectCallback = (appState?: AppState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={"dev-0wcyb0rncjrw1ixe.us.auth0.com"}
      clientId={"r4KZrCUIMDkfPCFGFl6b3dMggKCyxQqm"}
      audience={"https://hello-world.example.com"}
      redirectUri={"http://localhost:3000/home"}
      onRedirectCallback={onRedirectCallback}
    >
      {prop.children}
    </Auth0Provider>
  );
};