import { useState, useEffect } from 'react';
import Toolate from './components/Toolate';
import AccessGate from './components/AccessGate';
import Carousel from './components/Carousel';
import JapanesePoems from './components/JapanesePoems';
import DarkToolate from './components/dark/DarkToolate';
import DarkLain from './components/dark/DarkLain';
import DarkGuts from './components/dark/DarkGuts';
import Griffith from './components/Griffith';

import './Styles/Styles.css';

function App() {
  const [userName, setUserName] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  if (!userName) {
    return <AccessGate onAccessGranted={setUserName} />;
  }

  return (
    <div className={`App ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      <button 
        className="theme-toggle"
        onClick={toggleDarkMode}
        aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        {darkMode ? '光' : '闇'}
      </button>

      {darkMode ? (
        <>
          <DarkToolate />
          <DarkGuts />
          <DarkLain />
        </>
      ) : (
        <>
          <Toolate />
          <JapanesePoems userName={userName} />
          <Griffith />
          <Carousel />
        </>
      )}
    </div>
  );
}

export default App;