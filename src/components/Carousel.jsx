import { useState, useEffect, useRef } from 'react';
import '../Styles/Carousel.css';


import member1 from '../assets/fotos/alexDiome.jpeg';
import member2 from '../assets/fotos/juanDio.jpeg';
import member3 from '../assets/fotos/Gabriel.jpeg';
import member4 from '../assets/fotos/JairoDiomedes.jpg';
import member5 from '../assets/fotos/LiduDiome.jpeg';
import member6 from '../assets/fotos/Daniel.jpeg';
import member7 from '../assets/fotos/MauricioDiomedes.jpeg';


import video1 from '../assets/videos/Alex.mp4';
import video2 from '../assets/videos/Juan.mp4';
import video3 from '../assets/videos/Gabriel.mp4';
import video4 from '../assets/videos/Guetes.mp4';
import video5 from '../assets/videos/Abuela.mp4';
import video6 from '../assets/videos/Daniel.mp4';
import video7 from '../assets/videos/Mauricio.mp4';

const Carousel = () => {
  const teamMembers = [
    { name: "Alex", role: "Alelectro", video: video1 },
    { name: "Juan", role: "Berserk", video: video2 },
    { name: "Gabriel", role: "Emir", video: video3 },
    { name: "Jairo", role: "Buccanner", video: video4 },
    { name: "?", role: "QUEEN OF QUEENS", video: video5 },
    { name: "Daniel", role: "", video: video6 },
    { name: "Mauricio", role: "Fornai proplayer", video: video7 },
  ];

  const teamImages = [member1, member2, member3, member4, member5, member6, member7];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedMember, setSelectedMember] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const cardRefs = useRef([]);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (currentIndex === 4) { 
        const card = cardRefs.current[4];
        if (card) {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setMousePos({ x, y });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape' && isVideoPlaying) {
        closeVideo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isVideoPlaying]);

  
  useEffect(() => {
    if (videoRef.current && selectedMember) {
      if (isVideoPlaying) {
        videoRef.current.play().catch(error => {
          console.error("Error al reproducir el video:", error);
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isVideoPlaying, selectedMember]);

  const updateCarousel = (newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const adjustedIndex = (newIndex + teamMembers.length) % teamMembers.length;
    setCurrentIndex(adjustedIndex);

    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const handlePrev = () => updateCarousel(currentIndex - 1);
  const handleNext = () => updateCarousel(currentIndex + 1);
  const handleDotClick = (index) => updateCarousel(index);
  const handleCardClick = (index) => {

    if (teamMembers[index].video) {
      setSelectedMember(teamMembers[index]);
      setIsVideoPlaying(true);
    }
  };

  const closeVideo = () => {
    setIsVideoPlaying(false);
    setTimeout(() => {
      setSelectedMember(null);
    }, 300);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const getCardPositionClass = (index) => {
    const totalMembers = teamMembers.length;
    const offset = (index - currentIndex + totalMembers) % totalMembers;
    
    if (offset === 0) return 'center';
    if (offset === 1) return 'right-1';
    if (offset === 2) return 'right-2';
    if (offset === 3) return 'right-3';
    if (offset === totalMembers - 1) return 'left-1';
    if (offset === totalMembers - 2) return 'left-2';
    if (offset === totalMembers - 3) return 'left-3';
    
    return 'hidden';
  };

  return (
    <div className="toolate-carousel-container">
      <h1 className="about-title">TOO LATE</h1>

      <div className="carousel-container">
        <button className="nav-arrow left" onClick={handlePrev}>‹</button>
        
        <div 
          className="carousel-track"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              ref={el => cardRefs.current[index] = el}
              className={`card ${getCardPositionClass(index)} ${index === 4 ? 'queen-card' : ''}`}
              onClick={() => handleCardClick(index)}
              data-index={index}
            >
              <img 
                src={teamImages[index]} 
                alt={`${member.name} - ${member.role}`}
                loading="lazy"
                className={index === 4 ? 'darkened-image' : ''}
              />
              {member.video && <div className="play-icon">▶</div>}
              {index === 4 && (
                <div 
                  className="queen-mask"
                  style={{
                    '--x': `${mousePos.x}px`,
                    '--y': `${mousePos.y}px`
                  }}
                />
              )}
            </div>
          ))}
        </div>
        
        <button className="nav-arrow right" onClick={handleNext}>›</button>
      </div>

      <div className="member-info">
        <h2 className="member-name" style={{ opacity: isAnimating ? 0 : 1 }}>
          {teamMembers[currentIndex].name}
        </h2>
        <p className="member-role" style={{ opacity: isAnimating ? 0 : 1 }}>
          {teamMembers[currentIndex].role}
        </p>
      </div>

      <div className="dots">
        {teamMembers.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            data-index={index}
          />
        ))}
      </div>
      
      {selectedMember && (
        <div className={`video-popup ${isVideoPlaying ? 'active' : ''}`}>
          <div className="video-popup-content">
            <button className="close-video" onClick={closeVideo}>×</button>
            <h3>{selectedMember.name} - {selectedMember.role}</h3>
            <video 
              ref={videoRef}
              controls 
              autoPlay 
              muted
              onEnded={closeVideo}
            >
              <source src={selectedMember.video} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
          <div className="video-popup-overlay" onClick={closeVideo}></div>
        </div>
      )}
    </div>
  );
};

export default Carousel;