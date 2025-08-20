import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import './Analytics.css';

export default function Analytics() {
  const [data, setData] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [chartType, setChartType] = useState('line');
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/crops');
        const formatted = res.data.map(crop => ({
          name: crop.name,
          yield: crop.yield,
          plantedOn: new Date(crop.plantedOn).toLocaleDateString()
        }));
        setData(formatted);
      } catch (err) {
        console.error('Error fetching crop data:', err.message);
      }
    };
    fetchCrops();
  }, []);

  const filteredData = filterDate
    ? data.filter(crop => new Date(crop.plantedOn) >= new Date(filterDate))
    : data;

  const handleDownload = async () => {
    if (!chartRef.current) return;
    const canvas = await html2canvas(chartRef.current);
    const link = document.createElement('a');
    link.download = 'crop-analytics.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="analytics-container">
      <h2>📊 Crop Yield Analytics</h2>

      <div className="control-panel box-panel">
        <div className="control-row">
          <label>
            Filter crops planted after:
            <input type="date" onChange={(e) => setFilterDate(e.target.value)} />
          </label>

          <button onClick={handleDownload}>📥 Download Chart</button>
          <button onClick={() => setChartType(chartType === 'line' ? 'bar' : 'line')}>
            Switch to {chartType === 'line' ? 'Bar' : 'Line'} Chart
          </button>
        </div>
      </div>

      <div className="box-panel stats-panel">
        <div>🌱 Total Crops: {filteredData.length}</div>
        <div>🏆 Max Yield: {Math.max(...filteredData.map(c => c.yield), 0)}</div>
      </div>

      <div className="chart-panel box-panel" ref={chartRef}>
        {filteredData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            {chartType === 'line' ? (
              <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="yield" stroke="#66ff66" strokeWidth={2} />
                <Line
                  type="monotone"
                  dataKey={() =>
                    filteredData.reduce((sum, d) => sum + d.yield, 0) / filteredData.length
                  }
                  stroke="#ff6666"
                  dot={false}
                  name="Average Yield"
                />
              </LineChart>
            ) : (
              <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Bar dataKey="yield" fill="#3399ff" />
              </BarChart>
            )}
          </ResponsiveContainer>
        ) : (
          <p className="loading-text">Loading data...</p>
        )}
      </div>
    </div>
  );
}
