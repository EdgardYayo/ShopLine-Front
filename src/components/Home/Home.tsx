import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { getProducts } from "../../redux/actions/Products";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import Paged from "../Paged/Paged";

export default function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products);
  console.log(allProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const lastIndex: number = currentPage * productsPerPage;
  const firstIndex: number = lastIndex - productsPerPage;
  const currentProducts = allProducts.slice(firstIndex, lastIndex)

  const paged = (numberPage:number) => {
    setCurrentPage(numberPage)
  }


  useEffect(() => {
    dispatch(getProducts())
  })

  return (
    <div>
      <h1>Home</h1>
      {currentProducts.length &&
        currentProducts.map((product: any) => {
          return (
            <ProductCard
              image={product.image}
              title={product.title}
              price={product.price}
            />
          );
        })}
        <Paged
        paged={paged}
        allProducts={allProducts.length}
        productsPerPage={productsPerPage}
       />
    </div>
  );
}
