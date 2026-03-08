import React, { useState, useEffect } from 'react';

const Carousel = ({ items, onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items || items.length === 0) return null;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="carousel-container" style={{ position: 'relative', height: '400px', width: '100%', overflow: 'hidden', borderRadius: '20px', marginBottom: '3rem' }}>
      {items.map((item, index) => (
        <div
          key={item.id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), transparent), url(${item.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10%',
            cursor: 'pointer'
          }}
          onClick={() => onSelect(item)}
        >
          <div style={{ maxWidth: '500px', transform: index === currentIndex ? 'translateX(0)' : 'translateX(-50px)', transition: 'transform 0.8s ease-out' }}>
            <span style={{ background: 'var(--primary-red)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>DAILY FEATURE</span>
            <h2 style={{ fontSize: '3rem', margin: '1rem 0', color: 'white' }}>{item.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{item.health} • Ready in {item.time}</p>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} style={controlStyle('10px')}>‹</button>
      <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} style={controlStyle(null, '10px')}>›</button>

      {/* Indicators */}
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
        {items.map((_, i) => (
          <div
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
            style={{
              width: i === currentIndex ? '30px' : '10px',
              height: '10px',
              background: i === currentIndex ? 'var(--accent-gold)' : 'rgba(255,255,255,0.3)',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

const controlStyle = (left, right) => ({
  position: 'absolute',
  top: '50%',
  left,
  right,
  transform: 'translateY(-50%)',
  background: 'rgba(0,0,0,0.3)',
  border: 'none',
  color: 'white',
  fontSize: '2rem',
  padding: '10px 15px',
  cursor: 'pointer',
  borderRadius: '50%',
  zIndex: 10,
  transition: 'var(--transition)'
});

export default Carousel;
