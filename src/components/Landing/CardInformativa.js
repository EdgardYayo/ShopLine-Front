import { PropsWithRef } from "react";
import { Link } from "react-router-dom";
import style from "../../style/Landing/CardInformative.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar } from "@fortawesome/free-solid-svg-icons";

export default function CardInformative({ title, image, id, price }) {
  return (
    <div className={style["cardInformative"]} key={title + id}>
      <div className={style["cardInformative-first"]}>
        <div className={style["cardInformative-image-container"]}>
          <img
            src={image}
            alt="anime about alt"
            className={style["anime-img"]}
          />
        </div>
        <div className={style["about"]}>
          <Link to={"/animes/" + id}>
            <h4>{title}</h4>
          </Link>
        </div>
      </div>
      <div className={style["cardInformative-second"]}>
        <h4>Price:</h4>
        <div className={style["description"]}>
          <p className={style["price"]}>{price} <FontAwesomeIcon icon={faDollar} className={style["dollar"]} /></p> 
          <Link to={`/products/${id}`} className={style["read-more"]}>
            view more
          </Link>
        </div>
      </div>
    </div>
  );
}
