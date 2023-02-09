import { Link } from "react-router-dom";
import style from "../../style/Landing/SectionUno.module.css";
import CardInformative from "./CardInformativa";
import newProducts from "../../utils/NewProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function SectionUno() {
  return (
    <>
      <div>
        <h2 className={style["section1_container"]}>
          New Arrival
          <FontAwesomeIcon  className={style["icon-basket"]} icon={faBasketShopping}/>
        </h2>
      </div>
      <section className={style["section_container"]}>
        <div className={style["section_newAnimes"]}>
          {newProducts.length &&
            newProducts.map((elem) => {
              return (
                <CardInformative
                  title={elem.title}
                  image={elem.image}
                  id={elem.id}
                  price={elem.price}
                />
              );
            })}
        </div>

        <div className={style["section_link"]}>
          <Link to={"/home"}>
            <span>
              <FontAwesomeIcon icon={faChevronDown} className={style["down"]} />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
