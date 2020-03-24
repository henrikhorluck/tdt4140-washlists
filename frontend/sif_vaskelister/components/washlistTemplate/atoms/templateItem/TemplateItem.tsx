import React, { FC } from "react";
import { TempItem } from "../../../../types/washlist-types";

import styles from "./index.module.css";

interface Props {
  todo: TempItem;
  id: number;
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
      <div>
        <button onClick={() => removeTodo(todo)}> Slett</button>
      </div>
    </div>
  );
};

export default TemplateItem;
