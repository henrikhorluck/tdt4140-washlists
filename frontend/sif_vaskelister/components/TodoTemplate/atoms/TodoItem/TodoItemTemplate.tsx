import React, { FC } from "react";
import { Todo } from "./types";

import styles from './index.module.css';

interface Props {
  todo: Todo;
  id: number;
  // completeTodo: (n: number) => void;
  // removeTodo: (n: number) => void;
}
 const TodoItemTemplate: FC<Props> = ({
  todo,
  id,
  // completeTodo,
  // removeTodo
}) => {
  return (
    <div
      className={styles.todo}
    >
      {todo.desc}
      <div>
        {/* <button onClick={() => removeTodo(id)}> Slett</button> */}
      </div>
    </div>
  );
};

export default TodoItemTemplate;