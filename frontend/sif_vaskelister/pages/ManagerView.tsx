import Main from "../components/template/molecules/main/Main";
import React from "react";
import DormList from "../components/managerView/molecules/DormList";
import AppContext from "../context/appContext";

const ManagerView = () => {
  return (
    <Main>
      <AppContext.Consumer>
        {(context: any) => <DormList context={context}></DormList>}
      </AppContext.Consumer>
    </Main>
  );
};

export default ManagerView;
