import React, { FC, useEffect } from "react";
import Router from "next/router";

import TemplateAdd from "../../atoms/templateAdd/TemplateAdd";
import TemplateItem from "../../atoms/templateItem/TemplateItem";

import styles from "./index.module.css";

interface Props {
  context: any;
}

const TemplateList: FC<Props> = ({ context }) => {
  return (
    <div className={styles.page}>
      <button
        className={styles.button}
        type="button"
        onClick={() => {
          Router.push("/manager-view");
        }}
      >
        <p>Tilbake</p>
      </button>
      <div className={styles.list}>
        <h1>VASKELISTEMAL</h1>
        <h3>
          Studentby: {context.template ? context.template.villages[0].name : null}
        </h3>
        <div className={styles.todo_list}>
          {context.template && context.template.template_items
            ? context.template.template_items.map((todo: any, index: number) => (
                <TemplateItem
                  key={index}
                  id={todo.id}
                  todo={todo}
                  // completeTodo={context.completeTodo}
                  removeTodo={context.removeTodo}
                />
              ))
            : null}
          <TemplateAdd addTodo={context.addTodo} />
        </div>
      </div>
    </div>
  );
};

export default TemplateList;
