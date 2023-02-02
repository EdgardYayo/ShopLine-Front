import  { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { getProducts } from "../../redux/actions/Products";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import Paged from "../Paged/Paged";
import NavBar from "../NavBar/NavBar";
import Sorts from "../Sorts/Sorts";
import { Link } from "react-router-dom";
import Loading from "../../utils/Loading";

export default function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products);
  const userInfo = useAppSelector((state) => state.user);
  //console.log(allProducts);

  /*Paged Logic*/
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const lastIndex: number = currentPage * productsPerPage;
  const firstIndex: number = lastIndex - productsPerPage;
  const currentProducts = allProducts?.slice(firstIndex, lastIndex)

  const paged = (numberPage:number) => {
    setCurrentPage(numberPage)
  }


  /*Order*/
  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getProducts())
  },[dispatch])

  return (
    <div>
      <NavBar setCurrentPage={setCurrentPage}></NavBar>
      <Sorts setCurrentPage={setCurrentPage} setOrder={setOrder}></Sorts>
      {currentProducts.length !== 0 ?
        currentProducts?.map((product: any) => {
          return (
            // <Link to={"/detail/" + product.id}>
            <ProductCard
              id={product.id}
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              />
           // </Link>
          );
        }) : <Loading></Loading> }
        <Paged
        paged={paged}
        allProducts={allProducts.length}
        productsPerPage={productsPerPage}
       />
    </div>
  );
}
