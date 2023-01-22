import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions/Products/index";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import style from "../../style/ProductDetail/ProductDetail.module.css";

export default function ProductDetail(): JSX.Element {
  const id  = useParams();
  console.log(id)
  const dispatch = useAppDispatch();
  const detail = useAppSelector((state) => state.detail);
  console.log(detail)

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1>{detail.title}</h1>
      <div>
        <img src={detail.image} alt="product" />
        <div>
          <p>{detail.description}</p>
          <span>{detail.rating}</span>
          <p>{detail.category}</p>
          <p>{detail.price}</p>
        </div>
      </div>
    </div>
  );
}
