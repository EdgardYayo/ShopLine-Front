import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faStar } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import style from "../../style/ProductCard/ProductCard.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { addToCart, getClientCart } from "../../redux/actions/Cart";
import swa from "sweetalert";
import { Link } from "react-router-dom";

interface product {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
  stock: number;
}

export default function ProductCard(props: product): JSX.Element {

  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state) => state.user);
  
  const token = window.localStorage.getItem("token");
  const isLogin = useMemo(() => {
    if (token?.length) return true;
    else return false;
  }, [token]);
  
  const id = userInfo.id;
  async function handleClick(productId: number, stock: number) {
    if(!isLogin){
      return swa("You need to log in if you want to add this product to the cart", "", "warning")
    } else if(stock === 1){
      return swa("you can not add this product to the cart because is out of stock", "sorry")
    }
   
    await dispatch(addToCart(id, productId));
    dispatch(getClientCart(id))
  }


  return (
    <div className={style["container"]}>
      <p className={style["rating"]}>
        <FontAwesomeIcon icon={faStar} className={style["icon-star"]} />
        {props.rating}
      </p>
      <Link to={"/detail/" + props.id}>
      <img className={style["image"]} src={props.image} alt={"product"} />
      </Link>
      <h3 className={style["title"]}>{props.title}</h3>
      <p className={style["price"]}>
        <FontAwesomeIcon icon={faDollarSign} className={style["icon-dollar"]} />
        {props.price}
      </p>
      <div className={style["sub-container"]}>
      <button className={style["btn-bag"]} onClick={() => handleClick(props.id, props.stock)}>
        <FontAwesomeIcon icon={faBagShopping} className={style["icon-bag"]} />
      </button>
      <p className={props.stock === 1 ? style["out"] : style["hidden"]}>Out of Stock</p>
      </div>
    </div>
  );
}
