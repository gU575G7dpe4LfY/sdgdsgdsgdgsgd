import React, { useState, useEffect, useMemo } from 'react';

export const MatrixText: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [hackGlitch, setHackGlitch] = useState(false);
  const [scanlinePosition, setScanlinePosition] = useState(0);
  const [intenseGlitch, setIntenseGlitch] = useState(false);
  const [superGlitch, setSuperGlitch] = useState(false);
  const targetText = 'MATRIX';

  // Caractères de glitch optimisés (réduits pour les performances)
  const glitchChars = useMemo(() => ['█', '▓', '▒', '░', '0', '1', 'X', '#', '@', '$', '%', '&'], []);
  const [glitchText, setGlitchText] = useState('');
  const [currentGlitchText, setCurrentGlitchText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    let glitchInterval: NodeJS.Timeout;
    let typingInterval: NodeJS.Timeout;
    let cursorInterval: NodeJS.Timeout;
    let scanlineInterval: NodeJS.Timeout;
    
    // Glitch optimisé pendant la frappe (moins fréquent)
    glitchInterval = setInterval(() => {
      if (currentIndex <= targetText.length) {
        const currentText = targetText.slice(0, currentIndex);
        const glitched = currentText.split('').map(char => 
          Math.random() < 0.2 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
        ).join('');
        setCurrentGlitchText(glitched);
        
        // Glitch intense réduit
        if (Math.random() < 0.1) {
          setIntenseGlitch(true);
          setTimeout(() => setIntenseGlitch(false), 50);
        }
        
        // Super glitch très occasionnel
        if (Math.random() < 0.05) {
          setSuperGlitch(true);
          setTimeout(() => setSuperGlitch(false), 30);
        }
      }
    }, 150); // Moins fréquent pour les performances
    
    typingInterval = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setDisplayText(targetText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(glitchInterval);
        clearInterval(typingInterval);
        setIsComplete(true);
        
        // Effets de glitch périodiques optimisés
        const startGlitchCycle = () => {
          // Glitch réduit
          setTimeout(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 100);
          }, 500 + Math.random() * 1000);
          
          // Hack glitch moins fréquent
          setTimeout(() => {
            setHackGlitch(true);
            const glitched = targetText.split('').map(char => 
              Math.random() < 0.3 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
            ).join('');
            setGlitchText(glitched);
            
            setTimeout(() => {
              setHackGlitch(false);
              setGlitchText('');
            }, 150);
          }, 1000 + Math.random() * 2000);
          
          // Glitch intense moins fréquent
          setTimeout(() => {
            setIntenseGlitch(true);
            setTimeout(() => setIntenseGlitch(false), 80);
          }, 800 + Math.random() * 1500);
          
          // Super glitch très occasionnel
          setTimeout(() => {
            setSuperGlitch(true);
            setTimeout(() => setSuperGlitch(false), 50);
          }, 2000 + Math.random() * 4000);
          
          setTimeout(startGlitchCycle, 5000); // Cycle plus long
        };
        
        startGlitchCycle();
      }
    }, 150); // Vitesse de frappe optimisée

    // Animation du curseur optimisée
    cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Animation de la ligne de scan optimisée
    scanlineInterval = setInterval(() => {
      setScanlinePosition(prev => (prev + 1) % 100);
    }, 50); // Moins fréquent

    return () => {
      clearInterval(glitchInterval);
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
      clearInterval(scanlineInterval);
    };
  }, [glitchChars, targetText]);

  // Glitch optimisé après completion
  useEffect(() => {
    if (isComplete) {
      const continuousPostGlitch = setInterval(() => {
        const glitched = targetText.split('').map(char => 
          Math.random() < 0.1 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
        ).join('');
        setCurrentGlitchText(glitched);
        
        // Effets intenses réduits
        if (Math.random() < 0.08) {
          setIntenseGlitch(true);
          setTimeout(() => setIntenseGlitch(false), 60);
        }
        
        if (Math.random() < 0.04) {
          setSuperGlitch(true);
          setTimeout(() => setSuperGlitch(false), 40);
        }
      }, 200); // Moins fréquent

      return () => clearInterval(continuousPostGlitch);
    }
  }, [isComplete, glitchChars, targetText]);

  return (
    <div className="absolute top-8 left-8 select-none z-20">
      <div className="relative will-change-transform">
        {/* Ligne de scan optimisée */}
        <div 
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-red-400/60 to-transparent
                     blur-sm pointer-events-none transition-all duration-75 ease-linear"
          style={{
            top: `${scanlinePosition}%`,
            opacity: Math.sin(scanlinePosition * 0.1) * 0.5 + 0.5
          }}
        />
        
        {/* Effet de distorsion optimisé */}
        {hackGlitch && (
          <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 via-transparent to-red-400/10
                         blur-sm pointer-events-none" />
        )}

        {/* Texte principal optimisé */}
        <div className="relative z-10">
          {/* Ombre portée optimisée */}
          <h1 className="absolute top-0 left-0 text-4xl md:text-5xl
                         font-bold font-mono text-red-400/10 blur-sm
                         tracking-[0.15em] transform scale-105 will-change-transform">
            {hackGlitch ? glitchText : displayText}
          </h1>
          
          {/* Texte principal optimisé */}
          <h1 className={`text-4xl md:text-5xl
                         font-bold font-mono text-white
                         tracking-[0.15em] transform transition-all duration-200 ease-out
                         will-change-transform
                         ${isComplete ? 'text-shadow-glow' : ''}
                         ${glitchActive ? 'animate-matrix-glitch-smooth' : ''}
                         ${hackGlitch ? 'animate-hack-glitch-smooth' : ''}`}
                style={{
                  textShadow: '0 0 10px #FF0041, 0 0 20px #FF0041',
                  filter: 'drop-shadow(0 0 15px rgba(255,0,65,0.5))'
                }}>
            {(hackGlitch ? glitchText : displayText).split('').map((char, index) => (
              <span
                key={index}
                className="inline-block transition-all duration-100 ease-out will-change-transform"
                style={{
                  transform: hackGlitch && Math.random() < 0.3 
                    ? `translateY(${(Math.random() - 0.5) * 4}px) skewX(${(Math.random() - 0.5) * 10}deg)` 
                    : 'none'
                }}
              >
                {char}
              </span>
            ))}
            
            {/* Curseur optimisé */}
            <span className={`inline-block ml-1 transition-all duration-300 ease-in-out
                             ${showCursor ? 'opacity-100 scale-100' : 'opacity-30 scale-75'}
                             ${superGlitch ? 'text-red-400' :
                               intenseGlitch ? 'text-white' :
                               'text-red-400'} will-change-transform`}
                  style={{
                    textShadow: superGlitch ? '0 0 15px #FF0041' :
                                intenseGlitch ? '0 0 12px #FFFFFF' :
                                '0 0 10px #FF0041, 0 0 20px #FF0041'
                  }}>
              ▊
            </span>
          </h1>

          {/* Highlight optimisé */}
          <div className="absolute -top-1 left-0 w-full h-px 
                          bg-gradient-to-r from-transparent via-red-400/30 to-transparent
                          blur-sm opacity-30" />
        </div>
        
        {/* Aura optimisée */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                       w-40 h-20 blur-2xl pointer-events-none will-change-transform
                       ${superGlitch ? 'bg-gradient-radial from-red-400/10 via-red-400/5 to-transparent' :
                         intenseGlitch ? 'bg-gradient-radial from-white/8 via-red-400/5 to-transparent' :
                         'bg-gradient-radial from-red-400/5 via-red-400/2 to-transparent'}`} />

        {/* Particules optimisées */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(superGlitch ? 6 : intenseGlitch ? 4 : 3)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full blur-sm will-change-transform
                         ${superGlitch ? 'w-1 h-1 bg-red-400/60' :
                           intenseGlitch ? 'w-0.5 h-0.5 bg-white/50' :
                           'w-0.5 h-0.5 bg-red-400/40'}`}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                transform: `translateY(${Math.sin(Date.now() * 0.001 + i) * 5}px)`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};