import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import style from "../../style/ProductCard/ProductCard.module.css"

interface product {
  title: string;
  image: string;
  price: number;
}

export default function ProductCard(props: product): JSX.Element {
  return (
    <div className={style["container"]}>
      <img className={style["image"]} src={props.image} alt={"product"} />
      <h3 className={style["title"]}>{props.title}</h3>
      <p className={style["price"]}><FontAwesomeIcon icon={faDollarSign} className={style["icon-dollar"]}/>{props.price}</p>
      <FontAwesomeIcon icon={faBagShopping} className={style["icon-bag"]}/>
    </div>
  );
}
