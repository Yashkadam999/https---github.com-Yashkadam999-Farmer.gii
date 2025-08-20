import { useState } from 'react';

let initialArtists = [
  { id: 0, name: 'Archelos' },
  { id: 1, name: 'React updating array' },
  { id: 2, name: 'Modification' }
];

function UpdatatingArray() {
  const [artist, setArtist] = useState(initialArtists);

  return (
    <div>
      <h1>Updating array in state</h1>
      <ul>
        {artist.map((iterating) => (
          <li key={iterating.id}>
            <p>{iterating.name}</p>
            <button onClick={() => {
              setArtist(artist.filter(a => a.id !== iterating.id));
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpdatatingArray;
