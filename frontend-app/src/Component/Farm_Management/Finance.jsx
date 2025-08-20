import React, { useState } from 'react';
import './Finance.css';

function Finance() {
  const [financeData, setFinanceData] = useState({
    revenue: 120000,
    expenses: 80000,
    profit: 40000,
  });

  const [history, setHistory] = useState([
    { revenue: 100000, expenses: 60000, profit: 40000 },
    { revenue: 110000, expenses: 70000, profit: 40000 },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinanceData({
      ...financeData,
      [name]: Number(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHistory([...history, financeData]);
    alert('💾 Data saved locally!');
  };

  return (
    <div className="finance-container">
      <div className="finance-content">
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>💰 Financial Dashboard</h1>

        {/* Editable Form */}
        <form onSubmit={handleSubmit}>
          <div className="finance-summary">
            <div className="card revenue">
              <h3>Revenue</h3>
              <input
                type="number"
                name="revenue"
                value={financeData.revenue}
                onChange={handleChange}
              />
            </div>
            <div className="card expenses">
              <h3>Expenses</h3>
              <input
                type="number"
                name="expenses"
                value={financeData.expenses}
                onChange={handleChange}
              />
            </div>
            <div className="card profit">
              <h3>Profit</h3>
              <input
                type="number"
                name="profit"
                value={financeData.profit}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '8px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* History Table */}
        <h2 style={{ marginTop: '2.5rem', textAlign: 'center' }}>📅 Finance History</h2>
        <table className="finance-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Revenue</th>
              <th>Expenses</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>₹{entry.revenue}</td>
                <td>₹{entry.expenses}</td>
                <td>₹{entry.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Finance;
