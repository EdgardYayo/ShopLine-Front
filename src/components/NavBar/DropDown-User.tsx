import { useState, useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from "../../style/NavBar/DropDown-User.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faUser,
  faMedal,
  faSignOutAlt,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const DropdownUser = () => {
  const history = useHistory();
  const [menu, setMenu] = useState(false);
  //login
  //Pasar User loging, logout a un nuevo componente
  const { logout, isAuthenticated } = useAuth0();

  // const handleLogin = async () => {
  //   await loginWithRedirect({
  //     prompt: "login",
  //     appState: {
  //       returnTo: "/home",
  //     },
  //   });
  // };
  const token = window.localStorage.getItem("token");
  const isLogin = useMemo(() => {
    
    if (token?.length) return true;
    else return false;
  }, [token]);

  const handleLogout = () => {
    setMenu(!menu);
    if (isAuthenticated) {
      window.localStorage.removeItem("token");
      logout({ returnTo: "http://localhost:3000/login" });
    } else {
      window.localStorage.removeItem("token");
      history.push("/login");
    }
  };

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className={style["explore user"]}>
      <button onClick={toggleMenu} className={style["log"]}>
        <FontAwesomeIcon icon={faUser} className={style["iconUser"]} />
        User
      </button>
      <nav
        className={
          style["nav-dropdown"] + " " + style[`${menu ? "isActive" : ""}`]
        }
      >
        <ul className={style["ul-dropdown"]}>
          <Link
            onClick={toggleMenu}
            to="/profile"
            className={style["a-dropdown"]}
          >
            <li className={style["li-dropdown"]}>
              <FontAwesomeIcon icon={faUser} className={style["icon"]} />
              <span>My Account</span>
            </li>
          </Link>
          {!isLogin ? (
            <>
              {/* <li onClick={handleLogin} className={style["li-dropdown"]}>
                Login
              </li> */}
              <Link
                onClick={toggleMenu}
                className={style["a-dropdown"]}
                to="/login"
              >
                <li className={style["li-dropdown"]}>
                  <FontAwesomeIcon
                    icon={faSignInAlt}
                    className={style["icon"]}
                  />
                  <span>Login</span>
                </li>
              </Link>
            </>
          ) : (
            <>
              <li onClick={handleLogout} className={style["li-dropdown"]}>
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className={style["icon"]}
                />
                <span>Logout</span>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default DropdownUser;
