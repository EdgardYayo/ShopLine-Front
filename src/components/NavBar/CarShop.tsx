import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import style from "../../style/NavBar/CarShop.module.css";

export default function CarShop(): JSX.Element {
  return (
    <div>
      <button className={style["btn"]}>
        <FontAwesomeIcon icon={faCartShopping} className={style["shop"]} />
      </button>
    </div>
  );
}
