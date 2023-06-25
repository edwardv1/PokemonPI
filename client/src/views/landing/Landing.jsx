import React from "react";
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";

export default function Landing(props) {
    return (
      <div className={styles.box}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Link to={`/home`} className={styles.text}>
              <p>Start</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }