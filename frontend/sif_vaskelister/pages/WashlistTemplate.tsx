import React from 'react';
import TemplateList from "../components/washlistTemplate/molecules/TodoListTemplate/TemplateList";
import Main from "../components/template/molecules/main/Main";
import AppContext from "../context/appContext";

const WashlistTemplate = () => {
  return (
    <Main>
      <AppContext.Consumer>
        {(context: any) => (
          <TemplateList context={context}></TemplateList>
        )}
      </AppContext.Consumer>
    </Main>
  );
};

export default WashlistTemplate;
