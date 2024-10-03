import React from 'react';
import TodoForm from './Components/Todoform';
import TodoList from './Components/TodoList';
import { useTodos } from './Hooks/useTodos';

function App() {
  const { todos, handleAddTodo, handleToggleComplete, handleDeleteTodo, handleUpdateTodo } = useTodos();

  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onToggleComplete={handleToggleComplete}
        onDeleteTodo={handleDeleteTodo}
        onUpdateTodo={handleUpdateTodo}
      />
    </div>
  );
};

export default App;