import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import style from "../../style/Login_and_Register/Login.module.css";
import { Link } from "react-router-dom";
import validationSchema from "./validations/validationLogin";
import { useAppDispatch } from "../../redux/store/hooks";
// import { getUserResource } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserResource, loginUser } from "../../redux/actions/Users";
import { useHistory } from "react-router-dom";

// interface FormValues {
//   email: string;
//   password: string;
// }

export default function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const { loginWithRedirect } = useAuth0();
  const history = useHistory();

  const initialValues: any = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialValues);
  // const [error ,setError] = useState({message: ''});

  const handleChange = (e: any) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setUser({ ...user, [inputName]: inputValue });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginUser(user)).then((data) => {
      dispatch(getUserResource(data)).then(() => {
        history.push("/home");
      });
    });
    setUser(initialValues);
  };

  const handleLoginWithGoogle = async () => {
    await loginWithRedirect({
      prompt: "login",
      appState: {
        returnTo: "/home",
      },
    });
  };

  const isLogin = window.localStorage.getItem("token");
  if (isLogin) {
    history.push("/home");
  }

  return (
    <div className={style["form-container"]}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        <Form
          className={style["card"]}
          onChange={handleChange}
          onSubmit={handleLogin}
        >
          <div className={style["card_header"]}>
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"
                fill="currentColor"
              ></path>
            </svg>
            <h1 className={style["form_heading"]}>Sign in</h1>
          </div>
          <div className={style["field"]}>
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              placeholder="Email"
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
              placeholder="Password"
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
            <button type="submit" className={style["button"]}>
              Sign in
            </button>
          </div>

          <div className={style["create-reference"]}>
            <span>No account?</span>
            <Link to={"register"}>
              <span className={style["link-create"]}> Create One</span>
            </Link>
          </div>
          <div className={style["field"]}>
            <button
              type="button"
              className={style["login-google-btn"]}
              onClick={handleLoginWithGoogle}
            >
              <FontAwesomeIcon icon={faGoogle} className={style["icon-go"]} />
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
