import React from "react";
import ResidentsPage from "../components/residents/organisms/residentsPage/ResidentsPage";
import Main from "../components/template/molecules/main/Main";
import AppContext from "../context/appContext";

const Vaskeliste = () => {
  return (
    <Main>
      <AppContext.Consumer>
        {(context: any) => (
          <ResidentsPage context={context}></ResidentsPage>
        )}
      </AppContext.Consumer>
    </Main>
  );
};

export default Vaskeliste;
