import React, { useEffect, useMemo } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDetail, getPay } from "../../redux/actions/Products";
import style from "../../style/PayForm/PayForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import swa from "sweetalert";
import { faStripeS } from "@fortawesome/free-brands-svg-icons";

export default function PayForm(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  const userInfo = useSelector((state) => state.user);
  const history = useHistory()

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const amount = detail.price * 100;
  const description = detail.title;


  const stripe = useStripe();
  const elements = useElements();
  const userId = userInfo.id
  const handleSubmit = async (e) => {
    e.preventDefault();


    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      await dispatch(getPay({id, amount, description, userId }));
      elements.getElement(CardElement).clear();
      swa("You payment was successfully processed", "Thank you for shopping in SHOPLINE", "success")
      history.push("/receipt")
      window.location.reload()
    }

    if(error){
        swa("Sorry somenthing went wrong with your payment", "Thank you for shopping in SHOPLINE", "error")
    }
  };

  const token = window.localStorage.getItem("token");
  const isLogin = useMemo(() => {
    if (token?.length) return true;
    else return false;
  }, [token]);

  if(!isLogin){
    return (
      <div className={style["container"]}>
        <h1 className={style["title"]}>You need to login if you want to buy <FontAwesomeIcon className={style["icon-warn"]} icon={faTriangleExclamation}/></h1>
      </div>
    )
  } 
  return (
    <div className={style["container"]}>
      <div className={style["subcontainer"]}>
        <img className={style["image"]} src={detail.image} alt={detail.title} />
        <h1 className={style["title"]}>{detail.title}</h1>
        <p className={style["price"]}><FontAwesomeIcon icon={faDollarSign} className={style["icon"]}/> {detail.price}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <FontAwesomeIcon className={style["s"]} icon={faStripeS}/>
        <CardElement className={style["input-pay"]} />
        <button type="submit" className={style["button-pay"]}>
          Pay Now
        </button>
      </form>
    </div>
  );
}
