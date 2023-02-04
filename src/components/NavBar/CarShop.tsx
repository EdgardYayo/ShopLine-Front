import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import style from "../../style/NavBar/CarShop.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { useEffect, useMemo } from "react";
import { getClientCart } from "../../redux/actions/Cart";

export default function CarShop(): JSX.Element {

  const dispatch = useAppDispatch()
  const userInfo = useAppSelector((state) => state.user)
  const cart = useAppSelector((state) => state.cart)

  const id = userInfo.id
  useEffect(() => {
     dispatch(getClientCart(id))
  }, [id])

  const token = window.localStorage.getItem("token");
  const isLogin = useMemo(() => {
    if (token?.length) return true;
    else return false;
  }, [token]);

  return (
    <div>
      <Link to={"/profile/cart"}>
      <button className={style["car"]}>
        <FontAwesomeIcon icon={faCartShopping} className={style["iconCar"]} />
        Cart
      </button>
      <span className={isLogin ? style["cart-elements"] : style["hidden"]}>{ cart[0] ? cart[0]?.products?.length : 0 }</span>
      </Link>
    </div>
  );
}
