import React, { FC } from "react";
import { TempItem } from "../../../../context/AppState";

import styles from "./index.module.css";

interface Props {
  todo: TempItem;
  id: number;
  // completeTodo: (n: number) => void;
  removeTodo: (n: TempItem) => void;
}
const TemplateItem: FC<Props> = ({
  todo,
  id,
  // completeTodo,
  removeTodo
}) => {
  return (
    <div className={styles.todo}>
      {todo.description}
      <div><button onClick={() => removeTodo(todo)}> Slett</button></div>
    </div>
  );
};

export default TemplateItem;
