import style from "../../style/Sorts/Sorts.module.css";
import { useAppDispatch } from "../../redux/store/hooks";
import {
  filterByPrice,
  orderByName,
  orderByPrice,
} from "../../redux/actions/Products";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import {
  faArrowDownShortWide,
  faArrowDownZA,
  faArrowUpAZ,
  faArrowUpWideShort,
  faBars,
  faChevronLeft,
  faChevronRight,
  faCoins,
  faDollarSign,
  faFilterCircleDollar,
  faMoneyBillTrendUp,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  function handleFilterPrice(e: SelectChangeEvent<any>) {
    e.preventDefault();
    dispatch(filterByPrice(e.target.value));
    setCurrentPage(1);
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
            <FontAwesomeIcon icon={faSackDollar} />
            <FontAwesomeIcon icon={faArrowUpWideShort} />
          </MenuItem>
          <MenuItem value={"desc"}>
            <FontAwesomeIcon icon={faCoins} />
            <FontAwesomeIcon icon={faArrowDownShortWide} />
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
            <FontAwesomeIcon icon={faChevronLeft} />
            <FontAwesomeIcon icon={faDollarSign} />
            100
          </MenuItem>
          <MenuItem value={"moreThan100"}>
            <FontAwesomeIcon icon={faChevronRight} />
            <FontAwesomeIcon icon={faDollarSign} /> 100
          </MenuItem>
          <MenuItem value={"lessThan500"}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <FontAwesomeIcon icon={faDollarSign} /> 500
          </MenuItem>
          <MenuItem value={"moreThan500"}>
            <FontAwesomeIcon icon={faChevronRight} />
            <FontAwesomeIcon icon={faDollarSign} /> 500
          </MenuItem>
          <MenuItem value={"lessThan900"}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <FontAwesomeIcon icon={faDollarSign} /> 900
          </MenuItem>
          <MenuItem value={"moreThan900"}>
            <FontAwesomeIcon icon={faChevronRight} />
            <FontAwesomeIcon icon={faDollarSign} /> 900
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
