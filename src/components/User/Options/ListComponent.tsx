import React, { useState } from "react";
import {
  faEllipsisVertical,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../../style/User/MyList.module.css";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import {
  getAllListsUser,
  editListName,
  clearAllLists,
  deleteList,
} from "../../../redux/actions/List";
import { Link } from "react-router-dom";

export default function ListComponent({ props, showOptions }: any) {
  const dispatch = useAppDispatch();
  const [listEdit, setListEdit] = useState({
    name: "",
    id: 0,
  });

  const userInfo = useAppSelector((state) => state.user);

  const [menu, setMenu] = useState(false);

  const [modalEdit, setModalEdit] = useState(false);

  const changeEditNameHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    idList: number
  ) => {
    e.preventDefault();
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setListEdit({ ...listEdit, [inputName]: inputValue, id: idList });
  };

  const submitEditNameHandler = async () => {
    await dispatch(editListName(listEdit));
    await dispatch(clearAllLists());
    await dispatch(getAllListsUser(userInfo.id));
    setListEdit({
      name: "",
      id: 0,
    });
    setModalEdit(!modalEdit);
  };

  const deleteHandler = async (id: number) => {
    await dispatch(deleteList(id));
    await dispatch(clearAllLists());
    await dispatch(getAllListsUser(userInfo.id));
  };

  const toggleModalEdit = () => {
    setModalEdit(!modalEdit);
    setListEdit({
      name: "",
      id: 0,
    });
  };

  if (modalEdit) {
    document.body.classList.add(style["active-modal"]);
  } else {
    document.body.classList.remove(style["active-modal"]);
  }

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className={style["div-lists-secondary"]}>
      <div className={style["div-lists-secondary_div1"]}>
        <Link className={style["link-tag-name"]} to={`list/${props.id}`}>
          <h3>{props.name}</h3>
        </Link>
        <span className={style["div-lists-secondary_div1_span"]}>
          {props.animes} added elements
        </span>
      </div>
      {showOptions && props.name !== "Favorites" ? (
        <div className={style["div-lists-secondary_div2"]}>
          <FontAwesomeIcon
            onClick={toggleMenu}
            icon={faEllipsisVertical}
            className={style["icon-elipsis"]}
          />
          <div
            className={
              style["div_lists_span"] + " " + style[`${menu ? "isActive" : ""}`]
            }
          >
            <div onClick={toggleModalEdit} className={style["list-span"]}>
              <FontAwesomeIcon icon={faPenToSquare} />
              Edit name
            </div>
            {modalEdit && (
              <div className={style["modal"]}>
                <div
                  onClick={toggleModalEdit}
                  className={style["overlay"]}
                ></div>
                <div className={style["modal-content"]}>
                  <h2 className={style["title-modal"]}>Edit Your List Here!</h2>
                  <div className={style["form-nicolas"]}>
                    <input
                      className={style["form-input"]}
                      onChange={(e) => changeEditNameHandler(e, props.id)}
                      type="text"
                      name="name"
                      value={listEdit.name}
                      placeholder="Type the new name of the list"
                    ></input>
                    <div className={style["div-buttons"]}>
                      <button
                        onClick={submitEditNameHandler}
                        className={style["form-button-submit"]}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={toggleModalEdit}
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
            <div
              onClick={() => deleteHandler(props.id)}
              className={style["list-span-delete"]}
            >
              <FontAwesomeIcon icon={faTrash} />
              Delete List
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
