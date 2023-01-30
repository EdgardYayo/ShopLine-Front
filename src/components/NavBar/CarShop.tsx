import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import style from "../../style/NavBar/CarShop.module.css";
import { Link } from "react-router-dom";

export default function CarShop(): JSX.Element {
  return (
    <div>
      <Link to={"/profile/cart"}>
      <button className={style["car"]}>
        <FontAwesomeIcon icon={faCartShopping} className={style["iconCar"]} />
        Cart
      </button>
      </Link>
    </div>
  );
}
