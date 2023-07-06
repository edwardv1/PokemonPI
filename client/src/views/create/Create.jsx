import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validationInputs from "./validationInputs";
import validationCreate from "./validationCreate";
import { createPokemon, getTypes } from "../../redux/actions";
import styles from "./Create.module.css";

export default function Create() {

  const message_success = "Data entered correctly...";
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

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
    let errExists = validationCreate(errors, input); //retorna true o false
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
        setErrors(validationInputs({
            ...input,
            [name]: value
        }))
    }
  };

  //la funcion agrega los types al input, despacha el input (info pokemon) y luego setea el input
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

  return (
    <div className={styles.background}>
    
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.topSection}>
          <h3>CREATE POKEMON</h3>
        </div>  

        <div className={styles.middleSection}>

            <div className={styles.stylesDiv}>
              <div>
                <label>Name: </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={input.name}
                  placeholder="Enter a name..."
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.errorInputs}>
                {errors.name ? <p className={styles.error}>{errors.name}</p> : <p className={styles.message}>{message_success}</p>}
              </div>
            </div>

            <div className={styles.stylesDiv}>
              <div>
                <label>Image: </label>
                <input
                  type="text"
                  name="image"
                  required
                  value={input.image}
                  placeholder="Enter an URL..."
                  onChange={(event) => handleInputChange(event)}
                  />
              </div>
              <div className={styles.errorInputs}>
                {errors.image ? <p className={styles.error}>{errors.image}</p> : <p className={styles.message}>{message_success}</p>}
              </div>
          </div>

          <div className={styles.stylesDiv}>
            <div>
              <label>HP: </label>
              <input
                type="number"
                name="hp"
                required
                value={input.hp}
                placeholder="Enter a value..."
                onChange={(event) => handleInputChange(event)}
              />
            </div>
            <div className={styles.errorInputs}>
              {errors.hp ? <p className={styles.error}>{errors.hp}</p> : <p className={styles.message}>{message_success}</p>}
            </div>
          </div>

          <div className={styles.stylesDiv}>
            <div>
              <label>Attack: </label>
              <input
                type="number"
                name="attack"
                required
                value={input.attack}
                placeholder="Enter a value..."
                onChange={(event) => handleInputChange(event)}
              />
            </div>
            <div className={styles.errorInputs}>
              {errors.attack ? <p className={styles.error}>{errors.attack}</p> : <p className={styles.message}>{message_success}</p>}
            </div>
          </div>

          <div className={styles.stylesDiv}>
            <div>
              <label>Defense: </label>
              <input
                type="number"
                name="defense"
                required
                value={input.defense}
                placeholder="Enter a value..."
                onChange={(event) => handleInputChange(event)}
              />
            </div>
            <div className={styles.errorInputs}>
              {errors.defense ? <p className={styles.error}>{errors.defense}</p> : <p className={styles.message}>{message_success}</p>}
            </div>
          </div>

          <div className={styles.stylesDiv}>
            <div>
              <label>Speed: </label>
              <input
                type="number"
                name="speed"
                value={input.speed}
                placeholder="Enter a value..."
                onChange={(event) => handleInputChange(event)}
              />
            </div>
            <div className={styles.errorInputs}>
              {errors.speed ? <p className={styles.error}>{errors.speed}</p> : <p className={styles.message}>{message_success}</p>}
            </div>
          </div>

          <div className={styles.stylesDiv}>
            <div>
              <label>Height: </label>
              <input
                type="number"
                name="height"
                value={input.height}
                placeholder="Enter a value..."
                onChange={(event) => handleInputChange(event)}
              />
            </div>
            <div className={styles.errorInputs}>
              {errors.height ? <p className={styles.error}>{errors.height}</p> : <p className={styles.message}>{message_success}</p>}
            </div>
          </div>

          <div className={styles.stylesDiv}>
            <div>
              <label>Weight: </label>
              <input
                type="number"
                name="weight"
                value={input.weight}
                placeholder="Enter a value..."
                onChange={(event) => handleInputChange(event)}
              />
            </div>
            <div className={styles.errorInputs}>
              {errors.weight ? <p className={styles.error}>{errors.weight}</p> : <p className={styles.message}>{message_success}</p>}
            </div>
          </div>

          <hr className={styles.hr} />
          <label>Types: </label>
  
          <div className={styles.checkboxContainer}>
            <div>
              {types?.map( (type, key) => {
                  return (
                    <div className={styles.checkboxOrder}>  
                        <div>
                          <label>{type.name}</label>
                        </div>
                        <div >
                          <hr className={styles.hr} />
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
          {errors.types ? <p className={styles.error}>{errors.types}</p> : <p className={styles.message}>{message_success}</p>}
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
    </div>
    );
  }
  
