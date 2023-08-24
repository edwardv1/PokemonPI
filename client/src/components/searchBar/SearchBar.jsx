import React from "react";
import { useDispatch } from "react-redux";
import { handlerModal } from "../../redux/actions";
import { Link } from "react-router-dom";
import chooseWisely from "../../images/ChooseWisely2.png";
import styles from "./SearchBar.module.css";
import ButtonSearch from "./ButtonSearch";


export default function SearchBar() {


  const dispatch = useDispatch();

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
        <ButtonSearch/>
      </div>
      <div>
        <img style={{ width: '200px'}} src={chooseWisely} alt="chooseWisely" />
      </div >
      <div className={styles.about}>
        <button onClick={onClickOpen} className={styles.buttonAbout}> About me </button>
      </div>
      
    </div>
  );
}
