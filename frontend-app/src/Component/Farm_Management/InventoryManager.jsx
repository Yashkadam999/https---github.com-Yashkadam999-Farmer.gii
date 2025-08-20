import React, { useState, useEffect } from 'react';

const InventoryManager = () => {
  const [inventory, setInventory] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQty, setItemQty] = useState('');
  const [itemType, setItemType] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('inventory')) || [];
    setInventory(saved);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('inventory', JSON.stringify(items));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newItem = { id: Date.now(), name: itemName, quantity: itemQty, type: itemType };
    const updatedInventory = [...inventory, newItem];
    setInventory(updatedInventory);
    saveToLocalStorage(updatedInventory);
    setItemName('');
    setItemQty('');
    setItemType('');
  };

  const handleDelete = (id) => {
    const updatedInventory = inventory.filter((item) => item.id !== id);
    setInventory(updatedInventory);
    saveToLocalStorage(updatedInventory);
  };

  return (
    <div>
      <h2>📦 Inventory Manager</h2>
      <form onSubmit={handleAdd}>
        <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        <input type="number" placeholder="Quantity" value={itemQty} onChange={(e) => setItemQty(e.target.value)} required />
        <input type="text" placeholder="Type (e.g. tool, seed)" value={itemType} onChange={(e) => setItemType(e.target.value)} required />
        <button type="submit">Add Item</button>
      </form>

      <ul style={{ marginTop: '20px' }}>
        {inventory.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.quantity} ({item.type}) &nbsp;
            <button onClick={() => handleDelete(item.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryManager;
