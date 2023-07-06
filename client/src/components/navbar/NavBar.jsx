import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";


export default function NavBar() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <h1>Welcome to Pokemon World</h1>
        </div>
        <div className={styles.middleSection}>
          <SearchBar/>
        </div>
        <div className={styles.bottomSection}>
          <Link to={`/`} className={styles.containerText}>
              <p className={styles.text}>Exit</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
