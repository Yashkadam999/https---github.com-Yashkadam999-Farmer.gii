import React from 'react';
import ToolBar from './ToolBar';

function Main() {
  return (
    <div style={{ background: "blue" }}>
      <ToolBar
        onPlayMovie={() => alert('We are Playing')}
        onPauseMovie={() => alert("Paused")}
      />
    </div>
  );
}

export default Main;

