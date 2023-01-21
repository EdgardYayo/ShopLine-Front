import React, { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { getProducts } from "../../redux/actions/Products";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";

export default function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products);
  console.log(allProducts);
  

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
