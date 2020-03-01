import React from 'react'
import Link from 'next/link'
import style from "./nav.module.css"
import Router from 'next/router'

const Nav = () => (
  <nav >
    <ul className={style.test}>
      <li>
        <h1 className={style.home}>Sif Vaskelisteordning</h1>
      </li>
      {/* <li>
        <Link href="https://www.siost.hiof.no/bolig">
          <a>Test Home</a>
        </Link>
      </li> */}
      {/* {[{key: 0, href:"", label:"Label"}].map(({ key, href, label }) => (
        <li key={key}>
          <a href={href}>{label}</a>
        </li>
      ))} */}
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

export default Nav
