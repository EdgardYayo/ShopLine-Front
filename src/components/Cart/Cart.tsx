import React, { useEffect } from "react";
import { getClientCart } from "../../redux/actions/Cart";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import style from "../../style/Cart/Cart.module.css";

export default function Cart(): JSX.Element {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  const cartDetail = useAppSelector((state) => state.cart);

  console.log(cartDetail);

  const id = userInfo.id;

  useEffect(() => {
    dispatch(getClientCart(id));
  }, [dispatch, id]);

  return (
    <div className={style["container"]}>
      <h1 className={style["title"]}>Cart</h1>
      {cartDetail[0] &&
        cartDetail[0]?.products?.map((e: any) => {
          return (
            <div className={style["cart-card"]}>
              <img className={style["image"]} src={e.image} alt={e.title} />
              <h2 className={style["product-title"]}>{e.title}</h2>
              <h3 className={style["price"]}>${e.price}</h3>
            </div>
          );
        })}
        <hr></hr>
      {cartDetail[0]?.products
        ?.map((e: any) => e.price)
        .reduce((acc: number, curr: number) => {
          return <h2 className={style["total"]}>Total: ${acc + curr}</h2>;
        })}
    </div>
  );
}
