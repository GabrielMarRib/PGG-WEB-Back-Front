import React from 'react';
import './Loading.css';

function Loading({ erro=false }) {
  return (
    <div className="loading-container">
      <div className="loading-text">
        {erro ? (
          'PGG'.split('').map((letter, index) => (
            <span key={index} className="loading-letter" style={{ animationDelay: `${index * 0.3}s` }}>
              {letter}
            </span>
          ))
        ) : (
          'PGG'.split('').map((letter, index) => (
            <>
            <span key={index} className="loading-letter" style={{ animationDelay: `${index * 0.3}s` }}>
              {letter}
            </span>
            Erro crítico detectado, tente novamente mais tarde
            </>
          )))
        }
      </div>
    </div>
  );
}

export default Loading;