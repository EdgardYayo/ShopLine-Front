import { useAuth0 } from "@auth0/auth0-react";
import {
  getUserResource,
  getUserResourceWithGoogle,
} from "../../redux/actions/Users/index";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store/hooks";
import { useHistory } from "react-router-dom";
import { UserInterface } from "../../types/types";

export default function Profile(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const history = useHistory();
  // const userAccounnt = useAppSelector((state) => state.user);
  const { getAccessTokenSilently, user } = useAuth0<any>();
  const regularToken = window.localStorage.getItem("token");

  const emailUser = user?.email ? user?.email : "";
  const [userLog, setUserLog] = useState<UserInterface>({} as UserInterface);

  const getToken = useCallback(async () => {
    const accesToken = await getAccessTokenSilently();
    dispatch(getUserResourceWithGoogle(accesToken, user)).then((val) => {
      setUserLog(val);
    });
  }, [getAccessTokenSilently, emailUser, dispatch]);

  useEffect(() => {
    getToken();
    dispatch(getUserResource(regularToken ? regularToken : "")).then((val) => {
      setUserLog(val);
    });
  }, [getToken, dispatch, regularToken]);

  if (!regularToken || !userLog) {
    history.push("/login");
  }

  return (
    <div>
      {userLog?.rol === "Admin" && (
        <div className="admin">
          <Link to="/admin">Admin</Link>
        </div>
      )}
      {userLog && (
        <div className="row align-items-center profile-header">
          <img src={userLog.image} alt={userLog.name} />
          <h2>{userLog.name}</h2>
          <h2>{userLog.email}</h2>
        </div>
      )}
    </div>
  );
}
