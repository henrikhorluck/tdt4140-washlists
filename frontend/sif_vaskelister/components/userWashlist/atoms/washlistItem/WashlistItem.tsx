import React, { FC } from "react";
import { TodoItem } from "../../../../types/washlist-types";

import styles from "./index.module.css";

interface Props {
  todo: TodoItem;
  id: number;
  completeTodo: (n: number) => void;
}
const WashlistItem: FC<Props> = ({
  todo,
  id,
  completeTodo
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
      </div>
    </div>
  );
};

export default WashlistItem;
