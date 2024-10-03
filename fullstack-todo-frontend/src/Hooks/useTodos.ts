// useTodos.ts
import { useState, useEffect } from 'react';
import { Todo } from '../Entities/Todo';
import { loadTodos, addTodo, updateTodo, deleteTodo } from '../Services/TodoService';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const loadedTodos = await loadTodos();
      setTodos(loadedTodos);
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (title: string, description: string) => {
    const newTodo = await addTodo(title, description);
    setTodos([...todos, newTodo]);
  };

  const handleUpdateTodo = async (id: number, title: string, description: string) => {
    const updatedTodo = await updateTodo(id, { title, description });
    setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
  };

  const handleToggleComplete = async (id: number) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate) {
      const updatedTodo = await updateTodo(id, { completed: !todoToUpdate.completed });
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    }
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return {
    todos,
    handleAddTodo,
    handleToggleComplete,
    handleDeleteTodo,
    handleUpdateTodo
  };
};