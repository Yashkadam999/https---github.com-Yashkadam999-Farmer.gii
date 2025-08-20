import React from 'react';

export default function ThemeSwitcher({ isDark, toggleTheme }) {
  return (
    <button className="theme-button" onClick={toggleTheme}>
      Switch to {isDark ? 'Light' : 'Dark'} Mode
    </button>
  );
}
