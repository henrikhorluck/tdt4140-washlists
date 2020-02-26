import React, { useState, FC } from "react";

interface Props {
  addTodo: (text: string) => void;
}

export const TodoForm: FC<Props> = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        placeholder="Legg til gjøremål"
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
};

export default TodoForm;
