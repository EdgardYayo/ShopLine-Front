import React, { useEffect } from "react";
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
import Reviews from "../Reviews/Reviews";
import ShowReviews from "../ShowReviews/ShowReviews";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/actions/Cart";

export default function ProductDetail(props: any): JSX.Element {
  const id = props.match.params.id;
  const dispatch = useAppDispatch();
  const detail = useAppSelector((state) => state.detail);

  const userInfo = useAppSelector((state) => state.user);

  function handleClick(productId: number) {
    const id = userInfo.id;

    dispatch(addToCart(id, productId));
    console.log(productId, "idddddd");
  }

  const productId = detail.id;

  useEffect(() => {
    dispatch(getDetail(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  return (
    <div className={style["container"]}>
      <h1 className={style["title"]}>{detail?.title}</h1>
      <div className={style["items-container"]}>
        <img className={style["image"]} src={detail?.image} alt="product" />
        <div className={style["sm-container"]}>
          <label>Description:</label>
          <span className={style["items-span"]}>{detail?.description}</span>
          <p className={style["items-p"]}>
            <FontAwesomeIcon className={style["icon-star"]} icon={faStar} />{" "}
            {detail?.rating}
          </p>
          <p className={style["items-p"]}>
            <FontAwesomeIcon className={style["icon-gift"]} icon={faGifts} />{" "}
            {detail?.category}
          </p>
          <p className={style["items-p"]}>
            <FontAwesomeIcon className={style["icon-tag"]} icon={faTag} /> $
            {detail?.price}
          </p>
          <div className={style["sub-sm-container"]}>
            <button
              className={style["btn-cart"]}
              onClick={() => handleClick(productId)}
            >
              <FontAwesomeIcon
                className={style["icon-cart"]}
                icon={faCartPlus}
              />{" "}
              Add to Cart
            </button>
            <Link to={"/payment/" + detail.id}>
              <button className={style["btn-buy"]}>
                <FontAwesomeIcon
                  className={style["icon-dollar"]}
                  icon={faMoneyCheckDollar}
                />
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className={style["reviews-container"]}>
        <Reviews></Reviews>
        <ShowReviews></ShowReviews>
      </div>
    </div>
  );
}
