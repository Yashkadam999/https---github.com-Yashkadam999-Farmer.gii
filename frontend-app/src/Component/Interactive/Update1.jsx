import { useState } from 'react';

let nextId = 3;

const initialArtists = [
  { id: 0, name: 'Archelos' },
  { id: 1, name: 'React updating array' },
  { id: 2, name: 'Modification' },
];

export default function UpdatatingArray() {
  const [artist, setArtist] = useState(initialArtists);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null); 
  const [editedName, setEditedName] = useState(''); 

  const handleAdd = () => {
    if (!name.trim()) return;

    const insertAt = 1;
    const updatedArtists = [
      ...artist.slice(0, insertAt),
      { id: nextId++, name },
      ...artist.slice(insertAt),
    ];
    setArtist(updatedArtists);
    setName('');
  };

  const handleDelete = (idToDelete) => {
    setArtist(artist.filter(a => a.id !== idToDelete));
  };

  const handleEdit = (id, currentName) => {
    setEditingId(id);
    setEditedName(currentName);
  };

  const handleSave = (idToUpdate) => {
    setArtist(
      artist.map(a =>
        a.id === idToUpdate ? { ...a, name: editedName } : a
      )
    );
    setEditingId(null);
    setEditedName('');
  };

  return (
    <div>
      <h1>Updating array in state</h1>

      <input
        type="text"
        value={name}
        placeholder="Enter new artist"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {artist.map((iterating) => (
          <li key={iterating.id}>
            {editingId === iterating.id ? (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <button onClick={() => handleSave(iterating.id)}>Save</button>
              </>
            ) : (
              <>
                <p>{iterating.name}</p>
                <button onClick={() => handleEdit(iterating.id, iterating.name)}>Edit</button>
              </>
            )}
            <button onClick={() => handleDelete(iterating.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
