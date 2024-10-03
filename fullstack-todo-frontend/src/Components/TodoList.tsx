// src/components/TodoList.tsx
import React, { useState } from 'react';
import { Todo } from '../Entities/Todo';
import EditTodoForm from './EditTodoForm';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onUpdateTodo: (id: number, title: string, description: string) => void;
}

function TodoList({ todos, onToggleComplete, onDeleteTodo, onUpdateTodo }: TodoListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          {editingId === todo.id ? (
            <EditTodoForm
              todo={todo}
              onSave={(id, title, description) => {
                onUpdateTodo(id, title, description);
                setEditingId(null);
              }}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <span>Created: {new Date(todo.createdAt).toLocaleString()}</span>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggleComplete(todo.id)}
                />
                Completed
              </label>
              <button onClick={() => setEditingId(todo.id)}>Edit</button>
              <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;