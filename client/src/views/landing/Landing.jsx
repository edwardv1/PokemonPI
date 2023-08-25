import React, { useEffect, useState } from "react";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";
import videoPokemon from "../../images/pokemon.mp4";
import logoPoke from "../../images/logopoke.png";

export default function Landing() {

  //Codigo para controlar el tamaño de pantalla
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
    className={`${styles.background} ${
      windowWidth <= 520 ? styles.backgroundSmall : null
    }`}
    >
      <video className={styles.background} loop autoPlay muted>
        <source src={videoPokemon} type="video/mp4"></source>
      </video>

      <div className={styles.box}>
        <img style={{height:"120px"}} src={logoPoke} alt="logoPokemon" />
        <div className={styles.container}>
          <div className={styles.header}>
            <Link to={`/home`} className={styles.text}>
              <p>Press Start</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}