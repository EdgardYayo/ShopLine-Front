import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import React, { useEffect, useMemo } from "react";
import {
  clearCart,
  deleteCartAfterPayment,
  deleteFromCart,
  getClientCart,
} from "../../redux/actions/Cart";
import { getPay } from "../../redux/actions/Products";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import style from "../../style/Cart/Cart.module.css";
import swa from "sweetalert";
import { useHistory } from "react-router-dom";

export default function Cart(): JSX.Element {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  const cartDetail = useAppSelector((state) => state.cart);
  const history = useHistory();

  const id = userInfo.id;

  useEffect((): any => {
    dispatch(getClientCart(id));

    return () => {
      dispatch(clearCart());
    };
  }, [dispatch, id]);

  const total =
    cartDetail[0]?.products.length !== 0
      ? cartDetail[0]?.products
          ?.map((e: any) => e.price)
          .reduce((acc: number, curr: number) => acc + curr)
      : null;
  const description = cartDetail[0]?.products
    ?.map((e: any) => e.title)
    .join(", ");
  console.log(description);
  const amount = total * 100;

  const stripe: any | null = useStripe();
  const elements: any | null = useElements();
  const userId = userInfo.id;

  //Function that handle the payment
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      await dispatch(getPay({ id, amount, description, userId }));
      elements.getElement(CardElement).clear();
      swa(
        "You payment was successfully processed",
        "Thank you for shopping in SHOPLINE",
        "success"
      );
      await dispatch(deleteCartAfterPayment(userId));
      history.push("/receipt");
      window.location.reload();
    }

    if (error) {
      swa(
        "Sorry somenthing went wrong with your payment",
        "Thank you for shopping in SHOPLINE",
        "error"
      );
    }
  };

  //Function that handle the delete of products from the cart
  function handleDelete(productId: any) {
    dispatch(deleteFromCart(id, productId));
    window.location.reload();
  }

  const token = window.localStorage.getItem("token");
  const isLogin = useMemo(() => {
    if (token?.length) return true;
    else return false;
  }, [token]);

  if (!isLogin) {
    return (
      <div className={style["container"]}>
        <h1 className={style["title"]}>Your Cart is Empty</h1>
        <p className={style["message"]}>You need to login to add products to your cart...🛒 </p>
      </div>
    );
  } else {
    return (
      <div className={style["container"]}>
        <h1 className={style["title"]}>Cart</h1>
        <span className={style["line"]}></span>
        {cartDetail[0] &&
          cartDetail[0]?.products?.map((e: any) => {
            return (
              <div className={style["cart-card"]}>
                <p>{10 - e.stock}</p>
                <img className={style["image"]} src={e.image} alt={e.title} />
                <h2 className={style["product-title"]}>{e.title}</h2>
                <h3 className={style["price"]}>${e.price}</h3>
                <button
                  className={style["btn-delete"]}
                  onClick={() => handleDelete(e.id)}
                >
                  <FontAwesomeIcon icon={faDeleteLeft} />
                </button>
              </div>
            );
          })}
        <hr></hr>
        {/* {cartDetail[0]?.products
        ?.map((e: any) => e.price)
        .reduce((acc: number, curr: number) => {
          return <h2 className={style["total"]}>Total: ${acc + curr}</h2>;
        }, 0)} */}
        <h2 className={style["total"]}>Total: ${total}</h2>
        <div>
          <form
            className={style["paymentForm-container"]}
            onSubmit={handleSubmit}
          >
            <CardElement className={style["input-pay"]} />
            <button type="submit" className={style["button-pay"]}>
              Pay Now
            </button>
          </form>
        </div>
      </div>
    );
  }
}
