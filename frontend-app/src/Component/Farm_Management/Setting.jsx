import React, { useState } from 'react';
import './Setting.css';

export default function Settings() {
  const [farmName, setFarmName] = useState('Green Valley Agro');
  const [farmType, setFarmType] = useState('organic');
  const [farmLocation, setFarmLocation] = useState('Nashik, Maharashtra');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('⚙️ Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <h1>⚙️ User Settings</h1>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="setting-item">
          <label>🌾 Farm Name:</label>
          <input
            type="text"
            value={farmName}
            onChange={(e) => setFarmName(e.target.value)}
            placeholder="e.g., Green Valley Agro"
          />
        </div>

        <div className="setting-item">
          <label>🚜 Farm Type:</label>
          <select value={farmType} onChange={(e) => setFarmType(e.target.value)}>
            <option value="organic">🌿 Organic</option>
            <option value="dairy">🐄 Dairy</option>
            <option value="poultry">🐔 Poultry</option>
            <option value="aquaculture">🐟 Aquaculture</option>
            <option value="horticulture">🌷 Horticulture</option>
          </select>
        </div>

        <div className="setting-item">
          <label>📍 Farm Location:</label>
          <input
            type="text"
            value={farmLocation}
            onChange={(e) => setFarmLocation(e.target.value)}
            placeholder="e.g., Nashik, Maharashtra"
          />
        </div>

        <div className="setting-item toggle">
          <label>🔔 Notifications:</label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </div>

        <div className="setting-actions">
          <button type="submit">Save Settings</button>
        </div>
      </form>

      <div className="settings-summary">
        <h3>📋 Current Settings</h3>
        <p><strong>Farm Name:</strong> {farmName}</p>
        <p><strong>Farm Type:</strong> {farmType}</p>
        <p><strong>Farm Location:</strong> {farmLocation}</p>
        <p><strong>Notifications:</strong> {notificationsEnabled ? 'Enabled' : 'Disabled'}</p>
      </div>
    </div>
  );
}
