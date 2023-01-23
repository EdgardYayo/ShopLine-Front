import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions/Products/index";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import style from "../../style/ProductDetail/ProductDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faTag,
  faGifts,
  faCartPlus,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductDetail(props: any): JSX.Element {
  const id = props.match.params.id;
  console.log(id);
  const dispatch = useAppDispatch();
  const detail = useAppSelector((state) => state.detail);
  console.log(detail);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div className={style["container"]}>
      <h1 className={style["title"]}>{detail[0]?.title}</h1>
      <div className={style["items-container"]}>
        <img className={style["image"]} src={detail[0]?.image} alt="product" />
        <div className={style["sm-container"]}>
          <label>Description:</label>
          <span className={style["items-span"]}>{detail[0]?.description}</span>
          <p className={style["items-p"]}>
            <FontAwesomeIcon className={style["icon-star"]} icon={faStar} /> {detail[0]?.rating}
          </p>
          <p className={style["items-p"]}>
            <FontAwesomeIcon className={style["icon-gift"]} icon={faGifts} /> {detail[0]?.category}
          </p>
          <p className={style["items-p"]}>
            <FontAwesomeIcon className={style["icon-tag"]} icon={faTag} /> ${detail[0]?.price}
          </p>
          <div className={style["sub-sm-container"]}>
            <button className={style["btn-cart"]}>
             <FontAwesomeIcon className={style["icon-cart"]} icon={faCartPlus} />  Add to Cart 
            </button>
            <button className={style["btn-buy"]}>
             <FontAwesomeIcon className={style["icon-dollar"]} icon={faMoneyCheckDollar} />  Buy Now 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
