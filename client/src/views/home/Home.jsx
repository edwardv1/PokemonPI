import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getAllPokemons, orderByName, orderByAttack, getTypes, filterByType, filterByOrigin, refreshPokes } from "../../redux/actions.js";
import NavBar from "../../components/navbar/NavBar.jsx";
import Cards from "../../components/cards/Cards.jsx";
import styles from "./Home.module.css";

export default function Home() {

  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const pokemonsFiltered = useSelector((state) => state.pokemonsFiltered);
  const filters = useSelector((state) => state.filters);
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);


  const alphabeticalOrder = (event) => {
    if(event.target.value !== "order") dispatch(orderByName(event.target.value));
  }

  const attackOrder = (event) => {
    if(event.target.value !== "order") dispatch(orderByAttack(event.target.value));
  }

  const filterType = (event) => {
    if(event.target.value !== "filter") dispatch(filterByType(event.target.value));
  }

  const filterOrigin = (event) => {
    if(event.target.value !== "filter") dispatch(filterByOrigin(event.target.value));
  }

  const handleClick = () => {
    dispatch(refreshPokes());
  }


  
  useEffect(()=> {
    dispatch(getAllPokemons());
  }, [dispatch]);
  
    return (
      <div className={`${styles.container} ${filters && pokemonsFiltered.length === 0 ? styles.rayquaza : null}`}>
        
        <div className={styles.divNavbar}>
            <NavBar/>
        </div>

        <div className={styles.divCards}>
          <div className={styles.topSection}>
            <div className={styles.topSectionLeft}>
            <label>Alphabetical Order</label>
            <select onChange={alphabeticalOrder} name="alphabetical" id="">
                <option defaultChecked value="order">Order</option>
                <option value="Ascending">Ascending: Z - A</option>
                <option value="Descending">Descending: A - Z</option>
            </select>

              <select onChange={attackOrder}  name="attack" id="">
                  <option defaultChecked  value="order">Order</option>
                  <option value="Ascending">Ascending: Min - Max</option>
                  <option value="Descending">Descending: Max - Min</option>
              </select>
            <label>Order by Attack</label>

            </div>

            <div className={styles.topSectionRight}>
            <label>Filter by Type</label>
            <select onChange={filterType} name="filterType" id="">
                <option defaultChecked value="filter">Filter</option>     
                {
                types?.map((type) =>{
                  return (
                    <option key={type.id} value={type.name} >{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</option>
                  ) })
                }
            </select>

            <select onChange={filterOrigin} name="filterOrigin" id="">
                <option defaultChecked value="filter">Filter</option>      
                <option value="api">API</option>
                <option value="bdd">Data Base</option>
            </select>
            <label>Filter by Origin</label>

            <button onClick={handleClick} >Refresh Pokemons</button>
            </div>

          </div>
            { filters ? <Cards allPokemons={pokemonsFiltered}/> : <Cards allPokemons={allPokemons}/>}
        </div>
      </div>
    );
}
