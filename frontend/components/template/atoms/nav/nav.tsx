import React from "react";
import style from "./nav.module.css";

const Nav = () => (
  <nav>
    <ul className={style.test}>
      <li>
        <h1 className={style.home}>Sif Vaskelisteordning</h1>
      </li>
      <li>
        <button
          className={style.button}
          type="button"
          onClick={() => {
            window.location.href = "http://localhost:3000";
          }}
        >
          <p>Logg ut</p>
        </button>
      </li>
    </ul>
  </nav>
);

export default Nav;
