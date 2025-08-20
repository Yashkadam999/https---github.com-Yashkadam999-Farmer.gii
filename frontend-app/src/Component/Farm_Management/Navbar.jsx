// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-3">
      <Link className="navbar-brand fw-bold" to="/">🌾 Farm System</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/add-crop">Add Crop</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/crop-list">Crop List</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/analytics">Analytics</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/settings">Settings</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/weather">Weather</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/finance">Finance</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/live-market">LiveMarketPrices</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/inventory">Inventory</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/fertilizer">Fertilizer Logs</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
