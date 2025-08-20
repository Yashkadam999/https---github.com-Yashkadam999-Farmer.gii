import React from 'react';

function Children({ onClick, children }) {
  return (
    <div style={{ background: "red" }}>
      <button onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default Children;
