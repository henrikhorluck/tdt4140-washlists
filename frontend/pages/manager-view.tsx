import Main from "../components/template/molecules/main/Main";
import React from "react";
import VillageList from "../components/managerView/molecules/villageList/VillageList";
import AppContext from "../context/appContext";
import { State } from "../context/AppState";

const ManagerView = () => {
  return (
    <Main>
      <AppContext.Consumer>
        {(context: State) => <VillageList context={context}/>}
      </AppContext.Consumer>
    </Main>
  );
};

export default ManagerView;
