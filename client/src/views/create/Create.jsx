import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validationInputs from "./validationInputs";
import { createPokemon, getTypes } from "../../redux/actions";
import styles from "./Create.module.css";

export default function Create() {

  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [input, setInput]= useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
  });
  
  //Creo un estado de errores para los campos obligatoios, y asi hacer las validaciones
  const [errors, setErrors] = useState({
    name: "Required form field!",
    image: "Required form field!",   //puedo agregar un texto aqui para indicar que es un campo obligatorio
    hp: "Required form field!",
    attack: "Required form field!",
    defense: "Required form field!",
    speed: "",
    height: "",
    weight: "",
    types: "At least one type must be selected!",
  });

  console.log(errors.types);
  
  const [selectedTypes, setSelectedTypes] = useState([]);

  //funcion que obtiene cada input y los guarda en el estado local
  function handleInputChange(event) {
    let { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  // Este useEffect permite validar los campos en tiempo real
  useEffect(() => {
    setErrors(validationInputs(input));
  }, [input]);

  console.log(selectedTypes);
  console.log(selectedTypes.length);

  //funcion para evitar que seleccionen mas de 2 types
  const handleTypesChange = (event) => {
    if (selectedTypes.length >= 2) {
      return setErrors({
        ...errors,
        types: "You must choose a maximum of 2 types",
      });
    }
    setErrors({ ...errors, types: "" });
    setSelectedTypes([...selectedTypes, event.target.value]);
  };

  const removeTypes = (typeDeleted) => {
    let typesFiltered = selectedTypes.filter((type) => type !== typeDeleted);
    setSelectedTypes(typesFiltered);
  };


  //la funcion agrega los types al input, despacha el input (info pokemon) y luego setea el input
  function handleSubmit(event){
    try{
      event.preventDefault();
      setInput({
        ...input,
        types: input.types.push(...selectedTypes),  //  ME ROMPE EL CODIGOOOOO ESTO ---> types: [...input.types, ...selectedTypes],
      });
      dispatch(createPokemon(input));
      setInput({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
      });
      setSelectedTypes([]);
    } catch (error) {
      window.alert(error.message);
    }
  }

  //useEffect para traerme los types cada vez que se monte el componente
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.topSection}>
          <h3>CREATE POKEMON</h3>
        </div>  

        <div className={styles.middleSection}>

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
            {errors.name ? <p>{errors.name}</p> : null}
          </div>
          
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
            {errors.image ? <p>{errors.image}</p> : null}
          </div>

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
            {errors.hp ? <p>{errors.hp}</p> : null}
          </div>

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
            {errors.attack ? <p>{errors.attack}</p> : null}
          </div>

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
            {errors.defense ? <p>{errors.defense}</p> : null}
          </div>

          <div>
            <label>Speed: </label>
            <input
              type="number"
              name="speed"
              value={input.speed}
              placeholder="Enter a value..."
              onChange={(event) => handleInputChange(event)}
            />
            {errors.speed ? <p>{errors.speed}</p> : null}
          </div>

          <div>
            <label>Height: </label>
            <input
              type="number"
              name="height"
              value={input.height}
              placeholder="Enter a value..."
              onChange={(event) => handleInputChange(event)}
            />
            {errors.height ? <p>{errors.height}</p> : null}
          </div>

          <div>
            <label>Weight: </label>
            <input
              type="number"
              name="weight"
              value={input.weight}
              placeholder="Enter a value..."
              onChange={(event) => handleInputChange(event)}
            />
            {errors.weight ? <p>{errors.weight}</p> : null}
          </div>

           <div>
            {selectedTypes?.map((type) => {
              return (
                <span key={type}>
                  {type}
                  <button 
                  className={styles.delete}
                  onClick={() => removeTypes(type)}>X</button>
                </span>
              );
            })}
          </div>

          <div>
            <select name="types" onChange={handleTypesChange}>
              <option>Types</option>
              {types?.map((type) => {
                return (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                );
              })}
            </select>
            {errors.types ? <p>{errors.types}</p> : null}
          </div> 
      
        </div>

        
        <div className={styles.bottomSection}>

          {input.name !== "" &&
          input.image !== "" &&
          input.hp !== "" &&
          input.attack !== "" &&
          input.defense !== "" &&
          input.speed >= 0 &&
          input.height >= 0 &&
          input.weight >= 0 &&
          selectedTypes.length > 0 
          ? 
          (
            <button
              className={styles.buttonCreate}
              type="submit"
              onClick={(event) => handleSubmit(event)}
            >
              Create
            </button>
          ) 
          : 
          (
            <button disabled className={styles.buttonCreate}>
              Create
            </button>
          )}   

          <Link to={`/home`} >
            <button className={styles.buttonCancel}>
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
    );
  }
  
//En el submit del form de le envia toda la info recibida por los inputs hacia el back
/*
No me funciona sumando:
  errors.speed === "" &&
  errors.height === "" &&
  errors.weight === "" &&

  input.speed >= 0 &&
          input.height >= 0 &&
          input.weight >= 0 &&

  por lo que no se valida que dichos datos se envien menores a 0
*/

/*
let disable;
useEffect(() => {
  input.name !== "" &&
  input.image !== "" &&
  input.hp !== "" &&
  input.attack !== "" &&
  input.defense !== "" &&
  input.speed >= 0 &&
  input.height >= 0 &&
  input.weight >= 0 &&
  selectedTypes.length > 0 
  ? disable = true
  : false 

  }, [input]);

o probar con un estado local...

const [disable, setDisable] = useState(false);

useEffect(() => {
  input.name !== "" &&
  input.image !== "" &&
  input.hp !== "" &&
  input.attack !== "" &&
  input.defense !== "" &&
  input.speed >= 0 &&
  input.height >= 0 &&
  input.weight >= 0 &&
  selectedTypes.length > 0 
  ? setDisable(true);
  : setDisable(false)
  }, [input]);


*/