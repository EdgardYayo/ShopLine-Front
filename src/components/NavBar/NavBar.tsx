import style from "../../style/NavBar/NavBar.module.css";
import { Link } from "react-router-dom";
import logo from "../../img/logo/Mi proyecto.png";
import SearchBar from "../SearchBar/SearchBar";
import DropDownUser from "./DropDown-User";
import CarShop from "./CarShop";
import SubNav from "../SubNav/SubNav";
//import LoginButton from "../LoginButton/LoginButton";
//import LogoutButton from "../LogoutButton/LogoutButton";

export default function NavBar({setCurrentPage}:any): JSX.Element {
  return (
    <div className={style["nav"]}>
      <div className={style["nav-content"]}>
        <nav className={style["elements"]}>
          <div className={style["elem"]}>
            <Link to={"/"}>
              <img src={logo} alt="img" className={style["logo"]} />
            </Link>
          </div>
          <div>
            <SearchBar setCurrentPage={setCurrentPage}></SearchBar>
          </div>
          <div className={style["user-cart"]}>
            <DropDownUser></DropDownUser>
            <CarShop></CarShop>
             {/* <LoginButton></LoginButton>
            <LogoutButton></LogoutButton>  */}
          </div>
        </nav>
      </div>
      <SubNav></SubNav>

    </div>
  );
}
