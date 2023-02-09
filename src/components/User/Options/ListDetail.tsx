import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import style from "../../../style/User/ListDetail.module.css";
import { useHistory } from "react-router-dom";
import {
  getAllListsUser,
  editListName,
  clearAllLists,
  deleteList,
  getList,
  clearDetailList,
  deleteProductInList,
  addListProduct,
} from "../../../redux/actions/List";
import { getProducts } from "../../../redux/actions/Products";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import {
  faTrash,
  faArrowLeft,
  faGear,
  faPenToSquare,
  faDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../../SearchBar/SearchBar";
import { useLocation } from "react-router-dom";
import { Product } from "../../../types/types";
import Loading from "../../../utils/Loading";

export default function ListDetail() {
  const dispatch = useAppDispatch();

  const { id } = useParams<any>();
  const history = useHistory();

  //   let { search } = useLocation();
  //   let searchParams = new URLSearchParams(search);
  //   let name = searchParams.get("name") || "";

  const productRender = useAppSelector((state) => state["products"]);
  const listDetail = useAppSelector((state) => state.listDetail);
  const userInfo = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getList(id));
    dispatch(getProducts());
    return () => {
      dispatch(clearDetailList());
    };
  }, [dispatch, id]);

  const [listEdit, setListEdit] = useState({
    name: "",
    id: 0,
  });

  const [modalEdit, setModalEdit] = useState(false);

  const [menu, setMenu] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

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
    await dispatch(clearDetailList());
    await dispatch(getList(id));
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
    history.push("/profile/list");
  };

  const addProductToList = async (idProduct: number) => {
    const productToAdd = { product: idProduct, list: listDetail.id };
    setIsLoading(true);
    try {
      await dispatch(addListProduct(productToAdd));
      await dispatch(clearDetailList());
      await dispatch(getList(id)).then(() => setIsLoading(false));
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const deleteProductList = async (idProduct: number) => {
    const productToDel = { product: idProduct, list: listDetail.id };
    // setIsLoading(true);
    await dispatch(deleteProductInList(productToDel));
    await dispatch(clearDetailList());
    await dispatch(getList(id)); /*.then(() => setIsLoading(false));*/
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
    <div className={style["div-principal-detail"]}>
      <h1 className={style["titulo-list-detail"]}>{listDetail.name}</h1>
      <div className={style["div-link-back"]}>
        <div className={style["div-link-buttons"]}>
          <Link className={style["div-link-back-link"]} to="/profile/list">
            <button className={style["button-back"]}>
              <FontAwesomeIcon icon={faArrowLeft} />
              Go back
            </button>
          </Link>
          <div className={style["div-input-search"]}>
            <SearchBar styleWidth={true} />
          </div>
          <div className={style["div-options"]}>
            <button onClick={toggleMenu} className={style["button-back"]}>
              <FontAwesomeIcon icon={faGear} />
              Options
            </button>
            <div
              className={
                style["div_lists_span"] +
                " " +
                style[`${menu ? "isActive" : ""}`]
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
                    <h2 className={style["title-modal"]}>
                      Edit Your List Here!
                    </h2>
                    <div className={style["form-nicolas"]}>
                      <input
                        className={style["form-input"]}
                        onChange={(e) => changeEditNameHandler(e, id)}
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
                onClick={() => deleteHandler(id)}
                className={style["list-span-delete"]}
              >
                <FontAwesomeIcon icon={faTrash} />
                Delete List
              </div>
            </div>
          </div>
        </div>
        <div className={style["div-render-principal"]}>
          {productRender.length
            ? productRender.map((a: Product, i: number) => {
                return (
                  <div
                    onClick={() => addProductToList(a.id ? a.id : 0)}
                    className={style["div-render-anime"]}
                    key={i}
                  >
                    <div className={style["div-render-anime_div_img"]}>
                      <img
                        className={style["div-render-anime_img"]}
                        src={a?.image}
                        alt="img-anime"
                      />
                    </div>
                    <span className={style["div-render-anime_name"]}>
                      {a?.title}
                    </span>
                  </div>
                );
              })
            : null}
        </div>
        <div className={style["div-principal-anime"]}>
          {!isLoading ? (
            listDetail.products?.map((product, key) => {
              return (
                <div key={key} className={style["div-anime"]}>
                  <Link
                    className={style["anime-detail_link"]}
                    to={`/detail/${product.id}`}
                  >
                    <img
                      className={style["anime-detail_img"]}
                      src={product.image}
                      alt="img-alt"
                    />
                  </Link>
                  <div className={style["anime-detail_texts"]}>
                    <h4 className={style["anime-detail_name"]}>
                      {product.title}
                    </h4>
                    <div className={style["div-spans-anime"]}>
                      <span className={style["anime-detail_span"]}>
                        💵
                        {product.price}
                      </span>

                      <button
                        onClick={() => deleteProductList(product.id)}
                        className={style["button-delete-anime"]}
                      >
                        <FontAwesomeIcon
                          className={style["button-delete-anime-svg"]}
                          icon={faTrash}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={style["content-notFound"]}>
              <Loading />
            </div>
          )}
          {!listDetail.products?.length && (
            <div>
              <h1 className={style["no-list"]}>THERES NO PRODUCTS IN LIST</h1>
              <h2 className={style["no-list"]}>ADD SOME</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
