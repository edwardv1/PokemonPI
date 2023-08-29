import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { useLocalStorage } from 'react-use-localstorage';
import Card from "../card/Card";
import { errorModal, handlerModal, hanlderErrorModal } from "../../redux/actions";
import rugidoRaiquaza from "../../images/rayquazaRugido.mp3";
import gifRay from "../../images/gifRayquaza.gif";
import styles from "./Cards.module.css";
import linkedIn from "../../images/LinkedIn_logo_initials.png";
import github from "../../images/github.png";
import developer from "../../images/edw.jpeg";
import ButtonSearch from "../searchBar/ButtonSearch";

export default function Cards({ allPokemons }) {
  
  const reproducirSonido = (volumen) => {
    const audio = new Audio(rugidoRaiquaza);
    audio.volume = volumen;
    audio.play();
  };
  
  
  //Dependencias globales
  const pokemonsFiltered = useSelector((state) => state.pokemonsFiltered);
  const filters = useSelector((state) => state.filters);
  const orders = useSelector((state) => state.orders);
  //const useDetail = useSelector((state) => state.useDetail);
  const modal = useSelector((state) => state.modal);
  let error = useSelector((state) => state.errors);
  let modalForError = useSelector((state) => state.modalForError);
  const dispatch = useDispatch();

  //Paginado
  const ITEMS_PER_PAGE_MOBILE = 5;
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  const [items, setItems] = useState([...allPokemons].splice(0,itemsPerPage));
  const [itemsFiltered, setItemsFiltered] = useState([...pokemonsFiltered].splice(0, itemsPerPage));
  const [numberPageAll, setNumberPageAll]  = useState(0);
  const [numberPageFiltered, setNumberPageFiltered]  = useState(0);
  const [goToPage, setGoToPage] = useState("");

    //----------------------------------------------------------------------------------------------------

  // Update itemsPerPage based on window width
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches;
      const newItemsPerPage = isDesktop ? ITEMS_PER_PAGE : ITEMS_PER_PAGE_MOBILE;
      setItemsPerPage(newItemsPerPage);
    };

    // Initial setup
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

   //----------------------------------------------------------------------------------------------------

  const nextPage = () => {
    if (filters) {  
      const next_page = currentPage + 1;
      const firstIndex = next_page * itemsPerPage;
      if (firstIndex >= pokemonsFiltered.length) return;
      setItemsFiltered([...pokemonsFiltered].splice(firstIndex, itemsPerPage)); 
      setCurrentPage(next_page);

      return;
    }
    const next_page = currentPage + 1;
    const firstIndex = next_page * itemsPerPage;
    if (firstIndex >= allPokemons.length) return;
    setItems([...allPokemons].splice(firstIndex, itemsPerPage)) 
    setCurrentPage(next_page);
  }

  const prevPage = () => {
    if (filters) {
      const prev_page = currentPage - 1;
      const firstIndex = prev_page * itemsPerPage;
      if (prev_page < 0) return;
      setItemsFiltered([...pokemonsFiltered].splice(firstIndex, itemsPerPage));
      setCurrentPage(prev_page);
      return;
    }
    const prev_page = currentPage - 1;
    const firstIndex = prev_page * itemsPerPage;
    if (prev_page < 0) return;
    setItems([...allPokemons].splice(firstIndex, itemsPerPage));
    setCurrentPage(prev_page);
  }
  
  const handleGoToPageChange = (event) => {
    setGoToPage(event.target.value);
  };

  const goToPageNumber = () => {
    let page = parseInt(goToPage);
    if (isNaN(page) || page < 1) {
      page = 1;
    } else if (filters) {
      const filteredPageCount = Math.ceil(pokemonsFiltered.length / itemsPerPage);
      if (page > filteredPageCount) {
        page = filteredPageCount;
      }
    } else {
      const allPageCount = Math.ceil(allPokemons.length / itemsPerPage);
      if (page > allPageCount) {
        page = allPageCount;
      }
    }
    setCurrentPage(page - 1);
    setGoToPage("");
  };



  //Evita tener una página adicional cuando el número total de elementos no sea un múltiplo de la cantidad de elementos por página
  //Cuando se aplican ordenes, la pagina va al inicio evitando bugs
  useEffect(() => {
    if (filters) {
      setCurrentPage(0);
      const filteredPageCount = Math.ceil(pokemonsFiltered.length / itemsPerPage);
      setNumberPageFiltered(filteredPageCount > 0 ? filteredPageCount - 1 : 0);
      if(orders) setCurrentPage(0);
    } else {
      setCurrentPage(0);
      const allPageCount = Math.ceil(allPokemons.length / itemsPerPage);
      setNumberPageAll(allPageCount > 0 ? allPageCount - 1 : 0);
      if(orders) setCurrentPage(0);
    }
  }, [allPokemons, pokemonsFiltered, filters, orders, itemsPerPage]);
  
  // Permite hacer el paginado una vez se monte/actualice allPokemons y pokemonsFiltered
  useEffect(() => {
    const firstIndex = currentPage * itemsPerPage;
    if (filters) {
      setItemsFiltered([...pokemonsFiltered].splice(firstIndex, itemsPerPage));
    } else {
      setItems([...allPokemons].splice(firstIndex, itemsPerPage));
    }
  }, [allPokemons, pokemonsFiltered, currentPage, filters, itemsPerPage]);

  //Controla que se rendericen las cards al cambiar de pagina desde el input
  useEffect(() => {
    if (filters) {
      if(pokemonsFiltered.length === 0){
        setNumberPageFiltered(Math.ceil(pokemonsFiltered.length / itemsPerPage));
      }else {
        setNumberPageFiltered(Math.ceil(pokemonsFiltered.length / itemsPerPage)-1);
      }
    } else {
      if(allPokemons.length === 0) {
        setNumberPageAll(Math.ceil(allPokemons.length / itemsPerPage));
      }else {
        setNumberPageAll(Math.ceil(allPokemons.length / itemsPerPage)-1);
      } 
    }
  }, [allPokemons, pokemonsFiltered, filters, itemsPerPage]);
  

  //Evita que el número de página actual no sea mayor que la cantidad de páginas disponibles
  useEffect(() => {
    if (filters) {
      if (currentPage > numberPageFiltered) setCurrentPage(0);
    }
  }, [currentPage, numberPageFiltered, filters]);


  //Codigo que controla las ventanas Modal

  //Cierra la ventana Modal cuando se muestra el About
  const onClickClose = () => {
    const close = "isClosed";
    dispatch(handlerModal(close))
  }

  //Abre la ventana Modal si hay un error en el Search Pokemon
  if(Object.keys(error).length > 0){
    const open = "isOpened";
    dispatch(hanlderErrorModal(open));
  }
  
  //Cierra la ventana Modal cuando hay un error
  const onClickCloseError = () => {
    const close = "isClosed";
    dispatch(errorModal(""));
    dispatch(hanlderErrorModal(close));
  }

  //Codigo para controlar el tamaño de pantalla
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className={styles.bottomSection}>
        <section className={styles.buttonsPages}>
          <button className={styles.buttonPage} onClick={prevPage}>{"<<"} Prev</button>
          {
            filters && pokemonsFiltered.length === 0 ?
            <h4>Page: {currentPage} / {filters ? numberPageFiltered : numberPageAll}</h4>
            :
            <h4>Page: {currentPage +1} / {filters ? numberPageFiltered +1 : numberPageAll +1}</h4>
          }
          <button className={styles.buttonPage} onClick={nextPage}>Next {">>"}</button>
        </section>
        { windowWidth <= 520 ?
        <div className={styles.goPage}>
          <ButtonSearch/>
          <input type="text" placeHolder="Go to a Page..." value={goToPage} onChange={handleGoToPageChange} />
          <button className={styles.buttonGo} onClick={goToPageNumber}>Go</button>
        </div>
        :
        <section className={styles.goPage}>
          <input type="text" placeHolder="Go to a Page..." value={goToPage} onChange={handleGoToPageChange} />
          <button className={styles.buttonGo} onClick={goToPageNumber}>Go</button>
        </section>
        }
      </div>

      <div className={styles.cardsList}>
        {/* Renderiza un pokemon cuando se cumple ciertas condiciones */}
        { filters && pokemonsFiltered.length === 0 ? (
        <div className={styles.rayquaza}>
          <p>It seems that there are no pokemons... But, what is that?</p>
          <img style={{ width: windowWidth <= 520 ? '300px' : '700px' }} src={gifRay} alt="Rayquaza" />  
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

      {/* IMPLEMENTACION DE UN MODAL PARA CONTROLAR EL ERROR DEL SEARCH POKEMON */}
      {
        modalForError ? 
        <div className= {styles.containerModalOpened}>
            <div className={styles.modalOpenedError}>
              <button onClick={onClickCloseError} className={styles.delete} >X</button>
              {
                windowWidth <= 520 ?
                <div>
                  <h2>ERROR!</h2>
                  <hr />
                  <h3>{error}</h3>
                </div>
                :
                <div>
                  <h1>ERROR!</h1>
                  <hr />
                  <h2>{error}</h2>
                </div>
              }
          </div>
        </div>
        :
        <div className= {styles.containerModalClosed}>
            <div className={styles.modalClosed}>
              <button onClick={onClickCloseError} className={styles.delete} >X</button>
              <div>
                <h1>ERROR!</h1>
                <hr />
                <h2>Error</h2>
              </div>
          </div>
        </div>   
      }

      {/* IMPLEMENTACION DE UN MODAL PARA MOSTRAR EL ABOUT ME */}
      {
        modal  ?
        <div className= {styles.containerModalOpened}>
          <div className={styles.modalOpened}>
            <button onClick={onClickClose} className={styles.delete} >X</button>
            <div className={styles.modalLeft}>
              
              <h3 className={styles.dev}>Developer: Edward Vera</h3>
              <img style={{ width: '300px'}} src={developer} className={styles.image} alt="Owner and developer" />

              <div className={styles.contactContainer}>
                <h1>Find me on Linkedin or Github</h1> 
                <a
                target="blank" 
                href="https://www.linkedin.com/in/edward-vera-20a577188"
                >     
                  <img style={{ width: '30px', height: 'auto' }} src={linkedIn} alt="linkedin logo" />  
                </a> 
                <a
                target="blanko" 
                href="https://github.com/edwardv1"
                >     
                  <img style={{ width: '65px', height: 'auto' }} src={github} alt="Github logo" />  
                </a> 
              </div>
            </div>

            <div className={styles.modalRight}>
              <h3>About the Project:</h3>
              <p className={styles.text}>
                This project is based on a Single Page Application (SPA) built with the following technologies: 
              </p>
              <h3>Frontend:</h3>
              <ul>
                <li>React</li> 
                <li>Redux</li> 
                <li>CSS</li> 
                <li>HTML</li> 
              </ul>
              <h3>Backend:</h3>
              <ul>
                <li>Express</li> 
                <li>Sequelize</li> 
                <li>PostgrSQL</li> 
              </ul>
            </div> 
        </div>
      </div>
      :
      <div className= {styles.containerModalClosed}>
          <div className={styles.modalClosed}>
            <button onClick={onClickClose} className={styles.delete} >X</button>
        </div>
      </div>
      }

  </div>
  );
}