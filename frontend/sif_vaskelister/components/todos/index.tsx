import React, { useState } from "react";

import TodoForm from "./TodoForm";
import { TodoItem } from "./TodoItem";

import styles from './index.module.css';

const App = () => {
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
    <div className={styles.App}>
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
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
};

export default App;
