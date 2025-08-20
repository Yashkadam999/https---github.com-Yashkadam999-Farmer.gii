import React from 'react';
import Children from './Children';
import AlertButton from './AlertButton';

function ToolBar({ onPlayMovie, onPauseMovie }) {
  return (
    <div style={{ background: 'green' }}>
      <Children onClick={onPlayMovie}>Play Movie</Children>
      <Children onClick={onPauseMovie}>Pause Movie</Children>
      <Children>Default Button</Children>
      <AlertButton message="Playing!">
        Play Movie
      </AlertButton>
      <AlertButton message="Uploading!">
        Upload Image
      </AlertButton>
    </div>
    
  );
}

export default ToolBar;
