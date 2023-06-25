import React from "react";
import styles from "./Cards.module.css";
import Card from "../card/Card";




export default function Cards({ allPokemons }) {
  //aqui se hace el paginado

  const pokemonsList = allPokemons;
  return (
    <div className={styles.cardsList}>
      {pokemonsList?.map((pokemon) => ( 
      <Card pokemon= {pokemon}/>
     ))}
    </div>
  );
}
