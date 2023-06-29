import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getAllPokemons, orderByName, orderByAttack, getTypes, filterByType, filterByOrigin } from "../../redux/actions.js";
import NavBar from "../../components/navbar/NavBar.jsx";
import Cards from "../../components/cards/Cards.jsx";
import rayquaza from "../../images/rayquaza.png"
import styles from "./Home.module.css";

export default function Home() {

  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons); //subscribo el componente al Estado global, asi en cada cambio que haya lo va a recibir esta variable/componente
  const pokemonsFiltered = useSelector((state) => state.pokemonsFiltered);
  const filter = useSelector((state) => state.filters);
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);


  const alphabeticalOrder = (event) => {
    if(event.target.value !== "order") dispatch(orderByName(event.target.value)); //event.target.value accede al value= Ascending o Descending
  }

  const attackOrder = (event) => {
    if(event.target.value !== "order") dispatch(orderByAttack(event.target.value)); //event.target.value accede al value= Ascending o Descending
  }

  const filterType = (event) => {
    if(event.target.value !== "filter") dispatch(filterByType(event.target.value));
  }

  const filterOrigin = (event) => {
    if(event.target.value !== "filter") dispatch(filterByOrigin(event.target.value));
  }
  console.log(pokemonsFiltered.length);
  
  useEffect(()=> {
    dispatch(getAllPokemons()); //despacho la action (la action se comunica con el back), la action llega al reducer, modifica el estado con el payload de la action, y lo devuelve a todos los componentes
    //PARA HACER UN UNMOUNT antes de que se desmonte el componente, debo hacer:
    /*
    return (()=> {
      clearDetail(); Para que cuando entre al detalle de un pokemon y me quiero regresar, no quiero que se guarde (limpiar el estado cuando te salgas de la pagina)
    })
    */
  }, [dispatch]);
  //Array de dependencias, me indica en que momento quiero que se ejecute la funcion... solo quiero que se ejecute cuando de haga el [ dispatch ]
  

    return (
      <div className={styles.container}>

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
                <option value="all">All</option>
                {
                types?.map((type) =>{
                  return (
                    <option key={type.id} value={type.name} >{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</option>
                  ) })
                }
            </select>

            <select onChange={filterOrigin} name="filterOrigin" id="">
                <option defaultChecked value="filter">Filter</option>
                <option value="all">All</option>
                <option value="api">API</option>
                <option value="bdd">Data Base</option>
            </select>
            <label>Filter by Origin</label>
            </div>

          </div>
            { pokemonsFiltered.lenght === 0 ? (<img src={rayquaza} alt="Rayquaza" />) : null}
          
            { filter ? <Cards allPokemons={pokemonsFiltered}/> : <Cards allPokemons={allPokemons}/>}
        </div>
      </div>
    );
}
