
import styles from "./login.module.css";
import React, { FC, useState, useContext, useEffect } from "react";
import { login } from "../../../components/api/auth";
import Router from 'next/router'

interface Props {
    context:any
  }

  interface User {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    dormroom: Number[];
}

 const LoginSection: FC<Props> = ({context}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (username: string, password: string) => {
        const user = await login(username, password)
        context.storeUser(user);
        if(user.user?.dormroom != null){
            Router.push("/vaskeliste"); 
        }else{
            Router.push("/manager");
        }
      }

  return (
    <>
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
          onClick={() => handleLogin(username, password)}
        >
          <p>Logg inn</p>
        </button>
    </>
  );
};

export default LoginSection;