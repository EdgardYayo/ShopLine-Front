import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import style from "../../style/ProductCard/ProductCard.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { addToCart } from "../../redux/actions/Cart";
import swa from "sweetalert";
import { Link } from "react-router-dom";

interface product {
  id: number;
  title: string;
  image: string;
  price: number;
}

export default function ProductCard(props: product): JSX.Element {

  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state) => state.user);

  const id = userInfo.id;
  function handleClick(productId: number) {
   
    dispatch(addToCart(id, productId));
  }

  // function handleDisabled(){
  //   if(!userInfo.hasOwnProperty(id)){
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  return (
    <div className={style["container"]}>
      <Link to={"/detail/" + props.id}>
      <img className={style["image"]} src={props.image} alt={"product"} />
      </Link>
      <h3 className={style["title"]}>{props.title}</h3>
      <p className={style["price"]}>
        <FontAwesomeIcon icon={faDollarSign} className={style["icon-dollar"]} />
        {props.price}
      </p>
      <button className={style["btn-bag"]} onClick={() => handleClick(props.id)}>
        <FontAwesomeIcon icon={faBagShopping} className={style["icon-bag"]} />
      </button>
    </div>
  );
}
