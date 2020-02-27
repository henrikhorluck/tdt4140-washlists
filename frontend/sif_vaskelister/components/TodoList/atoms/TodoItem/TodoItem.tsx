import React, { FC } from "react";
import { Todo } from "./types";

import styles from './index.module.css';

interface Props {
  todo: Todo;
  index: number;
  completeTodo: (n: number) => void;
  removeTodo: (n: number) => void;
}
 const TodoItem: FC<Props> = ({
  todo,
  index,
  completeTodo,
  removeTodo
}) => {
  return (
    <div
      style={{ textDecoration: todo.completed ? "line-through" : "" }}
      className={styles.todo}
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}> Fullført</button>
        <button onClick={() => removeTodo(index)}> Slett</button>
      </div>
    </div>
  );
};

export default TodoItem;