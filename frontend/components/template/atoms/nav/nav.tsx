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
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            window.location.href = process.env.DOMAIN!;
          }}
        >
          <p>Logg ut</p>
        </button>
      </li>
    </ul>
  </nav>
);

export default Nav;
