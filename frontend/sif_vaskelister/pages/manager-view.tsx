import Main from "../components/template/molecules/main/Main";
import React from "react";
import DormList from "../components/managerView/molecules/dormList/DormList";
import VillageList from "../components/managerView/molecules/villageList/VillageList";
import AppContext from "../context/appContext";

{/*{(context: any) => <DormList context={context}></DormList>}*/}

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
