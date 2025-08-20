import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { useAuth } from './AuthContext';

function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>🌾 Welcome to Your Smart Farm</h1>
          <button className="logout-btn" onClick={logout}>🚪 Logout</button>
        </div>
        <p>Manage crops, track weather, monitor finances, and more</p>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>Crops</h2>
            <p>View, add, or remove crop records</p>
            <Link to="/crops"><button>Manage Crops</button></Link>
          </div>

          <div className="dashboard-card">
            <h2>Weather</h2>
            <p>Real-time weather updates for your region</p>
            <Link to="/Weather"><button>View Weather</button></Link>
          </div>

          <div className="dashboard-card">
            <h2>Finance</h2>
            <p>Check revenue, expenses & profits</p>
            <Link to="/finance"><button>Track Finances</button></Link>
          </div>

          <div className="dashboard-card">
            <h2>Analytics</h2>
            <p>Crop yield trends, seasonal performance</p>
            <Link to="/Analytics"><button>View Reports</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
