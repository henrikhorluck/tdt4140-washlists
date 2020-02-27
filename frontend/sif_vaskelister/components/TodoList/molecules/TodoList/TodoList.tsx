import React, { useState } from "react";

import TodoAdd from "../../atoms/TodoAdd/TodoAdd";
import TodoItem from "../../atoms/TodoItem/TodoItem";

import styles from './index.module.css';

const TodoList = () => {
  const [todos, setTodos] = useState([
    {
      text: "Vaske bad",
      completed: false
    },
    {
      text: "Vaske gulv",
      completed: false
    },
    {
      text: "Vaske stue",
      completed: false
    }
  ]);

  const addTodo = (text: string) => {
    const newTodos = [...todos, { text: text, completed: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = true;
    setTodos(newTodos);
  };

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className={styles.list}>
      <h1>VASKELISTE</h1>
      <div className={styles.todo_list}>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoAdd addTodo={addTodo} />
      </div>
    </div>
  );
};

export default TodoList;
