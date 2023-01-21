import style from "../../style/SearchBar/SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { filterByName } from "../../redux/actions/Products";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useAppDispatch } from "../../redux/store/hooks";

export default function SearchBar(): JSX.Element {
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();

  /*Input de busqueda*/

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setName(e.target.value);
  }

  /*Boton*/

  function handleSubmit(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();
    dispatch(filterByName(name)); //&& paginated(1);
    setName("");
  }

  return (
    <div className={style.search}>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}
