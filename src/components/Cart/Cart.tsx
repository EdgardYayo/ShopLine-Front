import React, { useEffect } from "react";
import { getClientCart } from "../../redux/actions/Cart";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";

export default function Cart(): JSX.Element {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  const cartDetail = useAppSelector((state) => state.cart);

  console.log(cartDetail);

  const id = userInfo.id;

  useEffect(() => {
    dispatch(getClientCart(id));
  }, [dispatch, id]);

  return (
    <div style={{ marginTop: "200px" }}>
      {cartDetail.products &&
        cartDetail.products?.map((e: any) => {
          return (
            <div>
              <h2>{e.title}</h2>
              <img src={e.image} alt={e.title} />
              <h3>{e.price}</h3>
            </div>
          );
        })}
      {cartDetail.products
        ?.map((e: any) => e.price)
        .reduce((acc: number, curr: number) => {
          return <h2>Total: {acc + curr}</h2>;
        })}
    </div>
  );
}
