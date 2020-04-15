import React from "react";
import Main from "../components/template/molecules/main/Main";
import AppContext from "../context/appContext";
import LoginSection from "../components/login/molecules/loginSection/LoginSection";
import { State } from "../context/AppState";

const Index = () => {
  return (
    <Main>
      <AppContext.Consumer>
        {(context: State) => (
          <>
            <h1>Velkommen til SIF Vaskelister!</h1>
            <h2>Logg inn</h2>
            <LoginSection context={context}/>
          </>
        )}
      </AppContext.Consumer>
    </Main>
  );
};

export default Index;
