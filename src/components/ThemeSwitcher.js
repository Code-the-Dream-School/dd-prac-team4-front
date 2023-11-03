import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './ThemeSwitcher.css';

function ThemeSwitcher() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
    console.log('isDarkTheme:', isDarkTheme);
  };

  return (
    <div>
      <button
        onClick={toggleTheme}
        className={`theme-switch-button ${isDarkTheme ? 'dark' : 'light'}`}
      >
        <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} />
      </button>
    </div>
  );
}

export default ThemeSwitcher;
