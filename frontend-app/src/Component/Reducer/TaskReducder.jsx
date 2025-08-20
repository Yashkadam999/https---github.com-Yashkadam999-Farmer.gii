import React, { useReducer, useState } from 'react';
import MainReducer from './MainReducer';

function TaskReducder() {
  const [todos, dispatch] = useReducer(MainReducer, []);
  const [input, setInput] = useState('');
  const [editInput, setEditInput] = useState('');

  function handleAdd() {
    if (input.trim()) {
      dispatch({ type: 'ADD', payload: input });
      setInput('');
    }
  }

  return (
    <div>
      <h2>Todo App (useReducer)</h2>
      <input
        type="text"
        placeholder="Write your todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <hr />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.isEditing ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE',
                      payload: { id: todo.id, name: editInput },
                    })
                  }
                >
                  Save
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: 'CANCEL', payload: todo.id })
                  }
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {todo.name}
                <button
                  onClick={() => {
                    dispatch({ type: 'EDIT', payload: todo.id });
                    setEditInput(todo.name);
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: 'DELETE', payload: todo.id })
                  }
                >
                  ❌ Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskReducder;
