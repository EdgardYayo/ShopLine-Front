import React, { useEffect } from "react";
import { getReviews } from "../../redux/actions/Products";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import style from "../../style/ShowReviews/ShowReviews.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ShowReviews(): JSX.Element {
  const dispatch = useAppDispatch();
  // const allReviews = useAppSelector((state) => state.reviews);
  const allReviews = useAppSelector((state) => state.detail);
 
  
  return (
    <div className={style["container"]}>
      {allReviews &&
        allReviews.reviews?.map((rev:any) => {
          return (
            <div className={style["sub-container"]} key={rev}>
              <p>{rev.username}</p>
              <p className={style["content"]}>{rev.content}</p>
              <p className={style["rating"]}>
                <FontAwesomeIcon className={style["icon"]} icon={faStar} />
                {rev.rating}
              </p>
            </div>
          );
        })}
    </div>
  );
}
