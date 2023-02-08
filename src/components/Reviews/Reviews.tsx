import React, { useEffect, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import validationReview from "./validations/validationReview";
import { createReview, getDetail } from "../../redux/actions/Products";
import style from "../../style/Reviews/Reviews.module.css"
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";


interface FormValues {
    content:string
    rating:number
    username:any
    productId:any
}

export default function Reviews(): JSX.Element{

    const dispatch = useAppDispatch()
    const product:any = useAppSelector((state:any) => state.detail)
    const userInfo:any = useAppSelector((state:any) => state.user)
  

    
    
    
    var username: any = userInfo.name
    var productId: any = product.id
    
    let initialValues : FormValues = {
        content: "",
        rating: 0,
        username: "",
        productId: 0

    }
    
    const [input, setInput] = useState(initialValues)
    
    console.log(input, "aqui")
    
    const handleChange = async (event: React.ChangeEvent<any>) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        await dispatch(getDetail(productId))
        setInput({...input, [inputName]: inputValue })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await dispatch(getDetail(productId))
        await dispatch(createReview(input))
        setInput(initialValues)
        await dispatch(getDetail(productId))
        // setTimeout(() => { window.location.reload() }, 4500)
    }


    return (
        <div className={style["container"]}>
            <h1 className={style["title"]}>Write a review</h1>
            <Formik
            initialValues={initialValues} 
            onSubmit={handleSubmit}
            validationSchema={validationReview}>
                <Form onSubmit={handleSubmit} onChange={handleChange} className={style["form"]}>
                    <label htmlFor="content" className={style["label"]}>Review:</label>
                    <Field as="textarea" type="textarea" name="content" value={input.content} className={style["input"]}/>
                    <ErrorMessage name="content" component="span" className={style["error"]}/>
                    <label htmlFor="rating" className={style["label"]}>Rating:</label>
                    {/* <Field type="number" step="0.1" min="1" max="5" name="rating" value={input.rating} className={style["input"]}/> */}
                    <Stack spacing={1}>
                    <Rating name="rating" defaultValue={1} value={input.rating} size="large" />
                    </Stack>
                    <ErrorMessage name="rating" component="span" className={style["error"]}/>
                    <div className={style["sub-container"]}>
                    <Field type="text" name="username"  className={style["userName-productId"]} value={input.username = username}/>
                    <Field type="number" name="productId" className={style["userName-productId"]} value={input.productId = productId}/>
                    </div>
                    <button type="submit" className={style["button"]}>Submit</button>
                </Form>
            </Formik>
        </div>
    )
}