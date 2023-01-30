import React, { useEffect } from "react";
//import { getPopular } from "../../redux/actions/Products";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";




export default function Popular():JSX.Element {

    // const dispatch = useAppDispatch()
    // const popular = useAppSelector(state => state.popular)
    // console.log("aqui", popular);
    

    // useEffect(() => {
    //     dispatch(getPopular())
    // }, [dispatch])

    return (
        <div>
            {/* { popular.length && popular.map(p => {
                return (
                <div key={p.id}>
                    <img src={p.image} alt={p.title}/>
                    <h3>{p.title}</h3>
                    <p>{p.price}</p>
                    <p>{p.rating}</p>
                </div>
                )
            })} */}
        </div>
    )
}