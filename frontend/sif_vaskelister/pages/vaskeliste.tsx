import TodoList from "../components/TodoList/molecules/TodoList/TodoList";
import Main from "../components/template/Main";
import AppContext from "../context/appContext";

const Vaskeliste = () => {
  return (
    <Main>
      <AppContext.Consumer>
        {(context: any) => <TodoList context={context}></TodoList>}
      </AppContext.Consumer>
    </Main>
  );
};

export default Vaskeliste;
