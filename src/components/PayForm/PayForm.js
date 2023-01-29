import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getPay } from "../../redux/actions/Products";
import style from "../../style/PayForm/PayForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import swa from "sweetalert";

export default function PayForm(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const amount = detail.price * 100;
  const description = detail.title;


  const stripePromise = loadStripe(
    "pk_test_51MUNEFDboVCgRDITHbfMWziUTBVcWxNqo8vqnQMoZ7LbiialaYzgCWzqEINkpsqStseqmS0xQLx7qpPayp4yZrAD00GRJnzYHZ"
  );


  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      dispatch(getPay({id, amount, description}));
      elements.getElement(CardElement).clear();
      swa("You payment was successfully processed", "Thank you for shopping in SHOPLINE", "success")
    }

    if(error){
        swa("Sorry somenthing went wrong with your payment", "Thank you for shopping in SHOPLINE", "error")
    }
  };

  return (
    <div className={style["container"]}>
      <div className={style["subcontainer"]}>
        <img className={style["image"]} src={detail.image} alt={detail.title} />
        <h1 className={style["title"]}>{detail.title}</h1>
        <p className={style["price"]}><FontAwesomeIcon icon={faDollarSign} className={style["icon"]}/> {detail.price}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <CardElement className={style["input-pay"]} />
        <button type="submit" className={style["button-pay"]}>
          Pay Now
        </button>
      </form>
    </div>
  );
}
