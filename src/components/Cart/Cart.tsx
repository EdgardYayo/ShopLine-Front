import { faDeleteLeft, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { clearCart, deleteFromCart, getClientCart } from "../../redux/actions/Cart";
import { getProducts } from "../../redux/actions/Products";
import { cleanUserInfo } from "../../redux/actions/Users";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import style from "../../style/Cart/Cart.module.css";



export default function Cart(): JSX.Element {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  const cartDetail = useAppSelector((state) => state.cart);

  

  const id = userInfo.id;

  useEffect(():any => {
    dispatch(getClientCart(id))

    return () => {
      dispatch(clearCart())
    }
  
  }, [dispatch, id]);


  const total = cartDetail[0]?.products?.map((e:any) => e.price).reduce((acc:number, curr:number) => acc + curr)



  function handleDelete(productId: any){
    dispatch(deleteFromCart(id, productId))
    window.location.reload()
  }
  
 if(cartDetail === undefined)
  {
  return (
      <div className={style["container"]}>
        <h1 className={style["title"]}>Your Cart is Empty</h1>
        <p>You don't have products in your cart...🛒 </p>
      </div>
    )
  } else {
  return (
    <div className={style["container"]}>
      <h1 className={style["title"]}>Cart</h1>
      <span className={style["line"]}></span>
      {cartDetail[0] &&
        cartDetail[0]?.products?.map((e: any) => {
          return (
            <div className={style["cart-card"]}>
              <img className={style["image"]} src={e.image} alt={e.title} />
              <h2 className={style["product-title"]}>{e.title}</h2>
              <h3 className={style["price"]}>${e.price}</h3>
              <button className={style["btn-delete"]} onClick={() => handleDelete(e.id)}><FontAwesomeIcon icon={faDeleteLeft}/></button>
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
    </div>
  );

      }
}
