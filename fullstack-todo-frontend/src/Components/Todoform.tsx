// TodoForm.tsx
import React, { useState, FormEvent } from 'react';

interface TodoFormProps {
  onAddTodo: (title: string, description: string) => void;
}

function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onAddTodo(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title"
        className="todo-input"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter todo description"
        className="todo-input"
      />
      <button type="submit" className="todo-submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;