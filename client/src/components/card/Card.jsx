import React from "react";
import styles from "./Card.module.css";
import { NavLink } from "react-router-dom";

export default function Card({pokemon}) {
  //console.log(pokemon);
  const {id, image, hp, attack, defense, speed, types} = pokemon;
  let { name } = pokemon;
  //console.log(id);
  
  // Obtener el primer tipo del array de tipos
  //const primaryType = types[0];

  // Generar la clase CSS para el color de fondo según el tipo primario
  //let cardClassName = `card.${primaryType}`;

  return (
    <div className={styles.card}>
      <NavLink to={`/detail/${id}`} className={styles.text}>
        <div className={styles.topSection}>
          <div className={styles.name}>
            <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
          </div>
          <div className={styles.hp}>
            <h2>{hp} HP</h2>
          </div>
        </div>
        <div className={styles.middleSection}>
          <img style={{ width: '200px', height: "110px"}} src={image} alt={name} />
        </div>
        <div className={styles.bottomSection}>
          <div>
            <h5 className={styles.middleSectionText}>Attack: {attack} - Defense: {defense} - Speed: {speed}</h5>
          </div>
          <hr />
          <div>
            <h4>Type: {types[0].charAt(0).toUpperCase() + types[0].slice(1)}  {types[1] ? types[1].charAt(0).toUpperCase() + types[1].slice(1): null}</h4>
          </div>
      
        </div>
      </NavLink>
    </div>
  );
}
{/* <Link to={`/detail/${id}`}> 
</Link> */}
// `card ${cardClassName ? {cardClassName} : ""}`