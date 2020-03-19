import Main from "../components/template/molecules/main/Main";
import React from "react";
import VillageList from "../components/managerView/molecules/villageList/VillageList";
import AppContext from "../context/appContext";


const ManagerView = () => {
  return (
    <Main>
      <AppContext.Consumer>
        {(context: any) => <VillageList context={context}></VillageList>}
      </AppContext.Consumer>
    </Main>
  );
};

export default ManagerView;
