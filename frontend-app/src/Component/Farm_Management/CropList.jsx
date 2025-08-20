import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CropList.css'; // Make sure this CSS file exists

function CropList() {
  const [crops, setCrops] = useState([]);

  const fetchCrops = async () => {
    const res = await axios.get('http://localhost:5000/api/crops');
    setCrops(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/crops/${id}`);
    fetchCrops();
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  return (
    <div className="crop-container">
      <h2>🌾 Crop List</h2>
      <div className="crop-grid">
        {crops.map(crop => (
          <div className="crop-card" key={crop._id}>
            {crop.imageUrl && <img src={`http://localhost:5000${crop.imageUrl}`} alt="Crop" width="60" />}

            <div className="crop-info">
              <h3>{crop.name}</h3>
              <p><b>Season:</b> {crop.season}</p>
              <p><b>Yield:</b> {crop.yield} kg</p>
              <button className="delete-button" onClick={() => handleDelete(crop._id)}>❌ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CropList;
