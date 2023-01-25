import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Profile from "../Profile/Profile";

export const CallbackPage = (): React.FC | JSX.Element => {
  const { error } = useAuth0();

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="page-layout">
      <Profile />
    </div>
  );
};
