import React from "react";
import Main from "../components/template/Main";
import AppContext from '../context/appContext'
import LoginSection from '../components/login/molecules/LoginSection'


const Home = () => {

  return (
    <Main>
    <AppContext.Consumer>
                {(context: any) => (
                  <>
                    <h1>Velkommen til SIF Vaskelister!</h1>
                    <h2>Logg inn</h2>
                    <LoginSection context={context} ></LoginSection>
                    </>
                )}
            </AppContext.Consumer>
      </Main>
  );
};

export default Home;
