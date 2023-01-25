import React, { useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useAppDispatch } from "../../redux/store/hooks";
import validationReview from "./validations/validationReview";
import { createReview } from "../../redux/actions/Products";
import style from "../../style/Reviews/Reviews.module.css"


interface FormValues {
    content:string
    rating:number
}

export default function Reviews(): JSX.Element{

    const dispatch = useAppDispatch()

    const initialValues : FormValues = {
        content: "",
        rating: 0
    }
    const [input, setInput] = useState(initialValues)


    const handleChange = (event: React.ChangeEvent<any>) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
    
    setInput({...input, [inputName]: inputValue })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        dispatch(createReview(input))
        setInput(initialValues)
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
                    <Field type="textarea" name="content" value={input.content} className={style["input"]}/>
                    <ErrorMessage name="content" component="span" className={style["error"]}/>
                    <label htmlFor="rating" className={style["label"]}>Rating:</label>
                    <Field type="number" name="rating" value={input.rating} className={style["input"]}/>
                    <ErrorMessage name="rating" component="span" className={style["error"]}/>
                    <button type="submit" className={style["button"]}>Submit</button>
                </Form>
            </Formik>
        </div>
    )
}