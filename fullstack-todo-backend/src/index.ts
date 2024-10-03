import express from 'express';
import cors from 'cors';
import { getDataSource } from './connection';
import { Todo } from './entities/Todo';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use(express.json());

// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const dataSource = await getDataSource();
    const todoRepository = dataSource.getRepository(Todo);
    const todos = await todoRepository.find();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

// Create a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { title, description } = req.body;
    const dataSource = await getDataSource();
    const todoRepository = dataSource.getRepository(Todo);
    const newTodo = new Todo(title, description);
    const savedTodo = await todoRepository.save(newTodo);
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Error creating todo' });
  }
});

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const dataSource = await getDataSource();
    const todoRepository = dataSource.getRepository(Todo);
    const todo = await todoRepository.findOne({ where: { id: parseInt(id) } });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.completed = completed !== undefined ? completed : todo.completed;
    const updatedTodo = await todoRepository.save(todo);
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Error updating todo' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dataSource = await getDataSource();
    const todoRepository = dataSource.getRepository(Todo);
    const result = await todoRepository.delete(id);
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

// Initialize the DataSource before starting the server
getDataSource().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(error => {
  console.error('Error during Data Source initialization', error);
});