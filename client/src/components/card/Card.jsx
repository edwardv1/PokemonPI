import React from "react";
import { NavLink } from "react-router-dom";

export default function Card({pokemon}) {
  
  const {id, image, hp, attack, defense, types} = pokemon;
  let { name } = pokemon;
  
  // Obtener el primer tipo del array de tipos
  const primaryType = types[0];
  // Generar la clase CSS para el color de fondo según el tipo primario
  let cardClassName = `card_container ${[primaryType]}`;

  return (
    <div className={cardClassName}>
      <NavLink to={`/detail/${id}`} className="card_text">
        <div className="card_topSection">
          <div className="card_name">
            <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
          </div>
          <div className="card_hp">
            <h2>{hp} HP</h2>
          </div>
        </div>
        <div className="card_middleSection">
          <img style={{ width: '200px', height: "110px"}} src={image} alt={name} />
        </div>
        <div className="card_bottomSection">
          <div>
            <h3>Attack: {attack} - Defense: {defense} </h3>
          </div>
          <hr />
          <div>
            <h3>Type: {types[0].charAt(0).toUpperCase() + types[0].slice(1)}  {types[1] ? types[1].charAt(0).toUpperCase() + types[1].slice(1): null}</h3>
          </div>
        </div>
      </NavLink>  
    </div>
  );
}
