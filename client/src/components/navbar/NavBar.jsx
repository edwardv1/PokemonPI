import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";




export default function NavBar() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.div1}>
          <h1>Welcome to Pokemon World</h1>
        </div>
        <div className={styles.div2}>
          <SearchBar/>
        </div>
        <div className={styles.div3}>
          <Link to={`/`} className={styles.containerText}>
              <p className={styles.text}>Exit</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

//<div className={styles.background}> </div>