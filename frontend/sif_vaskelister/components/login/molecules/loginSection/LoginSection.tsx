import styles from "./login.module.css";
import React, { FC, useState } from "react";
import { login } from "../../../../api/auth";
import Router from "next/router";

interface Props {
  context: any;
}

const LoginSection: FC<Props> = ({ context }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (username: string, password: string) => {
    const user = await login(username, password);
    console.log(user)
    context.storeUser(user);
    const errorMessage = document.getElementById('errorMessage')
    if(!user.user?.id && errorMessage){
      errorMessage.style.display = 'block';
    }else{
      (user.user?.dormroom != null) ? await Router.push("/user-washlist") : await Router.push("/manager-view");
    }
  };

  return (
    <>
    <p className={styles.error} id='errorMessage' >Brukernavn og/eller Passord er feil</p>
      <label>
        <p className={styles.label}>Brukernavn</p>
        <input
          type="text"
          placeholder="Brukernavn"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? handleLogin(username, password) : null }
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
          onKeyDown={(e) => e.key === 'Enter' ? handleLogin(username, password) : null }
        />
      </label>
      {/* <label>
          <input type="checkbox" name="remember" /> Husk meg!
        </label> */}
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
