import React, { useRef, useEffect, useState } from 'react';
import '../Styles/Toolate.css';
import ToolateImg from '../assets/fotos/Toolate.jpg';

const Toolate = () => {
  const textRef = useRef(null);
  const [displayText, setDisplayText] = useState('');
  const fullText = "孤爪研磨";

  useEffect(() => {
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 150);

    return () => clearInterval(typingEffect);
  }, []);

  return (
    <section className="toolate-hero">
      <div 
        className="hero-image" 
        style={{ backgroundImage: `url(${ToolateImg})` }}
      />
      
      <div ref={textRef} className="adaptive-text">
        <h1 className="neon-text">{displayText}</h1>
        <p className="neon-subtext">HAPPY BIRTHDAY</p>
      </div>
    </section>
  );
};

export default Toolate;