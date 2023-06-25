import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getAllPokemons } from "../../redux/actions.js";
import NavBar from "../../components/navbar/NavBar.jsx";
import Cards from "../../components/cards/Cards.jsx";
import styles from "./Home.module.css";

export default function Home() {

  const dispatch = useDispatch();
  const allPokemons = useSelector((state)=>state.allPokemons); //subscribo el componente al Estado global, asi en cada cambio que haya lo va a recibir esta variable/componente

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
        <div className={styles.div1}>
            <NavBar/>
        </div>
        <div className={styles.div2}>
            <Cards allPokemons={allPokemons}/>
        </div>
      </div>
    );
}

// <Cards pokemons={pokemons} />