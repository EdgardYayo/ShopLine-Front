import React from "react";
import style from "./NotFound.module.css";
import productNotFound from "../img/notFound/no-product.png";
import { Link } from "react-router-dom";
interface NotFoundInterface {
  msg?: string;
  color?: string;
}

export default function NotFound({ msg, color }: NotFoundInterface) {
  return (
    <div className={style["not-found"]} style={{ color: color }}>
      <div className={style["not-found-content"]}>
        <h1>
          404 <br />
          {msg || "Oooopss...nothing to show here"}
        </h1>
        <button type="button" className={style["callback-btn"]}>
          <Link to="/home">Go back home</Link>
        </button>
      </div>
      <div className={style["not-found-image"]}>
        <img
          src={productNotFound}
          alt="img not found"
          className={style["not-found-img"]}
        ></img>
      </div>
    </div>
  );
}
