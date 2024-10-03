// src/components/EditTodoForm.tsx
import React, { useState } from 'react';
import { Todo } from '../Entities/Todo';

interface EditTodoFormProps {
  todo: Todo;
  onSave: (id: number, title: string, description: string) => void;
  onCancel: () => void;
}

function EditTodoForm({todo, onSave, onCancel}: EditTodoFormProps) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(todo.id, title, description);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditTodoForm;