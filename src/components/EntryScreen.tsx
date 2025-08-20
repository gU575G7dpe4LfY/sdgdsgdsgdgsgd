import React, { useState, useEffect } from 'react';

interface EntryScreenProps {
  onEnter: () => void;
}

export const EntryScreen: React.FC<EntryScreenProps> = ({ onEnter }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hackText, setHackText] = useState('ENTRER');

  // Caractères optimisés pour l'effet hack
  const hackChars = ['█', '▓', '▒', '░', '0', '1', 'X', '#'];

  // Effet hack au hover
  useEffect(() => {
    if (isHovered) {
      const hackInterval = setInterval(() => {
        const originalText = 'ENTRER';
        let hackedText = '';
        
        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() < 0.2) {
            hackedText += hackChars[Math.floor(Math.random() * hackChars.length)];
          } else {
            hackedText += originalText[i];
          }
        }
        
        setHackText(hackedText);
      }, 100);

      return () => {
        clearInterval(hackInterval);
        setHackText('ENTRER');
      };
    }
  }, [isHovered]);

  const handleClick = () => {
    setIsClicked(true);
    // Transition optimisée
    setTimeout(() => {
      onEnter();
    }, 400);
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
      {/* Effet de transition optimisé lors du clic */}
      {isClicked && (
        <>
          {/* Pluie de code Matrix réduite */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute text-red-400/80 font-mono text-sm animate-matrix-rain"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              >
                {['0', '1', 'X', '#'][Math.floor(Math.random() * 4)]}
              </div>
            ))}
          </div>
          
          {/* Effet de scan optimisé */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-full h-1 bg-red-400/60 animate-scan-transition" />
          </div>
          
          {/* Effet de dissolution optimisé */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-400/5 to-transparent animate-matrix-dissolve pointer-events-none" />
        </>
      )}

      {/* Bouton ENTRER optimisé */}
      <div className="relative z-10">
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={isClicked}
          className={`
            relative group px-8 py-4 bg-black/50 backdrop-blur-sm
            border border-red-400/50 rounded
            text-red-400 font-mono font-bold text-2xl tracking-[0.4em]
            transition-all duration-500 ease-out
            active:scale-95
            ${isClicked ? 'animate-matrix-button-disappear' : ''}
            ${isHovered ? 'text-white scale-105 border-red-400/80' : ''}
          `}
          style={{
            textShadow: isHovered 
              ? '0 0 15px #ffffff, 0 0 30px #FF0041' 
              : '0 0 10px #FF0041, 0 0 20px #FF0041'
          }}
        >
          {/* Effet de fond au hover optimisé */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/5 via-red-400/10 to-red-400/5 
                           blur-sm pointer-events-none rounded" />
          )}

          {/* Particules d'énergie réduites */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-red-400/70 rounded-full animate-energy-particles"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${1.5}s`
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Texte optimisé */}
          <span className={`
            relative z-10 transition-all duration-500 ease-out
            ${isHovered ? 'text-white' : 'text-red-400'}
            ${isHovered ? 'animate-hack-glitch-smooth' : ''}
          `}>
            {hackText}
          </span>
        </button>
      </div>
    </div>
  );
};