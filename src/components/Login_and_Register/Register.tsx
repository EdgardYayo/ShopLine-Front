import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import style from "../../style/Login_and_Register/Register.module.css";
import { Link } from "react-router-dom";
import validationSchema from "./validations/validationRegister";
import { useAppDispatch } from "../../redux/store/hooks";
import { registerUser } from "../../redux/actions/Users/index";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faClose, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import imgNotFound from "../../img/slide/3.jpg";
import { nationalities } from "../../utils/Nationalities";

export default function Register(): JSX.Element {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const initialValues: any = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dni: "",
    phone: "",
    address: "",
    nationality: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [errorReg, setErrorReg] = useState("");
  const [user, setUser] = useState(initialValues);
  const { loginWithRedirect } = useAuth0();


  const handleChange = (e: any) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setUser({ ...user, [inputName]: inputValue });
  };
  const handleLoginWithGoogle = async () => {
    await loginWithRedirect({
      prompt: "login",
      appState: {
        returnTo: "/home",
      },
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(registerUser(user))
      .then((val) => {
        setIsLoading(false);
        alert("Check your email for account verification!");
        setUser({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          dni: "",
          phone: "",
          address: "",
          nationality: "",
        });
        history.push("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorReg(err.message);
        setUser({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          dni: "",
          phone: "",
          address: "",
          nationality: "",
        });
      });

    // No se esta seteando correctamente los inputs a su valor inicial
    // CHEQUEAR QUE FUNCIONE
  };

  const toggleModal = () => {
    setErrorReg("");
  };

  return (
    <div className={style["form-container"]}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form
          className={style["card"]}
          onChange={handleChange}
          onSubmit={handleSubmit}
        >
          <div className={style["card_header"]}>
            <FontAwesomeIcon icon={faUserPlus} />
            <h1 className={style["form_heading"]}>Sign up</h1>
          </div>
          <div className={style["field"]}>
            <label htmlFor="name">Name</label>
            <Field
              name="name"
              type="text"
              className={style["input"]}
              value={user.name}
            />
            <ErrorMessage
              name="name"
              component="span"
              className={style["form__error"]}
            />
          </div>
          <div className={style["field"]}>
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              type="text"
              className={style["input"]}
              value={user.email}
            />
            <ErrorMessage
              name="email"
              component="span"
              className={style["form__error"]}
            />
          </div>
          <div className={style["field"]}>
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              type="password"
              className={style["input"]}
              value={user.password}
            />
            <ErrorMessage
              name="password"
              component="span"
              className={style["form__error"]}
            />
          </div>
          <div className={style["field"]}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field
              name="confirmPassword"
              type="password"
              className={style["input"]}
              value={user.confirmPassword}
            />
            <ErrorMessage
              name="confirmPassword"
              component="span"
              className={style["form__error"]}
            />
          </div>
          <div className={style["field"]}>
            <label htmlFor="dni">Document Number</label>
            <Field
              name="dni"
              type="text"
              className={style["input"]}
              value={user.dni}
            />
            <ErrorMessage
              name="dni"
              component="span"
              className={style["form__error"]}
            />
          </div>
          <div className={style["field"]}>
            <label htmlFor="phone">Cellphone</label>
            <Field
              name="phone"
              type="text"
              className={style["input"]}
              value={user.phone}
            />
            <ErrorMessage
              name="phone"
              component="span"
              className={style["form__error"]}
            />
          </div>
          <div className={style["field"]}>
            <label htmlFor="address">Address</label>
            <Field
              name="address"
              as="textarea"
              type="text"
              className={style["input"]}
              value={user.address}
            />
            <ErrorMessage
              name="address"
              component="span"
              className={style["form__error"]}
            />
          </div>
          <div className={style["field"]}>
            <label htmlFor="nationality">Nationality</label>
            <Field
              type="text"
              name="nationality"
              className={style["input"]}
              value={user.nationality}
            />
            <ErrorMessage
              name="nationality"
              component="span"
              className={style["form__error"]}
            />
          </div>
          <div className={style["field"]}>
            <button
              type="submit"
              className={style["button"]}
              disabled={isLoading ? true : false}
            >
              Sign up
            </button>
          </div>
          <div className={style["create-reference"]}>
            <p>
              Already have an account?
              <Link to={"login"} className={style["link"]}>
                <span className={style["link-create"]}> Log In</span>
              </Link>
            </p>
          </div>
          Or
          <div className={style["field"]}>
            <p style={{ marginBottom: "2em" }}>
              <button
                type="button"
                className={style["login-google-btn"]}
                onClick={handleLoginWithGoogle}
              >
                <FontAwesomeIcon icon={faGoogle} className={style["icon-go"]} />
              </button>
            </p>
          </div>
        </Form>
      </Formik>

      {errorReg ? (
        <div className={style["modal"]}>
          <div onClick={toggleModal} className={style["overlay"]}></div>
          <div className={style["modal-content"]}>
            <h4 className={style["title-modal"]}>{errorReg}</h4>
            <img
              className={style["img-notFound"]}
              src={imgNotFound}
              alt="img_notFound"
            />
            <button
              onClick={toggleModal}
              className={style["button-create-list-modal"]}
            >
              <FontAwesomeIcon icon={faClose} />
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
