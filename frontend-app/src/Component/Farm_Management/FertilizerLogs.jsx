import React, { useState, useEffect } from 'react';
import './FertilizerLogs.css'; 

const FertilizerLogs = () => {
  const [logs, setLogs] = useState([]);
  const [crop, setCrop] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('fertilizerLogs')) || [];
    setLogs(storedLogs);
  }, []);

  const saveToLocal = (updatedLogs) => {
    localStorage.setItem('fertilizerLogs', JSON.stringify(updatedLogs));
  };

  const handleAddLog = (e) => {
    e.preventDefault();
    const newLog = { id: Date.now(), crop, date, type, quantity, notes };
    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    saveToLocal(updatedLogs);

    setCrop('');
    setDate('');
    setType('');
    setQuantity('');
    setNotes('');
  };

  const handleDelete = (id) => {
    const updatedLogs = logs.filter((log) => log.id !== id);
    setLogs(updatedLogs);
    saveToLocal(updatedLogs);
  };

  return (
    <div className="fertilizer-container">
      <h3 className="fertilizer-title">🌿 Fertilizer & Pesticide Logs</h3>

      <form onSubmit={handleAddLog} className="fertilizer-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="Crop Name"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="Fertilizer">Fertilizer</option>
            <option value="Pesticide">Pesticide</option>
          </select>
          <input
            type="text"
            placeholder="Quantity Used"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <textarea
          placeholder="Additional Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="3"
        />

        <button type="submit" className="add-log-btn">➕ Add Log</button>
      </form>

      <div className="logs-section">
        <h4>📋 All Logs</h4>
        {logs.length === 0 ? (
          <p className="no-logs-msg">No logs added yet.</p>
        ) : (
          <ul className="log-list">
            {logs.map((log) => (
              <li key={log.id} className="log-item">
                <div>
                  <strong>{log.crop}</strong> - {log.type} - {log.date} - {log.quantity}
                  <br />
                  <small>{log.notes}</small>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(log.id)}
                >
                  ❌ Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FertilizerLogs;
