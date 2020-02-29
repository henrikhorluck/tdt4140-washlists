import TodoListTemplate from "../components/TodoTemplate/molecules/TodoListTemplate/TodoListTemplate";
import Main from "../components/template/Main";
import AppContext from "../context/appContext";

const Vaskeliste = () => {
  return (
    <Main>
      <AppContext.Consumer>
        {(context: any) => <TodoListTemplate context={context}></TodoListTemplate>}
      </AppContext.Consumer>
    </Main>
  );
};

export default Vaskeliste;
