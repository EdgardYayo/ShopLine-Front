import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import React from "react";
import style from "../../style/Sorts/ResetButton.module.css";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../redux/store/hooks";
import { getProducts } from "../../redux/actions/Products";



export default function ResetButton(): JSX.Element {
    const dispatch = useAppDispatch()

    
    return(
        <div className={style["container"]}>
            <Button onClick={() => dispatch(getProducts())} variant="contained">
               <FontAwesomeIcon className={style["icon"]} icon={faArrowsRotate}/> Restore
            </Button>
        </div>
    )
}
