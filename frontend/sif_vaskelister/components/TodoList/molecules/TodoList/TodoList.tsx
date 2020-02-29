import React, { FC, useEffect } from "react";

import TodoAdd from "../../atoms/TodoAdd/TodoAdd";
import TodoItem from "../../atoms/TodoItem/TodoItem";

import styles from './index.module.css';

interface Props {
  context:any
}

const TodoList: FC<Props> = ({context}) => {

  useEffect(()=>{
    context.getTodoList()
  }, []);


  return (
    <div className={styles.list}>
      <h1>VASKELISTE</h1>
      <div className={styles.todo_list}>
        {context.todos.map((todo:any, index:number) => (
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            completeTodo={context.completeTodo}
            removeTodo={context.removeTodo}
          />
        ))}
        <TodoAdd addTodo={context.addTodo} />
      </div>
    </div>
  );
};

export default TodoList;
