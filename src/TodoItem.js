import React, { useState } from "react";

function TodoItem({ todo, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(todo.task);

  const handleEdit = () => {
    if (isEditing && newTask.trim() !== "") {
      editTodo(todo.id, newTask);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="todo-input"
        />
      ) : (
        <span className="todo-text">{todo.task}</span>
      )}
      <button className="todo-btn edit-btn" onClick={handleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button className="todo-btn delete-btn" onClick={() => deleteTodo(todo.id)}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
