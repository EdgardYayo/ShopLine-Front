import style from "../../style/Admin/Admin.module.css";
import SearchUser from "./SearchUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears, faUser } from "@fortawesome/free-solid-svg-icons";
import { adminActions } from "../../redux/actions/Admin/index";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { useState } from "react";
import NotFound from "../../utils/NotFound";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";

// interface AdminOptions {
//   admin: string,
//   user: string,
//   actions: string
// }
export default function Admin(): JSX.Element {
  // const { getAccessTokenSilently, user } = useAuth0();
  // const regularToken = window.localStorage.getItem('token');
  const dispatch = useAppDispatch();

  // const [admin, setAdmin] = useState<UserInterface>({} as UserInterface);
  const adminAccount = useAppSelector((state) => state.user);
  const [userTarget, setUserTarget] = useState({
    name: "",
    email: "",
    rol: "",
    permissions: "",
  });
  // const options = useState({
  //   admin: "",
  //   user: "",
  //   action: ""

  // })

  const executeAction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const action = e.target.value;
    const options = {
      admin: adminAccount.email,
      user: userTarget.email,
      action: action,
    };

    dispatch(adminActions(options))
      .then((val) => {
        setUserTarget(() => val);
      })
      .catch((err) => {
        alert("Invalid action");
      });
  };

  if (!adminAccount) {
    return <NotFound />;
  } else if (adminAccount.rol !== "Admin") {
    return <NotFound msg="You don't have permissions to access this page" />;
  }
  return (
    <div className={style["admin-container"]}>
      <div className={style["nav-admin"]}>
        <h1 className={style["text-user"]}>Welcome again </h1>
        <h2>{adminAccount.name}</h2>
        {/* <div className={style["user-box"]}>
          <div className={style["card"]}>
            {admin.image ? (
              <img
                className={style["image"]}
                src={`${admin.image}`}
                alt="img"
              />
            ) : (
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            )}
            <div className={style["text-container"]}>
              <div className={style["text"]}>
                <span>Name: Juan</span>
              </div>
              <div className={style["text"]}>
                <span>Role: Admin</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <h2 className={style["h2"]}>User management</h2>
      <div className={style["admin-content"]}>
        <SearchUser setUserTarget={setUserTarget} />

        <div className={style["user-data-container"]}>
          <div className={style["container-image-data-container"]}>
            {/* <img src={userDefault} alt="user" /> */}
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className={style["sub-container-data-container"]}>
            <div className={style["content-data-container"]}>
              <span className={style["title-data-container"]}>Name</span>
              <span className={style["text-data-container"]}>
                {userTarget.name}
              </span>
            </div>
            <div className={style["content-data-container"]}>
              <span className={style["title-data-container"]}>Rol</span>
              <span className={style["text-data-container"]}>
                {userTarget.rol}
              </span>
            </div>
            <div className={style["content-data-container"]}>
              <span className={style["title-data-container"]}>Status</span>
              <span className={style["text-data-container"]}>
                {userTarget.permissions}
              </span>
            </div>
          </div>
          <div>
            <FontAwesomeIcon icon={faGears} />
          </div>
        </div>

        <div className={style["settings-container"]}>
          <div className={style["box-container"]}>
            <div className={style["box"]}>
              Name
              <div>
                <div>
                  <div className={style["box-text"]}>
                    {userTarget.name || "Select a user"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style["box-container"]}></div>
          <div className={style["box-container"]}>
            <div className={style["box"]}>
              Role
              <div>
                <div>
                  <select name="action" onChange={(e) => executeAction(e)}>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className={style["box-container"]}>
            <div className={style["box"]}>
              Status
              <div>
                <div>
                  <select name="action" onChange={(e) => executeAction(e)}>
                    <option value="Watch">Active</option>
                    <option value="Banned">Ban</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className={style["charts-container"]}>
        <BarChart/>
        <DonutChart/>
      </section>
    </div>
  );
}
