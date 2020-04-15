import React, { FC, useEffect } from "react";

import TodoAdd from "../../atoms/TodoAdd/TodoAdd";
import WashlistItem from "../../atoms/washlistItem/WashlistItem";

import styles from "./index.module.css";
import { State } from "../../../../context/AppState";
import { TodoItem } from "../../../../types/washlist-types";

interface Props {
  context: State;
}

const Washlist: FC<Props> = ({ context: { addTodo, completeTodo, getTodoList, todos } }) => {
  useEffect(() => {
    getTodoList && getTodoList();
  }, []);

  return <div className={styles.list}>
    <h1>VASKELISTE</h1>
    <div className={styles.todo_list}>
      <p className={styles.desc}>Påkrevde:</p>
      {todos && todos
        ? todos.map((todo: TodoItem, index: number) => {
          if (todo.template) {
            return (<WashlistItem
              key={index}
              id={todo.id}
              todo={todo}
              completeTodo={completeTodo}
              // removeTodo={context.removeTodo}
            />)
          }
        })
        : null}
      <p className={styles.desc}>Egendefinerte:</p>
      {todos && todos
        ? todos.map((todo: TodoItem, index: number) => {
          if (!todo.template) {
            return (<WashlistItem
              key={index}
              id={todo.id}
              todo={todo}
              completeTodo={completeTodo}
              // removeTodo={context.removeTodo}
            />)
          }
        })
        : null}
      <TodoAdd addTodo={addTodo || (() => null)}/>
    </div>
  </div>;
};

export default Washlist;
