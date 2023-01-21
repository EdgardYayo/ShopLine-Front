import { useEffect, useState } from "react";
import style from "../../style/SubNav/SubNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { getCategories } from "../../redux/actions/Products";

export default function SubNav(): JSX.Element {
  const categories = useAppSelector((state) => state.categories);
  console.log(categories);
  const [menu, setMenu] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const toggleMenu = (): void => {
    setMenu(!menu);
  };

  return (
    <div className={style["explore"]}>
      <button onClick={toggleMenu} className={style["button-dropdown"]}>
        <FontAwesomeIcon icon={faBars} className={style["down"]} />
        <h4 className={style["h4-dropdown"]}>All categories</h4>
      </button>
      <nav
        className={
          style["nav-dropdown"] + " " + style[`${menu ? "isActive" : ""}`]
        }
      >
        {categories &&
          categories.map((elem) => {
            return (
              <ul className={style["ul-dropdown"]}>
                <Link
                  onClick={toggleMenu}
                  className={style["a-dropdown"]}
                  to="/home"
                >
                  <li className={style["li-dropdown"]}>
                    <span>{elem}</span>
                  </li>
                </Link>
              </ul>
            );
          })}
      </nav>
    </div>
  );
}
