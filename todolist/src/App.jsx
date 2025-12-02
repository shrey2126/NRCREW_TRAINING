import { useState } from "react";
import "./index.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function addTodo() {
    const val = text.trim();
    if (!val) return setError("Enter a task!");

    if (todos.some((t) => t.text.toLowerCase() === val.toLowerCase()))
      return setError("Already exists!");

    setTodos([...todos, { text: val, completed: false }]);
    setText("");
    setError("");
  }

  function toggleComplete(index) {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  }

  function editTodo(index) {
    const newText = prompt("Edit task:", todos[index].text);
    if (!newText) return;

    const trimmed = newText.trim();
    if (!trimmed) return alert("Task cannot be empty!");

    if (
      todos.some(
        (t, i) =>
          i !== index && t.text.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      return alert("Already exists!");
    }

    const updated = [...todos];
    updated[index].text = trimmed;
    setTodos(updated);
  }

  function deleteTodo(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  return (
    <div className="app-container">
      <div className="todo-box">
        <h1 className="heading">⚡My Todo-List</h1>

        <div className="input-row">
          <input
            type="text"
            placeholder="What do you want to do?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="add-btn" onClick={addTodo}>Add</button>
        </div>

        {error && <p className="error">{error}</p>}

        <ul className="todo-list">
          {todos.map((todo, i) => (
            <li
              key={i}
              className={`todo-item ${todo.completed ? "done" : ""}`}
            >
              <span
                className="todo-text"
                onClick={() => toggleComplete(i)}
              >
                {todo.completed ? "✔ " : ""}{todo.text}
              </span>

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
