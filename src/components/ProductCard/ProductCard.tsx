import React from "react";
import style from "./ProductCard.module.css"

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
      <p className={style["price"]}>${props.price}</p>
    </div>
  );
}
