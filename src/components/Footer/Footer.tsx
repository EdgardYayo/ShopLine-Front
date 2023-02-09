import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcPaypal,
  faCcVisa,
  faCcMastercard,
  faCcDiscover
} from "@fortawesome/free-brands-svg-icons";
import style from "../../style/Footer/Footer.module.css";




export default function Footer(): JSX.Element {
  return (
    <div className={style["footer"]}>
      <p className={style["copy"]}>
        Copyright &copy; 2023 <span className={style["shopline"]}><strong className={style["shop-word"]}>Shop</strong><strong className={style["line-word"]}>Line</strong></span>-
        Todos los derechos reservados.
      </p>
      <div className={style["pays"]}>
        <FontAwesomeIcon icon={faCcPaypal}  className={style["payment"]}/>

        <FontAwesomeIcon icon={faCcVisa} className={style["payment"]} />

        <FontAwesomeIcon icon={faCcMastercard} className={style["payment"]}/>

        <FontAwesomeIcon icon={faCcDiscover} className={style["payment"]} />
      </div>
    </div>
  );
}
