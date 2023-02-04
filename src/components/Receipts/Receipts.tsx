import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { getReceipt } from "../../redux/actions/Products";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import style from "../../style/Receipts/Receipts.module.css";
import { faCcStripe } from "@fortawesome/free-brands-svg-icons";

export default function Receipts(): JSX.Element {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  const receipts = useAppSelector((state) => state.receipts);


  const userId = userInfo.id;

   useEffect(() => {
     dispatch(getReceipt(userId));
  }, [dispatch, userId]);

  return (
    <div className={style["container"]}>
      <h1 className={style["name"]}><FontAwesomeIcon icon={faUserCheck}/> {userInfo?.name}</h1>
      <h2 className={style["address"]}><FontAwesomeIcon className={style["icon-address"]} icon={faLocationDot}/> {userInfo?.address}</h2>
      <div className={style["sub-container"]}>
      {receipts[0] &&
        receipts[0]?.payments?.map((pay: any) => {
            return (
                <div className={style["receipt-card"]}>
                    <FontAwesomeIcon className={style["stripe"]} icon={faCcStripe}/>
              <h3>Payment ID: {pay.id}</h3>
              <h3>Description: {pay.description}</h3>
              <h3>Currency: {pay.currency.toUpperCase()}</h3>
              <h3>Amount: ${pay.amount / 100}</h3>
              <h3>
                Payment Method: {pay.payment_method_types.map((e: any) => e)}
              </h3>
              <h3>Status: {pay.status}</h3>
            </div>
          );
        })}
        </div>
    </div>
  );
}
