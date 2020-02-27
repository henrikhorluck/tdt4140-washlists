import React, { useState } from "react";
import styles from "./login.module.css";
import Main from "../components/template/Main";
import { login } from "../components/api/auth";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Main>
        <h1>Velkommen til SIF Vaskelister!</h1>
        <h2>Logg inn</h2>
        <label>
          <p className={styles.label}>Brukernavn</p>
          <input
            type="text"
            placeholder="Brukernavn"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label>
          <p className={styles.label}>Passord</p>
          <input
            type="password"
            placeholder="Passord"
            required
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label>
          <input type="checkbox" name="remember" /> Husk meg!
        </label>
        <button
          className={styles.button}
          type="button"
          onClick={async () => {
            await login(username, password);
          }}
        >
          <p>Logg inn</p>
        </button>
      </Main>
    </div>
  );
};

export default Home;
