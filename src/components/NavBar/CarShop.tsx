import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import style from "../../style/NavBar/CarShop.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { useEffect } from "react";
import { getClientCart } from "../../redux/actions/Cart";

export default function CarShop(): JSX.Element {

  const dispatch = useAppDispatch()
  const userInfo = useAppSelector((state) => state.user)
  const cart = useAppSelector((state) => state.cart)

  const id = userInfo.id
  useEffect(() => {
     dispatch(getClientCart(id))
  }, [id])

  return (
    <div>
      <Link to={"/profile/cart"}>
      <button className={style["car"]}>
        <FontAwesomeIcon icon={faCartShopping} className={style["iconCar"]} />
        Cart
      </button>
      <span className={style["cart-elements"]}>{ cart[0] ? cart[0]?.products?.length : 0 }</span>
      </Link>
    </div>
  );
}
