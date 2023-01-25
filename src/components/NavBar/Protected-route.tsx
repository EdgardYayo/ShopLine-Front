import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { ComponentType } from "react";
import { Route } from "react-router-dom";
import Loading from "../../utils/Loading";

interface ProtectedRouteProps {
  path: string;
  component: ComponentType;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  path,
  component,
}) => (
  <Route
    path={path}
    component={withAuthenticationRequired(component, {
      onRedirecting: () => (
        <div className="page-layout">
          <Loading />
        </div>
      ),
    })}
  />
);
