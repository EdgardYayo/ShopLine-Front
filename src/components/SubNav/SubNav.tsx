import { ChangeEvent, useEffect, useState } from "react";
import style from "../../style/SubNav/SubNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faBars, faCopyright, faRegistered, faStore, faTrademark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { getCategories, filterByCategory } from "../../redux/actions/Products";

export default function SubNav({ setOrder, setCurrentPage }: any): JSX.Element {
  const categories = useAppSelector((state) => state.categories);
  const [menu, setMenu] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const toggleMenu = (): void => {
    setMenu(!menu);
  };

  function handleFilterByCategory(e: ChangeEvent<any>) {
    e.preventDefault();
    dispatch(filterByCategory(e.target.value));
    setCurrentPage(1);
    setOrder("");
  }

  return (
    <div className={style["explore"]}>
      <div>
        <Link to={"/home"} className={style["a-dropdown"]}>
          <button onClick={toggleMenu} className={style["button-dropdown"]}>
            <FontAwesomeIcon icon={faBars} className={style["down"]} />
            <h4 className={style["h4-dropdown"]}>All categories</h4>
          </button>
        </Link>
        <nav
          className={
            style["nav-dropdown"] + " " + style[`${menu ? "isActive" : ""}`]
          }
        >
          <select className={style["select-down"]} onChange={(e) => handleFilterByCategory(e)}>
            <option value="all">All</option>

            {categories &&
              categories.map((elem, index) => (
                <option key={index} value={elem}>
                  {elem}
                </option>
              ))}
          </select>
        </nav>
      </div>

      <div className={style["sub-filter"]}>
        <ul>
          <Link to={"/"}>
          <li><button className={style["store"]} >
          {/* <FontAwesomeIcon className={style["store"]} icon={faStore}/> */}
          🛍️
            </button></li>
          </Link>
          <Link to={"/home"}>
          <li><span className={style["shopline"]}><strong className={style["shop-word"]}>Shop</strong><strong className={style["line-word"]}>Line</strong><FontAwesomeIcon className={style["icon-bag"]} icon={faBagShopping}/></span></li>
          </Link>
          <li><span className={style["brand"]}>
            <FontAwesomeIcon icon={faTrademark} style={{marginRight:"5px"}}/> 
            <FontAwesomeIcon icon={faCopyright}/> 
          </span></li>
        </ul>
      </div>
    </div>
  );
}
