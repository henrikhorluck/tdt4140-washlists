import React, { FC, useEffect } from "react";

import TodoAdd from "../../atoms/TodoAdd/TodoAdd";
import WashlistItem from "../../atoms/washlistItem/WashlistItem";

import styles from "./index.module.css";

interface Props {
  context: any;
}

const Washlist: FC<Props> = ({ context }) => {
  useEffect(() => {
    context.getTodoList();
  }, []);

  return (
    <div className={styles.list}>
      <h1>VASKELISTE</h1>
      <div className={styles.todo_list}>
        <p className={styles.desc}>Påkrevde:</p>
        {context.todos && context.todos
          ? context.todos.map((todo: any, index: number) => {
            if(todo.template){
              return (<WashlistItem
                key={index}
                id={todo.id}
                todo={todo}
                completeTodo={context.completeTodo}
                // removeTodo={context.removeTodo}
              />)
            }
          })
          : null}
          <p className={styles.desc}>Egendefinerte:</p>
        {context.todos && context.todos
          ? context.todos.map((todo: any, index: number) => {
            if(!todo.template){
              return (<WashlistItem
                key={index}
                id={todo.id}
                todo={todo}
                completeTodo={context.completeTodo}
                // removeTodo={context.removeTodo}
              />)
            }
          })
          : null}
        <TodoAdd addTodo={context.addTodo} />
      </div>
    </div>
  );
};

export default Washlist;
