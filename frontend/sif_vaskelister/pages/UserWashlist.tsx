import React from "react";
import Washlist from "../components/userWashlist/molecules/washlist/Washlist";
import Main from "../components/template/molecules/main/Main";
import AppContext from "../context/appContext";

const Vaskeliste = () => {
  return (
    <Main>
      <AppContext.Consumer>
        {(context: any) => (
          <Washlist context={context}></Washlist>
        )}
      </AppContext.Consumer>
    </Main>
  );
};

export default Vaskeliste;
