import React from 'react';
import './Loading.css';

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-text">
        {'PGG'.split('').map((letter, index) => (
          <span key={index} className="loading-letter" style={{ animationDelay: `${index * 0.3}s` }}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Loading;
