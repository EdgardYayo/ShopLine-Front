import { ChangeEvent } from "react";
import style from "../../style/Sorts/Sorts.module.css";
import { useAppDispatch } from "../../redux/store/hooks";
import { orderByName, orderByPrice } from "../../redux/actions/Products";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

export default function Sorts({ setOrder, setCurrentPage }: any): JSX.Element {
  const dispatch = useAppDispatch();

  /*Sort by Price*/
  function handleSortPrice(e: SelectChangeEvent<any>) {
    e.preventDefault();
    dispatch(orderByPrice(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  /*Sort by Name*/
  function handleSortName(e: SelectChangeEvent<any>) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div className={style["container"]}>
      <FormControl className={style["inside-container"]}>
        <InputLabel id="demo-simple-select-label">Sort by $</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Sort by $"
          onChange={(e) => handleSortPrice(e)}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"asc"}>Expensive</MenuItem>
          <MenuItem value={"desc"}>Cheap</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={style["inside-container"]}>
        <InputLabel id="demo-simple-select-label">Sort by Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Sort by name"
          onChange={(e) => handleSortName(e)}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"asc"}>A-Z</MenuItem>
          <MenuItem value={"desc"}>Z-A</MenuItem>
        </Select>
      </FormControl>

      {/* <select onChange={(e) => handleSortPrice(e)}>
                <option value={"all"}>Sort By $</option>
                <option value={"asc"}>Expensive</option>
                <option value={"desc"}>Cheap</option>
            </select>
            <select onChange={(e) => handleSortName(e)}>
                <option value={"all"}>Sort By Ⓐ</option>
                <option value={"asc"}>A-Z</option>
                <option value={"desc"}>Z-A</option>
            </select> */}
    </div>
  );
}
