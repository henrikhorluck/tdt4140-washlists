import Main from "../components/template/Main";
import React from "react";
import DormList from "../components/managerView/molecules/DormList";
import AppContext from "../context/appContext";

const Manager = () => {
  return (
    <Main>
      <AppContext.Consumer>
        {(context: any) => <DormList context={context}></DormList>}
      </AppContext.Consumer>
    </Main>
  );
};

export default Manager;
