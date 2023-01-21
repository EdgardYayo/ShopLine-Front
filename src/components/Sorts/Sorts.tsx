import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import React, { ChangeEvent } from "react";
import style from "../../style/Sorts/Sorts.module.css";
import { useAppDispatch } from "../../redux/store/hooks";
import { orderByName, orderByPrice } from "../../redux/actions/Products";



export default function Sorts({setOrder, setCurrentPage}:any):JSX.Element{

    const dispatch = useAppDispatch();

    /*Sort by Price*/
    function handleSortPrice(e:ChangeEvent<any>){
        e.preventDefault()
        dispatch(orderByPrice(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
        
    }
    
    /*Sort by Name*/
    function handleSortName(e:ChangeEvent<any>){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    return(
        <div className={style["container"]}>
            <select onChange={(e) => handleSortPrice(e)}>
                <option value={"all"}>Sort By $</option>
                <option value={"asc"}>Expensive</option>
                <option value={"desc"}>Cheap</option>
            </select>
            <select onChange={(e) => handleSortName(e)}>
                <option value={"all"}>Sort By Ⓐ</option>
                <option value={"asc"}>A-Z</option>
                <option value={"desc"}>Z-A</option>
            </select>
        </div>
    )
}