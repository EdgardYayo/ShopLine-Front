import {  useState } from "react";
import { changeUserSettings } from "../../../redux/actions/Users";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import style from "../../../style/User/UserSettings.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "../../Login_and_Register/validations/validationRegister";
import { useAuth0 } from "@auth0/auth0-react";

export default function User() {
  const dispatch = useAppDispatch();
  const userAccount = useAppSelector((state) => state.user);
  const { user } = useAuth0();
  const [UserSettings, setUserSettings] = useState({
    name: userAccount.name,
    image: userAccount.image || "",
    dni: userAccount.dni,
    phone: userAccount.phone,
    address: userAccount.address,
    password: "",
    confirmPassword: "",
  });
  // const [errorForm, setErrorForm] = useState('');
  const handleChange = (e: any) => {
    let newUserSettings = { ...UserSettings };
    const inputName = e.target.name;
    const inputValue = e.target.value;

    newUserSettings = { ...newUserSettings, [inputName]: inputValue };
    setUserSettings(newUserSettings);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(changeUserSettings(userAccount.id, UserSettings)).then(() =>
      alert("Settings saved successfully")
    );
  };
  return (
    <>
      <h1 className={style["user-settings-title"]}>User settings</h1>
      <Formik
        initialValues={UserSettings}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form
          className={style["form-user-settings"]}
          onChange={handleChange}
          onSubmit={handleSubmit}
        >
          <div className={style["form-user-option"]}>
            <label>Name</label>
            <Field
              type={"text"}
              placeholder={"Name..."}
              value={UserSettings.name}
              name="name"
            />
          </div>
          <ErrorMessage
            name="name"
            component="span"
            className={style["form__error"]}
          />

          <div className={style["form-user-option"]}>
            <label>Image</label>
            <Field
              type={"url"}
              placeholder={"Url image..."}
              value={UserSettings.image}
              name="image"
            />
          </div>

          <div className={style["form-user-option"]}>
            <label>Document Number</label>
            <Field
              type={"text"}
              placeholder={"Your dni..."}
              value={UserSettings.dni}
              name="dni"
            />
          </div>
          <ErrorMessage
            name="dni"
            component="span"
            className={style["form__error"]}
          />

          <div className={style["form-user-option"]}>
            <label>Cellphone</label>
            <Field
              type={"text"}
              placeholder={"Your dni..."}
              value={UserSettings.phone}
              name="phone"
            />
          </div>
          <ErrorMessage
            name="phone"
            component="span"
            className={style["form__error"]}
          />

          <div className={style["form-user-option"]}>
            <label>Address</label>
            <Field
              as="textarea"
              type={"text"}
              placeholder={"Your address..."}
              value={UserSettings.address}
              name="address"
            />
          </div>
          <ErrorMessage
            name="address"
            component="span"
            className={style["form__error"]}
          />

          {!user && (
            <>
              <div className={style["form-user-option"]}>
                <label>Change password</label>
                <Field
                  type={"password"}
                  placeholder={"Password..."}
                  value={UserSettings.password}
                  name="password"
                />
              </div>
              <ErrorMessage
                name="password"
                component="span"
                className={style["form__input"]}
              />

              <div className={style["form-user-option"]}>
                <label>Confirm password</label>
                <Field
                  type={"password"}
                  placeholder={"Confirm password..."}
                  value={UserSettings.confirmPassword}
                  name="confirmPassword"
                />
              </div>
            </>
          )}
          <ErrorMessage
            name="confirmPassword"
            component="span"
            className={style["form__input"]}
          />

          <button type="submit" className={style["save-changes-btn"]}>
            Save settings
          </button>
        </Form>
      </Formik>
    </>
  );
}
