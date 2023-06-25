import React from "react";
import { useState } from "react";
import styles from "./SearchBar.module.css";




export default function SearchBar(props) {

  const [name, setName] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleChange = event => {
    const {value} = event.target; //Me traigo el name del personaje
    console.log("Value: ", value);
    setName(value); //modifica el estado, pisa lo que tiene el estado id ("")
    setInputValue(value); //Hago lo mismo en el otro Estado
 }

 const handleButtonClick = (name) => {
  props.onSearch(name);
  //setId(''); Enves de pisar el Estado id, borro el input en el Estado inpuValue
  //El inputValue esta ligado al value del input
  setInputValue("");
};

  return (
    <div className={styles.container}>
      <h1>Estas en el SeachBar</h1>
      <input 
         type="text"
         placeholder="Enter a Name..."
         name="search"
         id="search"
         value={inputValue}
         onChange={handleChange}
      />
      <button onClick={() => handleButtonClick(name)}>Add</button>
    </div>
  );
}
