import { Slideshow, Slide, TextoSlide } from "./SlideShow";
import styled from "styled-components";
import img1 from "../../img/slide/1.jpg";
import img2 from "../../img/slide/2.jpg";
import img3 from "../../img/slide/3.jpg";
import img4 from "../../img/slide/4.jpg";
import { Link } from "react-router-dom";
import style from "../../style/Landing/Header.module.css"

export default function Header() {
  return (
    <main className={style["flow"]}>
      <Titulo className={style["pro"]}>Productos Destacados</Titulo>
      <Slideshow
        controles={true}
        autoplay={true}
        velocidad="3000"
        intervalo="5000"
      >
        <Slide>
          <Link to={"/home"}>
            <img src={img1} alt="" />
          </Link>

          <TextoSlide colorFondo="navy">
            <p className={style["descuento"]}>15% descuento en productos Apple</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <Link to={"/home"}>
            <img src={img2} alt="" />
          </Link>
          <TextoSlide>
            <p className={style["descuento"]}>15% descuento en productos Apple</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <Link to={"/home"}>
            <img src={img3} alt="" />
          </Link>
          <TextoSlide>
            <p className={style["descuento"]}>15% descuento en productos Apple</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <Link to={"/home"}>
            <img src={img4} alt="" />
          </Link>
          <TextoSlide>
            <p className={style["descuento"]}>15% descuento en productos Apple</p>
          </TextoSlide>
        </Slide>
      </Slideshow>
    </main>
  );
}

const Titulo = styled.p`
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
`;
