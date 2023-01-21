import style from "../../style/NavBar/NavBar.module.css";
import { Link } from "react-router-dom";
import logo from "../../img/logo/Mi proyecto.png";
import SearchBar from "../SearchBar/SearchBar";
import UserModal from "./UserModal";
import CarShop from "./CarShop";

export default function NavBar({setCurrentPage}:any): JSX.Element {
  return (
    <div className={style["nav"]}>
      <div className={style["nav-content"]}>
        <nav className={style["elements"]}>
          <div className={style["elem"]}>
            <Link to={"/home"}>
              <img src={logo} alt="img" className={style["logo"]} />
            </Link>
          </div>
          <div>
            <SearchBar setCurrentPage={setCurrentPage}></SearchBar>
          </div>
          <div className={style["user-cart"]}>
            <UserModal></UserModal>
            <CarShop></CarShop>
          </div>
        </nav>
      </div>
    </div>
  );
}
