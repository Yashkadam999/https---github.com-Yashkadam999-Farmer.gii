import React, { useEffect, useState } from 'react';
import './LiveMarketPrices.css';

const LiveMarketPrices = () => {
  const [prices, setPrices] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/market-prices')
      .then(res => res.json())
      .then(data => {
        setPrices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch prices:', err);
        setLoading(false);
      });
  };

  const filteredPrices = prices.filter(item =>
    item.crop.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="market-container">
      <div className="market-header">
        <h2>🌾 Live Market Prices</h2>
        <div className="market-controls">
          <input
            type="text"
            placeholder="Search crop..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={fetchData}>🔄 Refresh</button>
        </div>
      </div>

      {loading ? (
        <div className="market-status">⏳ Loading market prices...</div>
      ) : filteredPrices.length === 0 ? (
        <div className="market-status error">❌ No crops found.</div>
      ) : (
        <div className="market-grid">
          {filteredPrices.map((item, index) => (
            <div key={index} className="market-card">
              <h3>{item.crop}</h3>
              <p><strong>Market:</strong> {item.market}</p>
              <p className="price">₹{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveMarketPrices;
