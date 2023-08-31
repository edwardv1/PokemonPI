import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPokemonById, clearDetail, removePokemon, handlerModal, errorModal, successModalRemove, hanlderErrorModal, modalConfirmationDelete } from "../../redux/actions";
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
  let modalConfirmation = useSelector((state) => state.modalDeleteConfirmation);
  
  //Limpia el estado global antes de desmontarse el componente
  useEffect(() => {
    dispatch(getPokemonById(id));
    return ()=>{dispatch(clearDetail())}
  }, [dispatch, id]);

  //Abre el modal de confirmacion
  const handlerDelete = () => {
    dispatch(modalConfirmationDelete(true));
  }
  
  //Despacha la action que elimina a pokemon
  const handleDeletePokemon = () => {
    dispatch(removePokemon(id));
    dispatch(modalConfirmationDelete(false));
  }

  //Cierra el modal de confirmación
  const handleCloseModalConfirmation = () => {
    dispatch(modalConfirmationDelete(false));
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

  //Background by type
  // Obtener el primer tipo del array de tipos
  const primaryType = pokemonById[0]?.types[0];
  // Generar la clase CSS para el color de fondo según el tipo primario
  let cardClassName = `${styles.card} ${styles[primaryType]}`;

  //Maps para pokebolas
  const numberOfImagesForAPI = 7;
  const numberOfImagesForDB = 4;
  const imagesArrayAPI = Array.from({ length: numberOfImagesForAPI });
  const imagesArrayDB = Array.from({ length: numberOfImagesForDB });

  //Codigo para controlar el tamaño de pantalla
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //console.log(windowWidth);
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
      <div className={styles.background}>
      { pokemonById.length > 0 ?
      <div className={styles.container}>
        <div className={cardClassName}>
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
                {
                  windowWidth <= 660 ?
                  <h3>{pokemonById[0]?.name.toUpperCase()} </h3>
                  :
                  <h4>{pokemonById[0]?.name.toUpperCase()} </h4>
                }
                
              </div>
      
                <img style={{ width: '25px'}} src={pokebola} alt="pokebola" />
              
            </div>
            <div className={styles.middleSectionImageBottom}>
            {
              windowWidth <= 660 ?
              <img style={{ width: '280px' }} src={pokemonById[0]?.image} alt={pokemonById.name} />
              :
              <img style={{ width: '210px' }} src={pokemonById[0]?.image} alt={pokemonById.name} />
            }
            </div>
          </div>
          <div className={styles.middleSectionInfo}>
            <h4>Name: {pokemonById[0]?.name.charAt(0).toUpperCase() + pokemonById[0]?.name.slice(1)}</h4>
            <h4>N° ID: {pokemonById[0]?.id}</h4>
            <h4>HP: {pokemonById[0]?.hp}</h4>
            <h4>Attack: {pokemonById[0]?.attack}</h4>
            <h4>Defense: {pokemonById[0]?.defense}</h4>
            <h4>Speed: {pokemonById[0]?.speed}</h4>
          </div>
        </div>
        <div className={styles.bottomSectionPosition}>
          <div className={styles.bottomSection}>
        {windowWidth <= 660 ? <h4>Other Attributes: </h4> : null}
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
              {imagesArrayDB.map((_, index) => (
                <img key={index} style={{ width: '100px' }} src={pokebolas} alt="pokebolas" />
              ))}
              {
                windowWidth > 660 ?
                  <button onClick={handlerDelete} className={styles.buttonAbout}>Delete Pokemon</button>
                  :
                  null
              }
          </div>
          : 
          <div>
            {imagesArrayAPI.map((_, index) => (
                <img key={index} style={{ width: '100px' }} src={pokebolas} alt="pokebolas" />
              ))}
          </div>
          }
          </div>
        </div>    
      </div>
      :
      <div className={styles.loading}>
        <img style={{ width: '300px' }} src={mew} alt="Mew" />
        <h4>Loading...</h4>
      </div>
      }

      {/* IMPLEMENTACION DE VENTANA MODAL EN CASO DE ERROR*/}
      {
      modalForError ?
      <div className= {styles.containerModalOpened}>
          <div className={styles.modalOpened}>
            <Link to="/home">
              <button onClick={onClickCloseError} className={styles.delete} >X</button>
            </Link>
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


      {/* IMPLEMENTACION DE VENTANA MODAL DE CONFIRMACION*/}
      {modalConfirmation ? (
        <div className={styles.containerModalOpened}>
          <div className={styles.modalConfirmationOpened}>
            <div className={styles.head3}>
              <h2>Are you sure to delete this Pokemon?</h2>
              <hr />
            </div>

            <div className={styles.bottom3}>
              <button
                className={styles.buttonRegresar}
                onClick={handleCloseModalConfirmation}
              >
                Back
              </button>
              <button
                className={styles.buttonConfirmar}
                onClick={() => handleDeletePokemon()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.containerModalClosed}>
          <div className={styles.modalClosed}></div>
        </div>
      )}
      
      </div>
    );
  }


  