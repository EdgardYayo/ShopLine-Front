import style from "../../style/Paged/Paged.module.css";

interface pagedElements {
  paged: Function;
  productsPerPage: number;
  allProducts: any;
}

export default function Paged({
  allProducts,
  productsPerPage,
  paged,
}: pagedElements): JSX.Element {
  let numbers = [];
  for (let i = 1; i <= Math.ceil(allProducts / productsPerPage); i++) {
    numbers.push(i);
  }

  return (
    <div>
      {numbers.length &&
        numbers.map((n) => {
          return (
            <button
              className={style["paged-button"]}
              key={n}
              onClick={() => paged(n)}
            >
              {n}
            </button>
          );
        })}
    </div>
  );
}
