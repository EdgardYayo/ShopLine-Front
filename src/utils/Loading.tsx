import style from "./Loading.module.css";

export default function Loading(): JSX.Element {
  return (
    <div className={style["loader"]}>
      <div className={style["waves"]}></div>
    </div>
  );
}
