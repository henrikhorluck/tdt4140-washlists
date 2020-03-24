import React from "react";
import TemplateList from "../components/washlistTemplate/molecules/TodoListTemplate/TemplateList";
import Main from "../components/template/molecules/main/Main";
import AppContext from "../context/appContext";
import { State } from "../context/AppState";

const WashlistTemplate = () => {
  return (
    <Main>
      <AppContext.Consumer>
        {(context: State) => <TemplateList context={context}/>}
      </AppContext.Consumer>
    </Main>
  );
};

export default WashlistTemplate;
