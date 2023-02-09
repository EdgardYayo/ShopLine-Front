import { useEffect, useMemo } from "react";
import { clearDetail, getDetail } from "../../redux/actions/Products/index";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import style from "../../style/ProductDetail/ProductDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faTag,
  faGifts,
  faCartPlus,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import Reviews from "../Reviews/Reviews";
import ShowReviews from "../ShowReviews/ShowReviews";
import { Link, useHistory} from "react-router-dom";
import { addToCart } from "../../redux/actions/Cart";
import swa from "sweetalert";
// import ListComponent from "../User/Options/ListComponent";
// import {
//   getListFavorite,
//   getAllListsUser,
//   clearDetailList,
//   addListProduct,
//   deleteProductInList,
// } from "../../redux/actions/List";
// import imageNotFound from "../../img/notFound/no-product.png"


export default function ProductDetail(props: any): JSX.Element {
  const id = props.match.params.id;
  const dispatch = useAppDispatch();
  const detail = useAppSelector((state: any) => state.detail);


  const history = useHistory();
  // const detailList = useAppSelector((state) => state.listDetail);
  // const allListsFromUser = useAppSelector((state) => state["userLists"]);
  const userInfo = useAppSelector((state: any) => state.user);

  // const [modal, setModal] = useState(false);

  // const [ready, setReady] = useState(false);

  const token = window.localStorage.getItem("token");
  const isLogin = useMemo(() => {
    if (token?.length) return true;
    else return false;
  }, [token]);
  
  function handleClick(productId: number, stock:number) {
    if(!isLogin){
      return swa("You need to log in if you want to add this product to the cart", "", "warning")
    } else if(stock === 1){
      return swa("you can not add this product to the cart because is out of stock", "sorry")    
    }
    const id = userInfo.id;
    dispatch(addToCart(id, productId));
  }

  function handlePayment() {
    if (!isLogin) {
      swa("You need to log in if you want to buy this product", "", "warning");
    }
  }
  const productId = detail.id;

  useEffect(() => {
    // dispatch(getListFavorite(userInfo.id)).then(() => setReady(true));
    // dispatch(getAllListsUser(userInfo.id));
    dispatch(getDetail(id));
    window.scrollTo(0, 0);
    return () => {
      // dispatch(clearDetailList());
      // document.body.classList.remove(style["active-modal"]);
      dispatch(clearDetail());
    };
  }, [dispatch, id, userInfo.id]);

  // const toggleAddAnimeList = async (listId: number) => {
  //   const productToAdd = { product: id, list: listId };
  //   try {
  //     await dispatch(addListProduct(productToAdd));
  //     history.push(`/profile/list/${listId}`);
  //   } catch (error: any) {
  //     history.push(`/profile/list/${listId}`);
  //   }
  // };

  // const toggleModal = () => {
  //   setModal(!modal);
  // };

  // const toggleFavorite = async () => {
  //   try {
  //     if (detailList.id === null) return;
  //     const checkProductAdded = detailList.products?.find(
  //       (product) => product.id === Number(id)
  //     );
  //     if (!checkProductAdded) {
  //       const productToFavorite = { product: Number(id), list: detailList.id };
  //       console.log(productToFavorite, "favoritesss")
  //       await dispatch(addListProduct(productToFavorite));
  //       await dispatch(getListFavorite(userInfo.id));
  //       alert("product Added to Favorites!");
  //     } else {
  //       const productToDel = { product: Number(id), list: detailList.id };
  //       await dispatch(deleteProductInList(productToDel));
  //       await dispatch(getListFavorite(userInfo.id));
  //       alert("Product Deleted of Favorites!");
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };

  // if (modal) {
  //   document.body.classList.add(style["active-modal"]);
  // } else {
  //   document.body.classList.remove(style["active-modal"]);
  // }

  return (
    <div className={style["container"]}>
      <h1 className={style["title"]}>{detail?.title}</h1>
      <div className={style["items-container"]}>
        <img className={style["image"]} src={detail?.image} alt="product" />
        <div className={style["sm-container"]}>
          <label>Description:</label>
          <span className={style["items-span"]}>{detail?.description}</span>
          <p className={style["items-p"]}>
            <FontAwesomeIcon className={style["icon-star"]} icon={faStar} />{" "}
            {detail?.rating}
          </p>
          <p className={style["items-p"]}>
            <FontAwesomeIcon className={style["icon-gift"]} icon={faGifts} />{" "}
            {detail?.category}
          </p>
          <p className={style["items-p"]}>
            <FontAwesomeIcon className={style["icon-tag"]} icon={faTag} /> $
            {detail?.price}
          </p>
{/* 
          <div className={style["lists"]}>
            <div onClick={toggleFavorite} className={style["lists-span"]}>
              {ready &&
              detailList.products?.find(
                (product) => product.id === Number(id)
              ) ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faBookmark} />
              )}
              <span>Add to favorites</span>
            </div>
            <div onClick={toggleModal} className={style["lists-span"]}>
              <FontAwesomeIcon icon={faPlus} className={style["icon"]} />
              <span>Append to a new list</span>
            </div>
            <div>
              {modal && (
                <div className={style["modal"]}>
                  <div onClick={toggleModal} className={style["overlay"]}></div>
                  <div className={style["modal-content"]}>
                    <h2 className={style["title-modal"]}>
                      Add the Product into a List
                    </h2>
                    <Link to="/profile/list">
                      <button
                        onClick={toggleModal}
                        className={style["button-create-list-modal"]}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                        Create new List
                      </button>
                    </Link>
                    <div className={style["div_lisComponent_overflow"]}>
                      {allListsFromUser.length ? (
                        allListsFromUser.map((list: any, key) => {
                          return (
                            <div
                              className={style["lisComponent_style"]}
                              onClick={() => toggleAddAnimeList(list.id)}
                              key={key}
                            >
                              <ListComponent
                                showOptions={false}
                                props={list}
                                key={key}
                              />
                            </div>
                          );
                        })
                      ) : (
                        <div className={style["content-notFound"]}>
                          <img
                            className={style["img_notFound"]}
                            src={imageNotFound}
                            alt="img not found"
                          />
                          <p className={style["text_notFound_1"]}>
                            There are no list here.
                          </p>
                          <p className={style["text_notFound_2"]}>
                            Create one!
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={style["form-nicolas"]}>
                      <div className={style["div-buttons"]}>
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
          </div> */}

          <div className={style["sub-sm-container"]}>
            <button
              className={style["btn-cart"]}
              onClick={() => handleClick(productId, detail.stock)}
            >
              <FontAwesomeIcon
                className={style["icon-cart"]}
                icon={faCartPlus}
              />
              Add to Cart
            </button>
            <Link to={"/payment/" + detail.id}>
              <button
                onClick={() => handlePayment()}
                className={style["btn-buy"]}
              >
                <FontAwesomeIcon
                  className={style["icon-dollar"]}
                  icon={faMoneyCheckDollar}
                />
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      { !isLogin ? <div className={style["not-login"]}>You need to log in if you want to review and see the reviews ⚠️</div> : 
      <div className={style["reviews-container"]}>
        <Reviews></Reviews>
        <ShowReviews></ShowReviews>
      </div> }
    </div>
  );
}
