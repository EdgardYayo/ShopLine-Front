import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faAddressCard, faAddressBook, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import style from "../../style/User/Header.module.css";
import { useAppSelector } from "../../redux/store/hooks";

export default function Headeruser() {
  const user = useAppSelector((state) => state.user);
  console.log(user, "aqui estoy")

  return (
    <div className={style["header"]}>
      <div className={style["target"]}>
        <div className={style["logo"]}>
          <img src={user.image} alt="img" />
        </div>
        <div className={style["info"]}>
          <div className={style["user-info"]}>
            <h1>{user.name}</h1>
            <h2> <FontAwesomeIcon icon={faMapLocationDot} className={style["icon-loc"]} />{user.nationality}</h2>
          </div>
        </div>
        <div className={style["user-logo"]}>
          <FontAwesomeIcon icon={faAddressCard} />
        </div>
      </div>
    </div>
  );
}
