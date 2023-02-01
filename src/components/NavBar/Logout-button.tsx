import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch } from "../../redux/store/hooks";
import { cleanUserInfo } from "../../redux/actions/Users";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(cleanUserInfo())
    logout({
      returnTo: window.location.origin,
    });

    
  };

  return (
    <button className="button__logout" onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogoutButton;
