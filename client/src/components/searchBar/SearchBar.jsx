import React from "react";
import { useState } from "react";
import styles from "./SearchBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions";
import { Link } from "react-router-dom";
import chooseWisely from "../../images/ChooseWisely2.png"



export default function SearchBar() {

  const [name, setName] = useState("");
  //const [inputValue, setInputValue] = useState("");

  const allPokemons = useSelector((state) => state.allPokemons);
  console.log(allPokemons);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setName(event.target.value.toLowerCase());
  };
  console.log(name);

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchName = allPokemons.filter((pokemon) => pokemon.name.includes(name));
    console.log(searchName);
    if (searchName) {
      console.log(name);
      dispatch(getPokemonByName(name));
    } else {
      alert("No pokemon found with the entered name");
    }
    setName("");
  };

  return (
    <div className={styles.container}>
      <Link to="/create" className={styles.text}>
        <h2>Create Pokemon</h2>
      </Link>

      <h2>Filters</h2>

      <h2>Search by Name</h2>
      <div>
        <input 
          type="text"
          placeholder="Enter a Name..."
          name="search"
          id="search"
          value={name}
          onChange={event => handleInputChange(event)}
        />
        <button type="submit" onClick={event => handleSubmit(event)}>Search 🔎</button>
      </div>
    </div>
  );
}
