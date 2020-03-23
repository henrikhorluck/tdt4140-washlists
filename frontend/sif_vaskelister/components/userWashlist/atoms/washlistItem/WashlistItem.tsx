import React, { FC } from "react";
import { Todo } from "./types";

import styles from "./index.module.css";

interface Props {
  todo: Todo;
  id: number;
  completeTodo: (n: number) => void;
  // removeTodo: (n: number) => void;
}
const WashlistItem: FC<Props> = ({
  todo,
  id,
  completeTodo
  // removeTodo
}) => {
  return (
    <div
      style={{ textDecoration: todo.completed ? "line-through" : "" }}
      className={styles.todo}
    >
      {todo.description}
      <div>
        <button
          style={{ visibility: todo.completed ? "hidden" : "visible" }}
          onClick={() => completeTodo(id)}
        >
          {" "}
          Fullført
        </button>
        {/* <button onClick={() => removeTodo(index)}> Slett</button> */}
      </div>
    </div>
  );
};

export default WashlistItem;
