import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../card/Card";
import rayquaza from "../../images/rayquaza.png";
import styles from "./Cards.module.css";

export default function Cards({ allPokemons }) {
  //Paginado
 const ITEMS_PER_PAGE = 10; //para setear la cantidad de items que yo quiero que se vean por cada pagina del paginado
  //const allPokemons = useSelector((state) => state.allPokemons);
  const pokemonsFiltered = useSelector((state) => state.pokemonsFiltered);
  const filters = useSelector((state) => state.filters);
  const orders = useSelector((state) => state.orders);

  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([...allPokemons].splice(0,ITEMS_PER_PAGE)); //1 a 10
  const [itemsFiltered, setItemsFiltered] = useState([...pokemonsFiltered].splice(0, ITEMS_PER_PAGE));
  const [numberPageAll, setNumberPageAll]  = useState(0);
  const [numberPageFiltered, setNumberPageFiltered]  = useState(0);
  

  const nextPage = () => {
    if (filters) {  //para controlar cuando hacemos filtros (pokemonsFiltered)
      const next_page = currentPage + 1;
      const firstIndex = next_page * ITEMS_PER_PAGE; // 1 * 10 = 10
      if (firstIndex >= pokemonsFiltered.length) return; //verifica que llego al final del array de pokemones, y evita que siga pasando la pagina
      setItemsFiltered([...pokemonsFiltered].splice(firstIndex, ITEMS_PER_PAGE));  //11 a 20
      setCurrentPage(next_page); //avanza a la siguiente pagina, de 0 a pagina 1
      return;
    } // else... para controlar cuando no hay filtros (allPokemons)
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

  // Permite hacer el paginado una vez se ejecute/actualice allPokemons
  useEffect(()=>{ 
    setItems([...allPokemons].splice(0, ITEMS_PER_PAGE))
  }, [allPokemons])

  // Permite hacer el paginado una vez se ejecute/actualice pokemonsFiltered
  useEffect(()=>{ 
    setItemsFiltered([...pokemonsFiltered].splice(0, ITEMS_PER_PAGE))
  }, [pokemonsFiltered])

  //Evita tener una página adicional cuando el número total de elementos no sea un múltiplo de la cantidad de elementos por página
  //Cuando se aplican ordenes, la pagina va al inicio evitando bugs
  useEffect(() => {
    if (filters) {
      const filteredPageCount = Math.ceil(pokemonsFiltered.length / ITEMS_PER_PAGE);
      setNumberPageFiltered(filteredPageCount > 0 ? filteredPageCount - 1 : 0);
      if(orders) setCurrentPage(0);
    } else {
      setNumberPageAll(Math.floor(allPokemons.length / ITEMS_PER_PAGE));
      if(orders) setCurrentPage(0);
    }
  }, [allPokemons, pokemonsFiltered, filters, orders]);

  //Evita que el número de página actual no sea mayor que la cantidad de páginas disponibles
  useEffect(() => {
    if (filters) {
      if (currentPage > numberPageFiltered) setCurrentPage(0);
    }
  }, [currentPage, numberPageFiltered, filters]);

  return (
    <div>
      <div className={styles.bottomSection}>
        <button onClick={prevPage}>{"<<"} Prev</button>

        {
          filters && pokemonsFiltered.length === 0 ?
          <h4>Current page: {currentPage} / {filters ? numberPageFiltered : numberPageAll}</h4>
          :
          <h4>Current page: {currentPage +1} / {filters ? numberPageFiltered +1 : numberPageAll +1}</h4>
        }

        <button onClick={nextPage}>Next {">>"}</button>
      </div>

      <div className={styles.cardsList}>
        {/* Renderiza un pokemon cuando se cumple ciertas condiciones */}
        { filters && pokemonsFiltered.length === 0 ? (
        <div>
          <img style={{ width: '420px' }} src={rayquaza} alt="Rayquaza" />  
          <p>Rayquaza has appeared!!!</p>
        </div>
        ) : null}
        
        { filters ? 
        itemsFiltered?.map((pokemon, index) => ( <Card pokemon= {pokemon} key={index}/>))
        :
        items?.map((pokemon, index) => (<Card pokemon= {pokemon} key={index}/>))
        }
      </div> 
    </div>
  );
}
