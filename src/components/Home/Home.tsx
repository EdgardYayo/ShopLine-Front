import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import ProductCard from "../ProductCard/ProductCard";
import { getProducts } from "../../redux/actions/Products";
import { useAppSelector } from "../../redux/store/hooks";

export default function Home(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const allProducts = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts())
  })

  return (
    <div>
      <h1>Home</h1>
      {allProducts.length &&
        allProducts.map((product: any) => {
          return (
            <ProductCard
              image={product.image}
              title={product.title}
              price={product.price}
            />
          );
        })}
    </div>
  );
}
