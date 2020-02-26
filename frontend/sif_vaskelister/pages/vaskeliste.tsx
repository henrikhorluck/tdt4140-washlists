import React, { useState } from "react";

import "./App.css";

const Todo = ({ todo: any, index: any, completeTodo: any, removeTodo:any }) => {
  return (
    <div
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      className="todo"
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}> Fullført</button>
        <button onClick={() => removeTodo(index)}> Slett</button>
      </div>
    </div>
  );
};

const TodoForm = ({ addTodo.any }) => {
  const [value, setValue] = useState("");

  const handleSubmit = e.any => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Legg til gjøremål"
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
};

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

  const addTodo = (text:string) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>VASKELISTE</h1>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
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
