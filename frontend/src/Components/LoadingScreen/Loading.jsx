import React from 'react';
import './Loading.css';

function Loading({ erro=false }) {
  return (
    <div className="loading-container">
      <div className="loading-text">
          {'PGG'.split('').map((letter, index) => (
            <span key={index} className="loading-letter" style={{ animationDelay: `${index * 0.3}s` }}>
              {letter}
              {erro && "Erro crítico detectado, tente novamente mais tarde"}
            </span>
          ))}
      </div>
    </div>
  );
}

export default Loading;