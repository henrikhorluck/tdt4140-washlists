import React from "react";
import Main from "../components/template/molecules/main/Main";
import AppContext from "../context/appContext";
import LoginSection from "../components/login/molecules/LoginSection";

const Index = () => {
  return (
    <Main>
      <AppContext.Consumer>
        {(context: any) => (
          <>
            <h1>Velkommen til SIF Vaskelister!</h1>
            <h2>Logg inn</h2>
            <LoginSection context={context}></LoginSection>
          </>
        )}
      </AppContext.Consumer>
    </Main>
  );
};

export default Index;
