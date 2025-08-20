import React, { useState } from 'react';
import ColorSwitch from './Interactive/ColorSwitch'

function Color() {
  const colors = ['white', 'lightblue', 'lightgreen', 'lavender', 'lightyellow'];
  const [index, setIndex] = useState(0);

  function handleChangeColor() {
    const nextIndex = (index + 1) % colors.length;
    document.body.style.backgroundColor = colors[nextIndex];
    setIndex(nextIndex);
  }

  return (
    <div>
      <ColorSwitch onChangeColor={handleChangeColor} />
    </div>
  );
}

export default Color;
