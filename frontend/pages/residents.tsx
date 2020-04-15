import React from "react";
import ResidentsPage from "../components/residents/organisms/residentsPage/ResidentsPage";
import Main from "../components/template/molecules/main/Main";
import AppContext from "../context/appContext";
import { State } from "../context/AppState";

const Vaskeliste = () => {
  return (
    <Main>
      <AppContext.Consumer>
        {(context: State) => <ResidentsPage context={context}/>}
      </AppContext.Consumer>
    </Main>
  );
};

export default Vaskeliste;
