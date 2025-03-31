import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    // Initialize state from localStorage
    try {
      const localTodos = localStorage.getItem('todos');
      return localTodos ? JSON.parse(localTodos) : [];
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
      return [];
    }
  });

  // Save to localStorage whenever todos change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  // Add a new task
  const addTodo = (task) => {
    if (!task.trim()) return;
    const newTodos = [...todos, { id: Date.now(), task: task.trim() }];
    setTodos(newTodos);
  };

  // Delete a task
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Edit a task
  const editTodo = (id, newTask) => {
    if (!newTask.trim()) return;
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, task: newTask.trim() } : todo
    ));
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            deleteTodo={deleteTodo} 
            editTodo={editTodo} 
          />
        ))}
      </ul>
    </div>
  );
}

export default App;