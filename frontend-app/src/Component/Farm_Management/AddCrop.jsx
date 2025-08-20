import React, { useState } from 'react';
import axios from 'axios';
import './AddCrop.css';

function AddCrop() {
  const [form, setForm] = useState({ name: '', season: '', yield: '', plantedOn: '', image: null });
  const [preview, setPreview] = useState('');

  const handleChange = e => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in form) data.append(key, form[key]);

    try {
      await axios.post('http://localhost:5000/api/crops', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('✅ Crop added!');
      setTimeout(() => {
        setForm({ name: '', season: '', yield: '', plantedOn: '', image: null });
        setPreview('');
      }, 800);
    } catch (err) {
      console.error("❌ Failed:", err.message);
    }
  };

  return (
    <div className="page-background">
      <div className="add-crop-container">
        <h2>Add New Crop</h2>
        <form onSubmit={handleSubmit} className="add-crop-form">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="season" placeholder="Season" value={form.season} onChange={handleChange} />
          <input name="yield" placeholder="Yield" value={form.yield} onChange={handleChange} />
          <input name="plantedOn" type="date" value={form.plantedOn} onChange={handleChange} />
          <input type="file" name="image" accept="image/*" onChange={handleChange} />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="crop-preview"
            />
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddCrop;
