import React, { useEffect, useState } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = () => {
    if (!task.trim()) return;

    fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    })
      .then(res => res.json())
      .then(newTodo => {
        setTodos(prev => [...prev, newTodo]);
        setTask('');
      });
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📝 Todo List</h2>
      <input
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
