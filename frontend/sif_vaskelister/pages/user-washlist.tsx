import React from "react";
import Washlist from "../components/userWashlist/molecules/washlist/Washlist";
import Main from "../components/template/molecules/main/Main";
import AppContext from "../context/appContext";
import { State } from "../context/AppState";

const Vaskeliste = () => {
  return (
    <Main>
      <AppContext.Consumer>
        {(context: State) => <Washlist context={context}/>}
      </AppContext.Consumer>
    </Main>
  );
};

export default Vaskeliste;
