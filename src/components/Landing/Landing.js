import Header from "./Header";
import style from "../../style/Landing/landing.module.css"
import SectionUno from "./SectionUno";

export default function Landing() {
  return (
    <div className={style["header"]}>
      <Header></Header>
      <SectionUno></SectionUno>
    </div>
  );
}
