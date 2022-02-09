import useTheme from "../hooks/useTheme";
import './ThemeSelector.css'
import modeIcon from '../assets/mode-icon.svg'

import React from 'react';

const themeColors = ['#58249c','#249c6b','#b70233']

export default function ThemeSelector() {
  const {changeColor, changeMode, mode} = useTheme()

  const toggleMode = () => {
    mode === 'dark' ? changeMode('light') : changeMode('dark');
  }

  
  


  return (
    <div className="theme-selector">
      <div className="theme-buttons">
        <div>
          <img
            src={modeIcon}
            onClick={toggleMode}
            alt="dark/light toggle icon"
            style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
          />
        </div>
        {themeColors.map((color) => (
          <div key={color} onClick={() => changeColor(color)} style={{ background: color }} />
        ))}
      </div>
    </div>
  );
}
