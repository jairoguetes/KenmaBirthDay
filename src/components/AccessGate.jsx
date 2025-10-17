import { useState, useEffect } from 'react';
import '../Styles/AccessGate.css';

const AccessGate = ({ onAccessGranted }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const container = document.querySelector('.stars-container');
    if (!container) return;

    container.innerHTML = '';
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${Math.random() * 2 + 1}px`;
      star.style.height = star.style.width;
      star.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(star);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '孤爪研磨') {
      onAccessGranted(name.trim());
    } else {
      setError('どうして自分の名前を知らないんですか、孤爪研磨さん？');
    }
  };

  return (
    <div className="access-gate">
      <div className="stars-container"></div>
      
      <div className="access-container">
        <h1>ケンマ専用</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="名前を入力"
              required
              autoFocus
            />
            <button type="submit">認証する</button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AccessGate;