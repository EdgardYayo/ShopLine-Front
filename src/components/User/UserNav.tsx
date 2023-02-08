import style from "../../style/User/UserNav.module.css";
import { Link } from "react-router-dom";
import { UserInterface } from "../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faReceipt,
  faCartArrowDown,
  faUserGear,
  faHeart
} from "@fortawesome/free-solid-svg-icons";

export default function UserNav(userLog?: UserInterface) {
  return (
    // Nav

    <div className={style["icon-bar"]}>
      <div className={style["options"]}>
        <h2 className={style["title"]}>Options</h2>
        <Link to="/profile/cart" className={style["link"]}>
          <FontAwesomeIcon icon={faCartArrowDown} className={style["icon-options"]} />
          My Cart
        </Link>

        <Link to="/profile/list" className={style["link"]}>
          <FontAwesomeIcon icon={faHeart} className={style["icon-options"]} />
          My Favorites
        </Link>

        <Link to="/profile/user" className={style["link"]}>
          <FontAwesomeIcon icon={faUserGear} className={style["icon-options"]} />
          User
        </Link>

        <Link to="/profile/receipt" className={style["link"]}>
          <FontAwesomeIcon icon={faReceipt} className={style["icon-options"]}/>
          Receipts
        </Link>

        {userLog?.rol === "Admin" && (
          <Link to="/admin" className={style["link"]}>
            <FontAwesomeIcon icon={faUserTie} className={style["icon-options"]} />
            Admin Dashboard
          </Link>
        )}
      </div>
    </div>
  );
}
