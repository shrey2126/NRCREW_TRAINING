import { useState } from "react";
import "./index.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setState] = useState("");
  const [error, setError] = useState("");

  function addTodo() {
    const val = text.trim();
    if (!val) return setError("Enter a task!");

    if (todos.some((t) => t.toLowerCase() === val.toLowerCase()))
      return setError("Already exists!");

    setTodos([...todos, val]);
    setState("");
    setError("");
  }

  function editTodo(index) {
    const newText = prompt("Edit task:", todos[index]);
    if (!newText) return;

    const trimmed = newText.trim();
    if (!trimmed) return alert("Task cannot be empty!");

    if (
      todos.some(
        (t, i) => i !== index && t.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      return alert("Already exists!");
    }

    const updated = [...todos];
    updated[index] = trimmed;
    setTodos(updated);
  }

  function deleteTodo(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  return (
    <div className="app-container">
      <div className="todo-box">
        <h1 className="heading">⚡My TodoList</h1>

        <div className="input-row">
          <input
            type="text"
            placeholder="What do you want to do?"
            value={text}
            onChange={(e) => setState(e.target.value)}
          />
          <button className="add-btn" onClick={addTodo}>Add</button>
        </div>

        {error && <p className="error">{error}</p>}

        <ul className="todo-list">
          {todos.map((todo, i) => (
            <li key={i} className="todo-item">
              <span>{todo}</span>
              <div className="btn-group">
                <button className="edit" onClick={() => editTodo(i)}>✏️</button>
                <button className="delete" onClick={() => deleteTodo(i)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
