import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPokemonById, clearDetail, removePokemon, handlerModal, errorModal, successModalRemove, hanlderErrorModal } from "../../redux/actions";
import styles from "./Detail.module.css";
import pokebola from "../../images/pokebola8.png";
import pokebolas from "../../images/pokebolas.png";
import mew from "../../images/mew.gif";

export default function Detail() {
  //Recibo el valor de id pasado por parametro del path
  const { id } = useParams(); 
  const navigate = useNavigate();
  const regexUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  const dispatch = useDispatch();
  const pokemonById = useSelector((state) => state.pokemonDetail);
  const modal = useSelector((state) => state.modal);
  let messageDeleted = useSelector((state) => state.messageDeleted);
  const error = useSelector((state) => state.errors);
  let modalForError = useSelector((state) => state.modalForError);
  
  //Limpia el estado global antes de desmontarse el componente
  useEffect(() => {
    dispatch(getPokemonById(id));
    return ()=>{dispatch(clearDetail())}
  }, [dispatch, id]);

  //Despacha la action removePoke
  const handlerDelete = () => {
    dispatch(removePokemon(id));
  }

  //Condicionales para las ventanas Modal en caso de error
 
  //Abre la ventana Modal si hay un error
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

  //Condicionales para las ventanas Modal en caso de eliminar pokemon de forma exitosa

  //Abre la ventana Modal mostrando el id del pokemon eliminado
  if(Object.keys(messageDeleted).length > 0){
    const open = "isOpened";
    dispatch(handlerModal(open))
  }

  //Cierra la ventana Modal y Redirige al usuario al componente Home
  const onClickCloseDeleted = () => {
    const close = "isClosed";
    dispatch(successModalRemove(""));
    dispatch(handlerModal(close));
    navigate('/home'); 
  }

    return (
      <div className={styles.background}>
      { pokemonById.length > 0 ? 
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
        <div className={styles.bottomSectionPosition}>
          <div className={styles.bottomSection}>
            <h4>Height: {pokemonById[0]?.height}</h4>
            <h4>Weight: {pokemonById[0]?.weight}</h4>
            <h4>
              Type: {pokemonById[0]?.types[0].charAt(0).toUpperCase() + pokemonById[0]?.types[0].slice(1)}  
              {pokemonById[0]?.types[1] ? " & " + pokemonById[0]?.types[1].charAt(0).toUpperCase() + pokemonById[0]?.types[1].slice(1): null}
            </h4>
          </div>
            
          {
            regexUUID.test(id) ?
            <div className={styles.about}>
              <img style={{ width: '100px'}} src={pokebolas} alt="pokebolas" />
              <img style={{ width: '100px'}} src={pokebolas} alt="pokebolas" />
              <img style={{ width: '100px'}} src={pokebolas} alt="pokebolas" />
              <img style={{ width: '100px'}} src={pokebolas} alt="pokebolas" />
            <button onClick={handlerDelete} className={styles.buttonAbout}>Delete Pokemon</button>
          </div>
          : 
          <div>
            <img style={{ width: '100px'}} src={pokebolas} alt="pokebolas" />
            <img style={{ width: '100px'}} src={pokebolas} alt="pokebolas" />
            <img style={{ width: '100px'}} src={pokebolas} alt="pokebolas" />
            <img style={{ width: '100px'}} src={pokebolas} alt="pokebolas" />
            <img style={{ width: '100px'}} src={pokebolas} alt="pokebolas" />
            <img style={{ width: '100px'}} src={pokebolas} alt="pokebolas" />
            <img style={{ width: '100px'}} src={pokebolas} alt="pokebolas" />
          </div>
          }
        </div>    
      </div>
      :
      <div className={styles.loading}>
        <img style={{ width: '300px' }} src={mew} alt="Mew" />
        <h4>Loading...</h4>
      </div>
      }

      {/* IMPLEMENTACION DE VENTANA MODAL EN CASO DEERROR*/}
      {
      modalForError ?
      <div className= {styles.containerModalOpened}>
          <div className={styles.modalOpened}>
            <button onClick={onClickCloseError} className={styles.delete} >X</button>
            <div>
              <h1>ERROR!</h1>
              <hr />
              <h2>{error}</h2>
            </div>
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

      {/* IMPLEMENTACION DE VENTANA MODAL AL ELIMINAR UN POKEMON*/}
      {
      modal ?
      <div className= {styles.containerModalOpened}>
          <div className={styles.modalOpenedDeleted}>
            <button onClick={onClickCloseDeleted} className={styles.delete} >X</button>
            <div>
              <h1>VERY GOOD!</h1>
              <hr />
              <h2>{messageDeleted}</h2>
            </div>
        </div>
      </div>
      :
      <div className= {styles.containerModalClosed}>
          <div className={styles.modalClosed}>
            <button onClick={onClickCloseDeleted} className={styles.delete} >X</button>
            <div>
              <h1>VERY GOOD!</h1>
              <hr />
              <h2>Done</h2>
            </div>
        </div>
      </div>
      } 

      </div>
    );
  }