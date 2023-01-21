import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import style from "../../style/NavBar/UserModal.module.css";

export default function UserModal(): JSX.Element {
  return (
    <div className={style["user-content"]}>
      <button className={style["btn"]}>
        <FontAwesomeIcon icon={faUser} className={style["user"]} />
      </button>
    </div>
  );
}
