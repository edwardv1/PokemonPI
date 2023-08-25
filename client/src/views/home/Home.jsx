import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllPokemons,
  orderByName,
  orderByAttack,
  getTypes,
  filterByType,
  filterByOrigin,
  refreshPokes,
  handlerModal,
} from "../../redux/actions.js";
import NavBar from "../../components/navbar/NavBar.jsx";
import Cards from "../../components/cards/Cards.jsx";
import styles from "./Home.module.css";
import ButtonSearch from "../../components/searchBar/ButtonSearch.jsx";
import {BsFillArrowUpCircleFill} from 'react-icons/bs';
import pokebola from "../../images/pokebola8.png";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const pokemonsFiltered = useSelector((state) => state.pokemonsFiltered);
  const filters = useSelector((state) => state.filters);
  const types = useSelector((state) => state.types);

  const [screenSize, setScreenSize] = useState("");
  

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const alphabeticalOrder = (event) => {
    if (event.target.value !== "order")
      dispatch(orderByName(event.target.value));
  };

  const attackOrder = (event) => {
    if (event.target.value !== "order")
      dispatch(orderByAttack(event.target.value));
  };

  const filterType = (event) => {
    if (event.target.value !== "filter")
      dispatch(filterByType(event.target.value));
  };

  const filterOrigin = (event) => {
    if (event.target.value !== "filter")
      dispatch(filterByOrigin(event.target.value));
  };

  const handleClick = () => {
    dispatch(refreshPokes());
  };

  //----------------------------------------------------------------------------------------------------

  // Update itemsPerPage based on window width
  useEffect(() => {
    const handleResize = () => {
      let size = null;
      if (window.matchMedia("(max-width: 1550px)").matches) {
        size = "1550px"
      }
      // if (window.matchMedia("(max-width: 600px)").matches) {
      //   size = "600px";
      // }
      if (window.matchMedia("(max-width: 520px)").matches) {
        size = "520px";
      }
      setScreenSize(size);
    };

    // Initial setup
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //----------------------------------------------------------------------------------------------------

  // Función para manejar el clic en el botón
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Animación de desplazamiento suave
    });
  };

  //----------------------------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  //Abre modal AboutMe
  const handleClickOpen = () => {
    const open = "isOpened";
    dispatch(handlerModal(open))
  }
