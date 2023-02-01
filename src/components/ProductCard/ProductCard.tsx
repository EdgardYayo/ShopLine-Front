import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import style from "../../style/ProductCard/ProductCard.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { addToCart } from "../../redux/actions/Cart";

interface product {
  id: number;
  title: string;
  image: string;
  price: number;
}

export default function ProductCard(props: product): JSX.Element {
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state) => state.user);

  function handleClick(productId: number) {
    const id = userInfo.id;
    console.log(productId, "productIdee")
    dispatch(addToCart(id, productId));
  }

  return (
    <div className={style["container"]}>
      <img className={style["image"]} src={props.image} alt={"product"} />
      <h3 className={style["title"]}>{props.title}</h3>
      <p className={style["price"]}>
        <FontAwesomeIcon icon={faDollarSign} className={style["icon-dollar"]} />
        {props.price}
      </p>
      <button onClick={() => handleClick(props.id)}>
        <FontAwesomeIcon icon={faBagShopping} className={style["icon-bag"]} />
      </button>
    </div>
  );
}
