import UserNav from "./UserNav";
import HeaderUser from "./HeaderUser";
// import MyList from "./Options/MyList";
// import User from "./Options/User";

// import Achievements from "./Options/Achievements";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import style from "../../style/User/User.module.css";
// import { useCallback, useEffect, useState } from "react";
// import { getUserResource, getUserResourceWithGoogle } from "../../redux/actions";
// import {  UserInterface } from "../../types/types";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../redux/store/hooks";
// import Admin from "../AdminPage/Admin";

// import { useAppDispatch } from "../../redux/hooks";
// import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import Cart from "../Cart/Cart";
import User from "./Options/User";
import Receipts from "../Receipts/Receipts";
import MyList from "./Options/MyList";

// import Admin from "../AdminPage/Admin";
// import ListDetail from "./Options/ListDetail";

export default function UserDashboard(): JSX.Element {
  const { options } = useParams<any>();

  // const dispatch = useAppDispatch();
  const history = useHistory();
  // const userAccounnt = useAppSelector((state) => state.user);
  // const {user } = useAuth0();
  const regularToken = window.localStorage.getItem("token");

  // const emailUser = user?.email ? user?.email : '';
  const userLog = useAppSelector((state) => state.user);

  if (!regularToken || !userLog) {
    history.push("/login");
  }

  return (
    <div className={style["user"]}>
      <UserNav {...userLog} />
      <div className={style["user-content"]}>
        <HeaderUser />
        <div className={style["welcome"]}>
          <h2 className={style["hola"]}>Hi {userLog.name}</h2>
          <span className={style["question"]}>
            What are you going to buy today?
          </span>
        </div>
        {options === "cart" ? (
          <Cart />
        ) : options === "list" ? (
          <MyList />
        ) : options === "user" ? (
          <User />
        ) : options === "receipt" ? (
          <Receipts />
        ) : null}
      </div>
    </div>
  );
}
