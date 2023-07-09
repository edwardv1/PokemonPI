import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonByName, handlerModal } from "../../redux/actions";
import { Link } from "react-router-dom";
import chooseWisely from "../../images/ChooseWisely2.png"
import styles from "./SearchBar.module.css";


export default function SearchBar() {

  const [name, setName] = useState("");

  const allPokemons = useSelector((state) => state.allPokemons);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setName(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchName = allPokemons.filter((pokemon) => pokemon.name.includes(name));
    console.log(searchName);
    if (searchName) {
      dispatch(getPokemonByName(name));
    } else {
      alert("No pokemon found with the entered name");
    }
    setName("");
  };

  const onClickOpen = () => {
    const open = "isOpened";
    dispatch(handlerModal(open))
  }

  return (
    <div className={styles.container}>
      <Link to="/create" className={styles.text}>
        <h3>Create Pokemon</h3>
      </Link>

      <div>
        <h2>Search by Name</h2>
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
      <div>
        <img style={{ width: '200px'}} src={chooseWisely} alt="chooseWisely" />
      </div >
      <div className={styles.about}>
        {/* <h3 onClick={onClickOpen}>About me</h3> */}
        <button onClick={onClickOpen} className={styles.buttonAbout}> About me </button>
      </div>
      
    </div>
  );
}

{/* 
<Link to="/about" className={styles.about}>
        <h3>About me</h3>
      </Link> */}