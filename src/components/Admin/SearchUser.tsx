import style from "../../style/AdminPage/SearchUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../redux/store/hooks";
import { searchUsers } from "../../redux/actions/Admin/index";
import { useState } from "react";
import { UserInterface } from "../../types/types";

export const SearchUser = ({ setUserTarget }: any) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState({ name: "" });
  const [users, setUsers] = useState<UserInterface[]>();
  // const [userIsActive, setUserIsActive] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let nameValue = e.target.value;
    const newName = { name: nameValue };

    dispatch(searchUsers(nameValue)).then((users: any) => {
      setUsers(users.data);
    });
    setName(() => newName);
  }

  const selectUser = (user: UserInterface) => {
    const userSelected = {
      nickname: user.name,
      email: user.email,
      rol: user.rol,
      permissions: user.permissions,
    };
    // const userNonSelected = {
    //   nickname: '',
    //   email: '',
    //   rol: '',
    //   permissions: '',
    //   plan: ''
    // }
    // // setUserIsActive(!user ? true: false);
    setUserTarget(userSelected);
  };

  return (
    <div className={style["search-user-container"]}>
      <div className={style["search-container"]}>
        <input
          className={style["search-input"]}
          type="text"
          placeholder="Search anime..."
          value={name.name}
          onChange={(e) => handleInputChange(e)}
        />

        <button className={style["search-btn"]} type="submit">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={style["search-icon"]}
          />
        </button>
      </div>
      <div className={style["user-card-selection"]}>
        {users?.map((user) => {
          return (
            <div className={style["user-card"]}>
              <div className={style["user-card-img-container"]}>
                <img src={user?.image} alt="user" />
              </div>
              <div
                className={style["user-card-content"]}
                onClick={() => selectUser(user)}
              >
                <span className={style["name"]}>{user.name}</span>
                <span className={style["email"]}>{user.email}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SearchUser;
