import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../card/Card";
import rugidoRaiquaza from "../../images/rayquazaRugido.mp3";
//import rayquaza from "../../images/rayquaza.png";
import gifRay from "../../images/gifRayquaza.gif";
import styles from "./Cards.module.css";


export default function Cards({ allPokemons }) {
  
  const reproducirSonido = (volumen) => {
    const audio = new Audio(rugidoRaiquaza);
    audio.volume = volumen;
    audio.play();
  };
  
  //Paginado
  const ITEMS_PER_PAGE = 10; 
  const pokemonsFiltered = useSelector((state) => state.pokemonsFiltered);
  const filters = useSelector((state) => state.filters);
  const orders = useSelector((state) => state.orders);

  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([...allPokemons].splice(0,ITEMS_PER_PAGE));
  const [itemsFiltered, setItemsFiltered] = useState([...pokemonsFiltered].splice(0, ITEMS_PER_PAGE));
  const [numberPageAll, setNumberPageAll]  = useState(0);
  const [numberPageFiltered, setNumberPageFiltered]  = useState(0);
  
  const nextPage = () => {
    if (filters) {  
      const next_page = currentPage + 1;
      const firstIndex = next_page * ITEMS_PER_PAGE;
      if (firstIndex >= pokemonsFiltered.length) return;
      setItemsFiltered([...pokemonsFiltered].splice(firstIndex, ITEMS_PER_PAGE)); 
      setCurrentPage(next_page); 
      return;
    }
    const next_page = currentPage + 1;
    const firstIndex = next_page * ITEMS_PER_PAGE;
    if (firstIndex >= allPokemons.length) return;
    setItems([...allPokemons].splice(firstIndex, ITEMS_PER_PAGE)) 
    setCurrentPage(next_page)
  }

  const prevPage = () => {
    if (filters) {
      const prev_page = currentPage - 1;
      const firstIndex = prev_page * ITEMS_PER_PAGE;
      if (prev_page < 0) return;
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
      setCurrentPage(0);
      const filteredPageCount = Math.ceil(pokemonsFiltered.length / ITEMS_PER_PAGE);
      setNumberPageFiltered(filteredPageCount > 0 ? filteredPageCount - 1 : 0);
      if(orders) setCurrentPage(0);
    } else {
      setCurrentPage(0);
      const allPageCount = Math.ceil(allPokemons.length / ITEMS_PER_PAGE);
      setNumberPageAll(allPageCount > 0 ? allPageCount - 1 : 0);
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
          <h4>Page: {currentPage} / {filters ? numberPageFiltered : numberPageAll}</h4>
          :
          <h4>Page: {currentPage +1} / {filters ? numberPageFiltered +1 : numberPageAll +1}</h4>
        }

        <button onClick={nextPage}>Next {">>"}</button>
      </div>

      <div className={styles.cardsList}>
        {/* Renderiza un pokemon cuando se cumple ciertas condiciones */}
        { filters && pokemonsFiltered.length === 0 ? (
        <div className={styles.rayquaza}>
          <p>It seems that there are no pokemons... But, what is that?</p>
          <img style={{ width: '700px' }} src={gifRay} alt="Rayquaza" />  
          <p>Rayquaza has appeared!!!</p>
          {reproducirSonido(0.03)}
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
