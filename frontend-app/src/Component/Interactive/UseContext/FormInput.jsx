// FormInput.js
import React from 'react';
import { useForm } from './FormContext';

export default function FormInput() {
  const { formData, setFormData } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted:\nName: ${formData.name}\nEmail: ${formData.email}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
      /><br /><br />
      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
      /><br /><br />
      <button type="submit">Submit</button>
    </form>
  );
}
