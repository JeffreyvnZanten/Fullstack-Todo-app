// todoService.ts
import axios from 'axios';
import { Todo } from '../Entities/Todo';

const API_URL = 'http://localhost:3000/api';

export const loadTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(`${API_URL}/todos`);
  return response.data;
};

export const addTodo = async (title: string, description: string): Promise<Todo> => {
  const response = await axios.post<Todo>(`${API_URL}/todos`, { title, description });
  return response.data;
};

export const updateTodo = async (id: number, updates: Partial<Todo>): Promise<Todo> => {
  const response = await axios.put<Todo>(`${API_URL}/todos/${id}`, updates);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/todos/${id}`);
};