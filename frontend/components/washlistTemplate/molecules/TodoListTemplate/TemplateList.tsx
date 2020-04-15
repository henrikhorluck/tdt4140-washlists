import React, { FC, useEffect } from "react";

import TemplateAdd from "../../atoms/templateAdd/TemplateAdd";
import TemplateItem from "../../atoms/templateItem/TemplateItem";

import styles from "./index.module.css";
import Link from "next/link";
import { TempItem } from "../../../../types/washlist-types";
import { State } from "../../../../context/AppState";

interface Props {
  context: State;
}

const TemplateList: FC<Props> = ({ context }) => {
  return (
    <div className={styles.page}>
      <Link href="/manager-view">
        <a>Tilbake</a>
      </Link>
      <div className={styles.list}>
        <h1>VASKELISTEMAL</h1>
        <h3>
          Studentby:{" "}
          {context.template ? context.template.villages[0].name : null}
        </h3>
        <div className={styles.todo_list}>
          {context.template && context.template.template_items
            ? context.template.template_items.map(
              (todo: TempItem, index: number) => (
                <TemplateItem
                  key={index}
                  id={todo.id}
                  todo={todo}
                  // completeTodo={context.completeTodo}
                  removeTodo={context.removeTodo || (() => null)}
                />
              )
            )
            : null}
          <TemplateAdd addTodo={context.addTodoManager || (() => null)}/>
        </div>
      </div>
    </div>
  );
};

export default TemplateList;
