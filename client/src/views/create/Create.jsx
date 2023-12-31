import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validationInputs from "./validationInputs";
import validationCreate from "./validationCreate";
import { createPokemon, getTypes, handlerModal, errorModal, successModal } from "../../redux/actions";
import lugia from "../../images/lugia.gif";
import pokes from "../../images/evoluciones.gif";
import styles from "./Create.module.css";
import {RiArrowLeftSLine} from 'react-icons/ri';
import {RiArrowRightSLine} from 'react-icons/ri';



export default function Create() {

  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const modal = useSelector((state) => state.modal);
  let error = useSelector((state) => state.errors);
  let messageCreated = useSelector((state) => state.messageCreated);
  
  const [input, setInput]= useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "", 
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: "",
  });
  
  const [disable, setDisable] =useState(false);

  // Este useEffect valida los campos en tiempo real
  useEffect(() => {
    setErrors(validationInputs(input));
  }, [input]);

  // Este useEffect controla que el boton "Create" se habilite o no
  useEffect(() => { 
    let errExists = validationCreate(errors, input);
    !errExists
    ? setDisable(true)
    : setDisable(false)
  }, [errors, input]);

  const handleInputChange = (event) => {
    if (event.target.type === 'checkbox') {
        if (event.target.checked) {
            setInput({
                ...input,
                types: input.types.concat(event.target.value)
            })
        } else {
            setInput({
                ...input,
                types: input.types.filter(type => type !== event.target.value)
            })
        }
    } else {
        const {name, value} = event.target;
        setInput({
            ...input,
            [name]: value
        })
    }
  };

  //Funcion que despacha el input (info pokemon) y luego lo setea
  function handleSubmit(event){
    try{
      event.preventDefault();
      dispatch(createPokemon(input)); 
      setInput({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
      });

      types.map(type => {
        let check = document.getElementById(type.id);
        check.checked = false;
        return 0;
      })
    } catch (error) {
      window.alert(error.message);
    }
  }

  //useEffect para traerme los types cada vez que se monte el componente
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  if(Object.keys(error).length > 0){
    const open = "isOpened";
    dispatch(handlerModal(open))
  }
  
  const onClickClose = () => {
    const close = "isClosed";
    dispatch(errorModal(""));
    dispatch(handlerModal(close));
  }

  if(Object.keys(messageCreated).length > 0){
    const open = "isOpened";
    dispatch(handlerModal(open))
  }

  const onClickCloseCreated = () => {
    const close = "isClosed";
    dispatch(successModal(""));
    dispatch(handlerModal(close));
  }

  return (
    <div className={styles.background}>
      <div className={styles.lugia}>
        <img style={{ width: '300px' }} src={lugia} alt="Lugia" />
      </div>
      
        <form onSubmit={handleSubmit} className={styles.form}>
          
          <div className={styles.topSection}>
            <h3>CREATE YOUR POKEMON</h3>
          </div>  

          <div className={styles.middleSection}>
            <div className={styles.middle}>
        
                <div className={styles.coolinput}>
                  <label for="input" className={styles.text}>Name:</label>
                  <input type="text" name="name" placeholder="Enter a name..." value={input.name} className={styles.input} onChange={(event) => handleInputChange(event)}/>
                </div>
                <div className={styles.error}>
                  {errors.name ? <p >{errors.name}</p> : null}
                  {/* <p className={styles.message}>{message_success}</p> */}
                </div>
                
                <div className={styles.coolinput}>
                  <label for="input" className={styles.text}>Image:</label>
                  <input type="text" name="image" placeholder="Enter an URL..." value={input.image} className={styles.input} onChange={(event) => handleInputChange(event)}/>
                </div>
                <div className={styles.error}>
                  {errors.image ? <p>{errors.image}</p> : null}  
                </div>
                
  
                <div className={styles.coolinput}>
                  <label for="input" className={styles.text}>HP:</label>
                  <input type="number" name="hp" placeholder="Enter a value..." value={input.hp} className={styles.input} onChange={(event) => handleInputChange(event)}/>
                </div>
                <div className={styles.error}>
                  {errors.hp ? <p>{errors.hp}</p> : null}
                </div>

                <div className={styles.coolinput}>
                  <label for="input" className={styles.text}>Attack:</label>
                  <input type="number" name="attack" placeholder="Enter a value..." value={input.attack} className={styles.input} onChange={(event) => handleInputChange(event)}/>
                </div>
                <div className={styles.error}>
                  {errors.attack ? <p>{errors.attack}</p> : null}
                </div>   
            </div>

            <div className={styles.middle}>
                <div className={styles.coolinput}>
                  <label for="input" className={styles.text}>Defense:</label>
                  <input type="number" name="defense" placeholder="Enter a value..." value={input.defense} className={styles.input} onChange={(event) => handleInputChange(event)}/>
                </div>
                <div className={styles.error}>
                  {errors.defense ? <p>{errors.defense}</p> : null}
                </div> 
                  
                <div className={styles.coolinput}>
                  <label for="input" className={styles.text}>Speed:</label>
                  <input type="number" name="speed" placeholder="Enter a value..." value={input.speed} className={styles.input} onChange={(event) => handleInputChange(event)}/>
                </div>
                <div className={styles.error}>
                  {errors.speed ? <p>{errors.speed}</p> : null}
                </div> 
              
                <div className={styles.coolinput}>
                  <label for="input" className={styles.text}>Height:</label>
                  <input type="number" name="height" placeholder="Enter a value..." value={input.height} className={styles.input} onChange={(event) => handleInputChange(event)}/>
                </div>
                <div className={styles.error}>
                  {errors.height ? <p>{errors.height}</p> : null}
                </div>
              
                <div className={styles.coolinput}>
                  <label for="input" className={styles.text}>Weight:</label>
                  <input type="number" name="weight" placeholder="Enter a value..." value={input.weight} className={styles.input} onChange={(event) => handleInputChange(event)}/>
                </div>
                <div className={styles.error}>
                  {errors.weight ? <p>{errors.weight}</p> : null}
                </div>
            </div>
          </div>
            <hr className={styles.hr} />
          
            <label style={{paddingBottom: "20px"}} for="input" className={styles.type}>Types:</label>
            <div className={styles.checkboxContainer}>
              <div>
                {types?.map( (type, key) => {
                  return (
                    <div className={styles.checkboxOrder}>  
                          <div className={styles.typeName}>
                            <label>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</label>
                          </div>
                          <div className={styles.arrow}>
                            <RiArrowLeftSLine className={styles.arrows}/>
                            <hr className={styles.hrbox} />
                            <RiArrowRightSLine className={styles.arrows}/>
                          </div>
                          <div>
                            <input 
                            type="checkbox"
                            name="types"
                            value={type.name}
                            key={type.id} 
                            onChange={handleInputChange}
                            className={styles.checkbox}
                            id={type.id}
                            />
                          </div>
                      </div>
                    )
                })}
              </div>
            </div>
            <div className={styles.error}>
              {errors.types ? <p>{errors.types}</p> : null}
            </div>   
          <div className={styles.bottomSection}>
            { disable? 
            (<button
              className={styles.buttonCreate}
              type="submit"
              onClick={(event) => handleSubmit(event)}
              > Create </button>
              ) 
              : 
              (<button disabled className={styles.buttonCreate}>Create</button>)}   

            <Link to={`/home`} >
              <button className={styles.buttonCancel}>Cancel</button>
            </Link>
          </div>
        </form>
      

      <div className={styles.pokemones}>
        <img style={{ width: '300px' }} src={pokes} alt="Pokemones" />
      </div>

    {/* IMPLEMENTACION DE MODAL */}
    {
      modal && Object.keys(error).length > 0 ?
      <div className= {styles.containerModalOpened}>
          <div className={styles.modalOpened}>
            <button onClick={onClickClose} className={styles.delete} >X</button>
            <div>
              <h1>ERROR!</h1>
              <hr className={styles.hrModal}/>
              <h2>{error}</h2>
            </div>
        </div>
      </div>
      :
      <div className= {styles.containerModalClosed}>
          <div className={styles.modalClosed}>
            <button onClick={onClickClose} className={styles.delete} >X</button>
            <div>
              <h1>ERROR!</h1>
              <hr />
              <h2>Error</h2>
            </div>
        </div>
      </div>
      }

      {
      modal && Object.keys(messageCreated).length > 0 ?
      <div className= {styles.containerModalOpened}>
          <div className={styles.modalOpenedCreated}>
            <button onClick={onClickCloseCreated} className={styles.delete} >X</button>
            <div>
              <h1>VERY GOOD!</h1>
              <hr className={styles.hrModal}/>
              <h2>{messageCreated}</h2>
            </div>
        </div>
      </div>
      :
      <div className= {styles.containerModalClosed}>
          <div className={styles.modalClosed}>
            <button onClick={onClickCloseCreated} className={styles.delete} >X</button>
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
  
