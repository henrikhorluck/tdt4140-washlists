import React, { FC, useEffect } from "react";

import WashlistAdd from "../../atoms/washlistAdd/WashlistAdd";
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
        {context.todos && context.todos.items
          ? context.todos.items.map((todo: any, index: number) => (
              <WashlistItem
                key={index}
                id={todo.id}
                todo={todo}
                completeTodo={context.completeTodo}
                // removeTodo={context.removeTodo}
              />
            ))
          : null}
        {/* <TodoAdd addTodo={context.addTodo} /> */}
      </div>
    </div>
  );
};

export default Washlist;
