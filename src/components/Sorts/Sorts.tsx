import style from "../../style/Sorts/Sorts.module.css";
import { useAppDispatch } from "../../redux/store/hooks";
import {
  filterByPrice,
  orderByName,
  orderByPrice,
  orderByRating,
} from "../../redux/actions/Products";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import {
  faArrowDownZA,
  faArrowUpAZ,
  faBars,
  faDollarSign,
  faDownLong,
  faFilterCircleDollar,
  faMinus,
  faMoneyBillTrendUp,
  faMoneyBillWave,
  faPlus,
  faStar,
  faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResetButton from "./ResetButton";

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

  /*Filter by Price*/
  // function handleFilterPrice(e: SelectChangeEvent<any>) {
  //   e.preventDefault();
  //   dispatch(filterByPrice(e.target.value));
  //   setCurrentPage(1);
  // }
  
  /*Sort By Rating */
  function handleSortRating(e: SelectChangeEvent<any>) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
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
          <MenuItem value={"all"}>
            <FontAwesomeIcon icon={faMoneyBillTrendUp} />
          </MenuItem>
          <MenuItem value={"asc"}>
            <FontAwesomeIcon className={style["icon"]} icon={faMoneyBillWave} />
            <FontAwesomeIcon icon={faUpLong} />
          </MenuItem>
          <MenuItem value={"desc"}>
            <FontAwesomeIcon className={style["icon"]} icon={faMoneyBillWave} />
            <FontAwesomeIcon icon={faDownLong} />
          </MenuItem>
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
          <MenuItem value={"all"}>
            <FontAwesomeIcon icon={faBars} />
          </MenuItem>
          <MenuItem value={"asc"}>
            <FontAwesomeIcon icon={faArrowUpAZ} />
          </MenuItem>
          <MenuItem value={"desc"}>
            <FontAwesomeIcon icon={faArrowDownZA} />
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl className={style["inside-container"]}>
        <InputLabel id="demo-simple-select-label">Sort by Rating</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Sort by Rating"
          onChange={(e) => handleSortRating(e)}
          >
          <MenuItem value={"all"}>
            <FontAwesomeIcon icon={faStar} />
          </MenuItem>
          <MenuItem value={"asc"}>
            <FontAwesomeIcon className={style["icon"]} icon={faStar} />
            <FontAwesomeIcon icon={faUpLong} />
          </MenuItem>
          <MenuItem value={"desc"}>
            <FontAwesomeIcon className={style["icon"]} icon={faStar} />
            <FontAwesomeIcon icon={faDownLong} />
          </MenuItem>
        </Select>
      </FormControl>
      {/* <FormControl className={style["inside-container"]}>
        <InputLabel id="demo-simple-select-label"> $ </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label=" $ "
          onChange={(e) => handleFilterPrice(e)}
          >
          <MenuItem value={"all"}>
            <FontAwesomeIcon icon={faFilterCircleDollar} />
          </MenuItem>
          <MenuItem value={"lessThan100"}>
            <FontAwesomeIcon className={style["icon"]} icon={faMinus} />
            <FontAwesomeIcon icon={faDollarSign} />
            100
          </MenuItem>
          <MenuItem value={"moreThan100"}>
            <FontAwesomeIcon className={style["icon"]} icon={faPlus} />
            <FontAwesomeIcon icon={faDollarSign} /> 100
          </MenuItem>
          <MenuItem value={"lessThan500"}>
            <FontAwesomeIcon className={style["icon"]} icon={faMinus} />
            <FontAwesomeIcon icon={faDollarSign} /> 500
          </MenuItem>
          <MenuItem value={"moreThan500"}>
            <FontAwesomeIcon className={style["icon"]} icon={faPlus} />
            <FontAwesomeIcon icon={faDollarSign} /> 500
          </MenuItem>
          <MenuItem value={"lessThan900"}>
            <FontAwesomeIcon className={style["icon"]} icon={faMinus} />
            <FontAwesomeIcon icon={faDollarSign} /> 900
          </MenuItem>
          <MenuItem value={"moreThan900"}>
            <FontAwesomeIcon className={style["icon"]} icon={faPlus} />
            <FontAwesomeIcon icon={faDollarSign} /> 900
          </MenuItem>
        </Select>
      </FormControl> */}
      <ResetButton></ResetButton>
    </div>
  );
}
