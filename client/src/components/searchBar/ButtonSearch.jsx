import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions";
import styles from "./ButtonSearch.module.css";


export default function ButtonSearch() {

  const [name, setName] = useState("");
  
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setName(event.target.value.toLowerCase());
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getPokemonByName(name));
    setName("");
  };

  return (
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Enter a Name..."
          name="search"
          id="search"
          value={name}
          onChange={event => handleInputChange(event)}
        />
        <button type="submit" onClick={event => handleSubmit(event)} className={styles.button}>Search 🔎</button>
      </div> 
  );
}
