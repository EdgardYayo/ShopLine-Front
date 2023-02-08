import React, { useEffect, useState } from "react";
import { faBookmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../../style/User/MyList.module.css";
import {
  getAllListsUser,
  createList,
  clearAllLists,
} from "../../../redux/actions/List";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import imageNotFound from "../../../img/notFound/no-product.png";
import ListComponent from "./ListComponent";

export default function MyList() {
  const dispatch = useAppDispatch();
  const allListsFromUser = useAppSelector((state) => state.userLists);
  const userInfo = useAppSelector((state) => state.user);
  // email: userInfo.email
  const [list, setList] = useState({
    name: "",
    email: userInfo.email,
  });

  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getAllListsUser(userInfo.id));
    // dispatch(getAllListsUser(userInfo.id));
    // Este id que paso esta hardcodeado
  }, [dispatch, userInfo.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setList({ ...list, [inputName]: inputValue });
  };

  const submitHandler = async () => {
    await dispatch(createList(list));
    await dispatch(clearAllLists());
    await dispatch(getAllListsUser(userInfo.id));
    setList({
      name: "",
      email: userInfo.email,
    });
    setModal(!modal);
    // Deshacer el modal
    // Luego hacer history.push(/list/:id);
    // En el componente del detalle de la lista puedo usar useParams() para traer el id de la lista directamente.
  };
  const toggleModal = () => {
    setModal(!modal);
    setList({
      name: "",
      email: userInfo.email,
    });
  };

  if (modal) {
    document.body.classList.add(style["active-modal"]);
  } else {
    document.body.classList.remove(style["active-modal"]);
  }

  return (
    <div className={style["div-principal"]}>
      <div className={style["div-title"]}>
        <FontAwesomeIcon icon={faBookmark} className={style["icon"]} />
        <h1 className={style["title"]}>My Lists</h1>
      </div>
      <div className={style["div-button-create"]}>
        <button
          onClick={toggleModal}
          className={style["button-create-list-modal-modal"]}
        >
          <FontAwesomeIcon icon={faPlus} />
          Create new List
        </button>
        {modal && (
          <div className={style["modal"]}>
            <div onClick={toggleModal} className={style["overlay"]}></div>
            <div className={style["modal-content"]}>
              <h2 className={style["title-modal"]}>Create Your List Here!</h2>
              <div className={style["form-nicolas"]}>
                <input
                  id="input_name_list"
                  className={style["form-input"]}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="name"
                  value={list.name}
                  placeholder="Type the name of the list"
                ></input>
                <div className={style["div-buttons"]}>
                  <button
                    onClick={submitHandler}
                    className={style["form-button-submit"]}
                    type="button"
                  >
                    Create List
                  </button>
                  <button
                    onClick={toggleModal}
                    className={style["button-create-list-modal"]}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={style["div-lists-principal"]}>
        {allListsFromUser.length ? (
          allListsFromUser.map((list: any, key) => {
            return <ListComponent showOptions={true} props={list} key={key} />;
          })
        ) : (
          <div className={style["content-notFound"]}>
            <img
              className={style["img_notFound"]}
              src={imageNotFound}
              alt="img not found"
            />
            <p className={style["text_notFound_1"]}>There are no list here.</p>
            <p className={style["text_notFound_2"]}>Create one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
