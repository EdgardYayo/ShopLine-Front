import React from "react";

interface product {
  title: string;
  image: string;
  price: number;
}

export default function ProductCard(props: product): JSX.Element {
  return (
    <div>
      <h2>{props.title}</h2>
      <img src={props.image} alt={"product"} />
      <p>{props.price}</p>
    </div>
  );
}
