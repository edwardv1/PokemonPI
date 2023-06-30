import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../card/Card";
import styles from "./Cards.module.css";


export default function Cards({ allPokemons }) {
  //aqui se hace el paginado
 const ITEMS_PER_PAGE = 10; //para setear la cantidad de items que yo quiero que se vean por cada pagina del paginado
  //const allPokemons = useSelector((state) => state.allPokemons);
  const pokemonsFiltered = useSelector((state) => state.pokemonsFiltered);
  const filters = useSelector((state) => state.filters);

  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([...allPokemons].splice(0,ITEMS_PER_PAGE)); //1 a 10
  const [itemsFiltered, setItemsFiltered] = useState([...pokemonsFiltered].splice(0, ITEMS_PER_PAGE));



  const nextPage = () => {
    if (filters) {  //para controlar cuando hacemos filtros
      const next_page = currentPage + 1;
      const firstIndex = next_page * ITEMS_PER_PAGE; // 1 * 10 = 10
      if (firstIndex >= allPokemons.length) return; //verifica que llego al final del array de pokemones, y evita que siga pasando la pagina
      setItemsFiltered([...pokemonsFiltered].splice(firstIndex, ITEMS_PER_PAGE))  //11 a 20
      setCurrentPage(next_page) //avanza a la siguiente paguina de 0 a pagina 1
      return;
    } // else... para controlar cuando no hay filtros (solo allPokemons)
    const next_page = currentPage + 1;
    const firstIndex = next_page * ITEMS_PER_PAGE;
    if (firstIndex >= allPokemons.length) return;
    setItems([...allPokemons].splice(firstIndex, ITEMS_PER_PAGE)) //11 a 20
    setCurrentPage(next_page)
  }

  const prevPage = () => {
    if (filters) {
      const prev_page = currentPage - 1;
      const firstIndex = prev_page * ITEMS_PER_PAGE;
      //if(next_page > Math.ceil(pokemonsFiltered.length / ITEMS_PER_PAGE)) return;
      if (prev_page < 0) return; //evita que entremos a una pagina anterior que no tenga pokemones
      setItemsFiltered([...pokemonsFiltered].splice(firstIndex, ITEMS_PER_PAGE))
      setCurrentPage(prev_page)
      return;
    }
    const prev_page = currentPage - 1;
    const firstIndex = prev_page * ITEMS_PER_PAGE;
    if (prev_page < 0) return;
    setItems([...allPokemons].splice(firstIndex, ITEMS_PER_PAGE))
    setCurrentPage(prev_page)
  }

  // Me permite hacer el paginado una vez se ejecute/actualice allPokemons
  useEffect(()=>{ // <----- se ejecuta cuando el estado se actualiza 
    setItems([...allPokemons].splice(0, ITEMS_PER_PAGE))
  }, [allPokemons])


  // Me permite hacer el paginado una vez se ejecute/actualice pokemonsFiltered
  useEffect(()=>{ // <----- se ejecuta cuando el estado se actualiza
    setItemsFiltered([...pokemonsFiltered].splice(0, ITEMS_PER_PAGE))
  }, [pokemonsFiltered])

  
  return (
    <div>
    
      <div className={styles.bottomSection}>
        <button onClick={prevPage}>{"<<"} Prev</button>

        <h4>Current page: {currentPage + 1} / {filters ? 
        Math.ceil(pokemonsFiltered.length / ITEMS_PER_PAGE) 
        : Math.ceil(allPokemons.length / ITEMS_PER_PAGE)}</h4>

        <button onClick={nextPage}>Next {">>"}</button>
      </div>

      <div className={styles.cardsList}>
        { 
        filters ? 
        itemsFiltered?.map((pokemon, index) => ( <Card pokemon= {pokemon} key={index}/>))
        :
        items?.map((pokemon, index) => (<Card pokemon= {pokemon} key={index}/>))
        }
      </div>
   
    </div>


  );
}