console.log(screenSize);
  return (
    <div
      className={`${styles.container} ${
        filters && pokemonsFiltered.length === 0 ? styles.rayquaza : null
      }`}
    >
      <div className={styles.divNavbar}>
        <NavBar />
      </div>


        <div className={styles.containerInfo}>
        <div className={styles.topSection}>

          {screenSize === "520px" ?
            <div className={styles.head}>
              <div className={styles.title}>
                <h2>Welcome to Pokemon World</h2>
                <img style={{ width: '25px', height: "30px", marginTop: "5px"}} src={pokebola} alt="pokebola" />
              </div>
              <hr />
                <h3>Sorts and Filters</h3>
              <div className={styles.filters}>
                <select onChange={alphabeticalOrder} name="alphabetical" id="">
                    <option defaultChecked value="order">
                      Alphabetical
                    </option>
                    <option value="Ascending">Asc: Z - A</option>
                    <option value="Descending">Desc: A - Z</option>
                  </select>
                  <select onChange={filterType} name="filterType" id="">
                    <option defaultChecked value="filter">
                      By Type
                    </option>
                    <option value="all">All</option>
                    {types?.map((type) => {
                      return (
                        <option key={type.id} value={type.name}>
                          {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                        </option>
                      );
                    })}
                  </select>
                  <select onChange={attackOrder} name="attack" id="">
                    <option defaultChecked value="order">
                      By Attack
                    </option>
                    <option value="Ascending">Asc: Min - Max</option>
                    <option value="Descending">Desc: Max - Min</option>
                  </select>
                  <select onChange={filterOrigin} name="filterOrigin" id="">
                    <option defaultChecked value="filter">
                      By Origin
                    </option>
                    <option value="all">All</option>
                    <option value="api">API</option>
                    <option value="bdd">Data Base</option>
                  </select>
              </div>
            </div>
          
          :
          screenSize === "1550px" ? (
              <div className={styles.topSectionLeft}>
                <ButtonSearch />
                <label>Sorts</label>
                <select onChange={alphabeticalOrder} name="alphabetical" id="">
                  <option defaultChecked value="order">
                    Alphabetical
                  </option>
                  <option value="Ascending">Ascending: Z - A</option>
                  <option value="Descending">Descending: A - Z</option>
                </select>
                <select onChange={attackOrder} name="attack" id="">
                  <option defaultChecked value="order">
                    By Attack
                  </option>
                  <option value="Ascending">Ascending: Min - Max</option>
                  <option value="Descending">Descending: Max - Min</option>
                </select>
              </div>
            ) : (
              <div className={styles.topSectionLeft}>
                <label>Alphabetical Sort</label>
                <select onChange={alphabeticalOrder} name="alphabetical" id="">
                  <option defaultChecked value="order">
                    Sort
                  </option>
                  <option value="Ascending">Ascending: Z - A</option>
                  <option value="Descending">Descending: A - Z</option>
                </select>
                <select onChange={attackOrder} name="attack" id="">
                  <option defaultChecked value="order">
                    Sort
                  </option>
                  <option value="Ascending">Ascending: Min - Max</option>
                  <option value="Descending">Descending: Max - Min</option>
                </select>
                <label>Sort by Attack</label>
              </div>
            )}
          

          {screenSize === "1550px" ? (
            <div className={styles.topSectionRight}>
              <label>Filters</label>
              <select onChange={filterType} name="filterType" id="">
                <option defaultChecked value="filter">
                  By Type
                </option>
                <option value="all">All</option>
                {types?.map((type) => {
                  return (
                    <option key={type.id} value={type.name}>
                      {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                    </option>
                  );
                })}
              </select>
              <select onChange={filterOrigin} name="filterOrigin" id="">
                <option defaultChecked value="filter">
                  By Origin
                </option>
                <option value="all">All</option>
                <option value="api">API</option>
                <option value="bdd">Data Base</option>
              </select>
              <Link to="/create">
                <button className={styles.buttonCreate}>Create Pokemon</button>
              </Link>
              <button onClick={handleClickOpen}>About Me</button>
              <Link to={`/`}>
                <button>Exit</button>
              </Link>
            </div>
          ) : (
            <div className={styles.topSectionRight}>
              <label>Filter by Type</label>
              <select onChange={filterType} name="filterType" id="">
                <option defaultChecked value="filter">
                  Filter
                </option>
                {types?.map((type) => {
                  return (
                    <option key={type.id} value={type.name}>
                      {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                    </option>
                  );
                })}
              </select>

              <select onChange={filterOrigin} name="filterOrigin" id="">
                <option defaultChecked value="filter">
                  Filter
                </option>
                <option value="api">API</option>
                <option value="bdd">Data Base</option>
              </select>
              <label>Filter by Origin</label>

              <button onClick={handleClick} className={styles.button}>
                Refresh Pokemons
              </button>
            </div>
          )}
        
        </div>


        <div className={styles.divCards}>
          {filters ? (
            <Cards allPokemons={pokemonsFiltered} />
          ) : (
            <Cards allPokemons={allPokemons} />
          )}
        </div>

        {/* Botón para volver al inicio */}
        {screenSize <= "520px"  && (
          
          <div className={styles.buttonArrow}>

            <BsFillArrowUpCircleFill
            size={30}
            className={`scroll-to-top-button ${screenSize <= "520px" ? 'show' : ''}`} 
            onClick={scrollToTop}/>
          </div>
          
        )}

      </div>
    </div>
  );
}
