import React, { useEffect } from "react";
import { getDetail, getReviews } from "../../redux/actions/Products";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import style from "../../style/ShowReviews/ShowReviews.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faFile, faFileLines, faStar, faUser, faUserPen } from "@fortawesome/free-solid-svg-icons";

export default function ShowReviews(): JSX.Element {
  const dispatch = useAppDispatch();
  // const allReviews = useAppSelector((state) => state.reviews);
  const allReviews = useAppSelector((state) => state.detail);
 
  // useEffect(() => {
  //   dispatch(getDetail(allReviews.id))
  // }, [dispatch])

  return (
    <div className={style["container"]}>
      {allReviews &&
        allReviews.reviews?.map((rev:any) => {
          return (
            <div className={style["sub-container"]} key={rev}>
              <p className={style["username"]}><FontAwesomeIcon className={style["icon-user"]} icon={faUserPen}/>{rev.username}</p>
              <p className={style["content"]}><FontAwesomeIcon className={style["icon-txt"]} icon={faComment}/>{rev.content}</p>
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
