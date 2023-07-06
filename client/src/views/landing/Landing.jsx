import React from "react";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import videoPokemon from "../../images/pokemon.mp4";
import logoPoke from "../../images/logopoke.png";

export default function Landing() {

  return (
    <div >
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