import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Web() {
  const [crops, setCrops] = useState([]);
  const [form, setForm] = useState({ name: '', season: '', yield: '', plantedOn: '' });

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/crops');
      setCrops(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch crops:", err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/crops', form);
      setForm({ name: '', season: '', yield: '', plantedOn: '' });
      fetchCrops();
    } catch (err) {
      console.error("❌ Failed to submit crop:", err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/crops/${id}`);
      fetchCrops();
    } catch (err) {
      console.error("❌ Failed to delete crop:", err.message);
    }
  };

  return (
    <div className="Web">
      <h2>Farm Management - Crop List</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Season" value={form.season} onChange={e => setForm({ ...form, season: e.target.value })} />
        <input type="number" placeholder="Yield" value={form.yield} onChange={e => setForm({ ...form, yield: e.target.value })} />
        <input type="date" value={form.plantedOn} onChange={e => setForm({ ...form, plantedOn: e.target.value })} />
        <button type="submit">Add Crop</button>
      </form>

      <ul>
        {crops.map(crop => (
          <li key={crop._id}>
            {crop.name} ({crop.season}) - {crop.yield}kg
            <button onClick={() => handleDelete(crop._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Web;
