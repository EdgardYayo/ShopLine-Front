import style from "../../style/User/UserNav.module.css";
import { Link } from "react-router-dom";
import { UserInterface } from "../../types/types";

export default function UserNav(userLog?: UserInterface) {
  return (
    // Nav

    <div className={style["icon-bar"]}>
      <div className={style["options"]}>
        <h2 className={style["title"]}>Options</h2>
        <Link to="/profile/cart">
          <span className={style["line"]}></span>My Cart
        </Link>

        <Link to="/profile/user">
          <span className={style["line"]}></span>User
        </Link>

        {userLog?.rol === "Admin" && 
        <Link to="/admin">
 
        <span className={style["line"]}></span>Admin Dashboard
      </Link>
      }
      </div>
    </div>
  );
}