import React from 'react';

function Recipes({ id, name, ingredients }) {
  return (
    <div key={id}>
      <h2>{name}</h2>
      <ul>
        {ingredients.map((ingre, index) => (
          <li key={index}>{ingre}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recipes;
