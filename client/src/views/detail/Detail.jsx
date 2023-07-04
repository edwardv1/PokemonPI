import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonById, clearDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
import styles from "./Detail.module.css";
import pokebola from "../../images/pokebola8.png";

export default function Detail() {
  
  const { id } = useParams(); //Recibo el valor de id pasado por parametro del path
  
  const dispatch = useDispatch();
  const pokemonById = useSelector((state) => state.pokemonDetail);

  //Limpia el estado antes de desmontarse el componente
  useEffect(() => {
    dispatch(getPokemonById(id));
    return ()=>{dispatch(clearDetail())}
  }, [dispatch, id]);

 

    return (
      <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.topSectionInfo}>
              <h3>INFO. POKEMON</h3>
          </div> 
          <div className={styles.topSectionBack}>
            <Link to={`/home`} className={styles.textLink} >
              <h3 >BACK</h3>
            </Link>
          </div> 
        </div>
        <div className={styles.middleSection}>
          <div className={styles.middleSectionImage}>
            <div className={styles.divisor}>
              <div className={styles.middleSectionImageTop}>
                <h4>{pokemonById[0]?.name.toUpperCase()} </h4>
              </div>
              <div>
                <img style={{ width: '25px'}} src={pokebola} alt="pokebola" />
              </div>
            </div>
            <div className={styles.middleSectionImageBottom}>
              <img style={{ width: '210px' }} src={pokemonById[0]?.image} alt={pokemonById.name} />
            </div>
          </div>
          <div className={styles.middleSectionInfo}>
            <h4>N° ID: {pokemonById[0]?.id}</h4>
            <h4>Name: {pokemonById[0]?.name.charAt(0).toUpperCase() + pokemonById[0]?.name.slice(1)}</h4>
            <h4>HP: {pokemonById[0]?.hp}</h4>
            <h4>Attack: {pokemonById[0]?.attack}</h4>
            <h4>Defense: {pokemonById[0]?.defense}</h4>
            <h4>Speed: {pokemonById[0]?.speed}</h4>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <h4>Height: {pokemonById[0]?.height}</h4>
          <h4>Weight: {pokemonById[0]?.weight}</h4>
          <h4>
            Type: {pokemonById[0]?.types[0].charAt(0).toUpperCase() + pokemonById[0]?.types[0].slice(1)}  
            {pokemonById[0]?.types[1] ? " & " + pokemonById[0]?.types[1].charAt(0).toUpperCase() + pokemonById[0]?.types[1].slice(1): null}
          </h4>
        </div>
      </div>
      </div>
    );
  }