import React, { useEffect, useRef } from 'react';
import { VideoBackground } from './components/VideoBackground';
import { MatrixText } from './components/MatrixText';
import { EntryScreen } from './components/EntryScreen';
import { ServicesPage } from './components/ServicesPage';

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const [showEntry, setShowEntry] = React.useState(true);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [showServices, setShowServices] = React.useState(false);
  const [isTransitioningToServices, setIsTransitioningToServices] = React.useState(false);
  const [matrixTransition, setMatrixTransition] = React.useState(false);
  const [scanlineActive, setScanlineActive] = React.useState(false);
  const [glitchOverlay, setGlitchOverlay] = React.useState(false);
  const [showJailbreak, setShowJailbreak] = React.useState(false);
  const [isTransitioningToJailbreak, setIsTransitioningToJailbreak] = React.useState(false);

  useEffect(() => {
    // Activation optimisée du son
    const enableAudio = async () => {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const audioContext = new AudioContext();
          if (audioContext.state === 'suspended') {
            await audioContext.resume();
          }
        }
      } catch (error) {
        console.log('Audio setup:', error);
      }
    };

    enableAudio();
  }, []);

  const handleEnter = () => {
    setIsTransitioning(true);
    // Transition optimisée
    setTimeout(() => {
      setShowEntry(false);
      setIsTransitioning(false);
    }, 800);
  };

  const handleServicesClick = () => {
    // Démarrer la séquence de transition Matrix
    setIsTransitioningToServices(true);
    setMatrixTransition(true);
    
    // Phase 1: Effet de glitch initial
    setTimeout(() => {
      setGlitchOverlay(true);
    }, 100);
    
    // Phase 2: Activation des scanlines
    setTimeout(() => {
      setScanlineActive(true);
    }, 300);
    
    // Phase 3: Transition finale vers la page services
    setTimeout(() => {
      setShowServices(true);
      setIsTransitioningToServices(false);
      setMatrixTransition(false);
      setScanlineActive(false);
      setGlitchOverlay(false);
    }, 1500);
  };

  const handleBackToMain = () => {
    setIsTransitioningToServices(true);
    setTimeout(() => {
      setShowServices(false);
      setIsTransitioningToServices(false);
    }, 800);
  };

  const handleJailbreakClick = () => {
    // Démarrer la séquence de transition Matrix
    setIsTransitioningToJailbreak(true);
    setMatrixTransition(true);
    
    // Phase 1: Effet de glitch initial
    setTimeout(() => {
      setGlitchOverlay(true);
    }, 100);
    
    // Phase 2: Activation des scanlines
    setTimeout(() => {
      setScanlineActive(true);
    }, 300);
    
    // Phase 3: Transition finale vers la page jailbreak
    setTimeout(() => {
      setShowJailbreak(true);
      setIsTransitioningToJailbreak(false);
      setMatrixTransition(false);
      setScanlineActive(false);
      setGlitchOverlay(false);
    }, 1500);
  };

  const handleBackFromJailbreak = () => {
    setIsTransitioningToJailbreak(true);
    setTimeout(() => {
      setShowJailbreak(false);
      setIsTransitioningToJailbreak(false);
    }, 800);
  };

  const videoUrl = "/TikDownloader.io_7294631664083275013_hd.mp4";

  if (showEntry) {
    return (
      <>
        <EntryScreen onEnter={handleEnter} />
        {/* Transition overlay optimisée */}
        <div className={`
          fixed inset-0 z-40 pointer-events-none
          transition-all duration-800 ease-out
          ${isTransitioning 
            ? 'bg-gradient-to-b from-red-400/10 via-black to-red-400/10 opacity-0 scale-105' 
            : 'bg-black opacity-100 scale-100'}
        `} />
      </>
    );
  }

  if (showJailbreak) {
    return (
      <>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-mono text-red-400 mb-8 tracking-[0.1em]"
                style={{ textShadow: '0 0 20px #FF0041, 0 0 40px #FF0041' }}>
              JAILBREAK GROK
            </h1>
            <p className="text-white text-lg font-mono mb-8">Page en construction...</p>
            <button
              onClick={handleBackFromJailbreak}
              className="px-8 py-4 bg-black/60 backdrop-blur-sm border border-red-400/50 rounded-lg
                        text-red-400 font-mono font-bold tracking-wide
                        transition-all duration-300 ease-out
                        hover:text-white hover:scale-105 hover:border-red-400/80"
            >
              Retour
            </button>
          </div>
        </div>
        <div className={`
          fixed inset-0 z-40 pointer-events-none
          transition-all duration-800 ease-out
          ${isTransitioningToJailbreak 
            ? 'bg-gradient-to-r from-red-400/20 via-black to-red-400/20 opacity-0' 
            : 'bg-transparent opacity-100'}
        `} />
      </>
    );
  }

  if (showServices) {
    return (
      <>
        <ServicesPage onBack={handleBackToMain} />
        <div className={`
          fixed inset-0 z-40 pointer-events-none
          transition-all duration-800 ease-out
          ${isTransitioningToServices 
            ? 'bg-gradient-to-r from-red-400/20 via-black to-red-400/20 opacity-0' 
            : 'bg-transparent opacity-100'}
        `} />
      </>
    );
  }

  return (
    <div 
      ref={appRef}
      className={`
        min-h-screen bg-black overflow-hidden relative antialiased professional-shadow gpu-accelerated
        transition-all duration-800 ease-out
        ${isTransitioning ? 'opacity-0 scale-98' : 'opacity-100 scale-100'}
        ${matrixTransition ? 'filter blur-sm brightness-150 contrast-200' : ''}
      `}
    >
      <VideoBackground videoUrl={videoUrl} />
      
      {/* Overlay optimisé pour le contraste */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 pointer-events-none z-5" />
      
      {/* Overlay de transition Matrix */}
      {matrixTransition && (
        <>
          {/* Pluie de code Matrix intensive */}
          <div className="absolute inset-0 pointer-events-none z-40">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute text-cyan-400 font-mono font-bold animate-matrix-rain"
                style={{
                  left: `${Math.random() * 100}%`,
                  fontSize: `${12 + Math.random() * 8}px`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${0.8 + Math.random() * 0.4}s`,
                  textShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF'
                }}
              >
                {['0', '1', 'X', '#', '█', '▓', '▒', '░', 'MATRIX', 'HACK', 'CODE'][Math.floor(Math.random() * 11)]}
              </div>
            ))}
          </div>
          
          {/* Effet de glitch overlay */}
          {glitchOverlay && (
            <div className="absolute inset-0 pointer-events-none z-45">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-transparent to-cyan-400/20 animate-hack-glitch-intense" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-matrix-glitch-smooth" />
              
              {/* Lignes de glitch horizontales */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full bg-cyan-400/30 animate-hack-glitch-smooth"
                  style={{
                    height: `${2 + Math.random() * 4}px`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.05}s`,
                    filter: 'blur(1px)'
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Scanlines multiples */}
          {scanlineActive && (
            <div className="absolute inset-0 pointer-events-none z-50">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-transition"
                  style={{
                    height: `${1 + i}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.6s',
                    opacity: 1 - (i * 0.15),
                    filter: `blur(${i * 0.5}px)`,
                    boxShadow: `0 0 ${10 + i * 5}px #00FFFF`
                  }}
                />
              ))}
              
              {/* Scanlines verticales */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute h-full bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent"
                  style={{
                    width: '2px',
                    left: `${20 + i * 30}%`,
                    animationDelay: `${0.2 + i * 0.1}s`,
                    animation: 'scan-transition 0.8s ease-out',
                    transform: 'rotate(90deg)',
                    transformOrigin: 'center',
                    filter: 'blur(1px)',
                    boxShadow: '0 0 15px #00FFFF'
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Effet de dissolution Matrix */}
          <div className="absolute inset-0 pointer-events-none z-35">
            <div className="absolute inset-0 bg-gradient-radial from-cyan-400/10 via-transparent to-cyan-400/5 animate-matrix-dissolve" />
            
            {/* Particules d'énergie Matrix */}
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-cyan-400 rounded-full animate-energy-particles"
                style={{
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${1 + Math.random() * 0.5}s`,
                  boxShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF',
                  filter: 'blur(0.5px)'
                }}
              />
            ))}
          </div>
          
          {/* Effet de distorsion temporelle */}
          <div className="absolute inset-0 pointer-events-none z-30">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-black/20 to-cyan-400/5 
                           animate-matrix-pulse" 
                 style={{
                   filter: 'blur(2px)',
                   mixBlendMode: 'screen'
                 }} />
          </div>
        </>
      )}
      
      {/* Particules Matrix réduites */}
      <div className={`absolute inset-0 pointer-events-none z-5 transition-opacity duration-500 ${matrixTransition ? 'opacity-0' : 'opacity-100'}`}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute text-cyan-400/60 font-mono text-sm animate-matrix-rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            {['0', '1', 'X', '#'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>
      
      <div className={`absolute inset-0 flex items-center justify-center z-10 p-4 gpu-accelerated transition-all duration-500 ${matrixTransition ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
        <MatrixText />
      </div>
      
      {/* Bouton Matrix avancé pour la boutique */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${matrixTransition ? 'opacity-0 scale-90 blur-sm' : 'opacity-100 scale-100'}`}>
        {/* Onglet Services */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-mono text-white tracking-[0.2em] mb-2"
              style={{
                fontFamily: "'Orbitron', monospace",
                textShadow: '0 0 20px rgba(255,255,255,0.3)'
              }}>
            SERVICES
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto opacity-60" />
        </div>
        
        <div className="flex justify-center">
          <div className="flex flex-col gap-4">
            <button 
              onClick={handleServicesClick}
              disabled={isTransitioningToServices}
              className="group relative px-8 py-4 bg-black/80 backdrop-blur-sm
                        border border-cyan-400/40 overflow-hidden
                        text-cyan-400 font-bold text-base md:text-lg tracking-[0.15em]
                        transition-all duration-300 ease-out
                        hover:text-white hover:scale-[1.02] hover:border-cyan-400/70
                        active:scale-[0.98] transform-gpu cursor-pointer
                        disabled:opacity-50 disabled:cursor-not-allowed
                        min-w-[280px] md:min-w-[320px] font-mono
                        hover:shadow-lg hover:shadow-cyan-400/20
                        shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]"
              style={{
                fontFamily: "'Audiowide', 'Share Tech Mono', 'Orbitron', monospace",
                textShadow: '0 0 10px #00FFFF',
                boxShadow: '0 0 20px rgba(0,255,255,0.3), inset 0 0 20px rgba(0,255,255,0.1)'
              }}
            >
              {/* Effet lumineux externe */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-cyan-400/30 to-cyan-400/20 
                             opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm -z-10" />
              
              {/* Fond subtil au hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-cyan-400/10 to-cyan-400/5 
                             opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              {/* Ligne de scan minimaliste */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent
                             opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent
                             opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              {/* Texte principal épuré */}
              <span className="relative z-10 transition-all duration-300 group-hover:text-white text-center
                              block font-bold"
                    style={{
                      fontFamily: "'Audiowide', 'Share Tech Mono', 'Orbitron', monospace",
                      letterSpacing: '0.15em'
                    }}>
                Vues, Followers HQ au meilleur prix du marché
              </span>
            </button>

            {/* Bouton Jailbreak Grok */}
            <button 
              onClick={handleJailbreakClick}
              disabled={isTransitioningToJailbreak}
              className="group relative px-8 py-4 bg-black/80 backdrop-blur-sm
                        border border-red-400/40 overflow-hidden
                        text-red-400 font-bold text-base md:text-lg tracking-[0.15em]
                        transition-all duration-300 ease-out
                        hover:text-white hover:scale-[1.02] hover:border-red-400/70
                        active:scale-[0.98] transform-gpu cursor-pointer
                        disabled:opacity-50 disabled:cursor-not-allowed
                        min-w-[280px] md:min-w-[320px] font-mono
                        hover:shadow-lg hover:shadow-red-400/20
                        shadow-[0_0_20px_rgba(255,0,65,0.3)] hover:shadow-[0_0_30px_rgba(255,0,65,0.5)]"
              style={{
                fontFamily: "'Audiowide', 'Share Tech Mono', 'Orbitron', monospace",
                textShadow: '0 0 10px #FF0041',
                boxShadow: '0 0 20px rgba(255,0,65,0.3), inset 0 0 20px rgba(255,0,65,0.1)'
              }}
            >
              {/* Effet lumineux externe */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-400/20 via-red-400/30 to-red-400/20 
                             opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm -z-10" />
              
              {/* Fond subtil au hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/5 via-red-400/10 to-red-400/5 
                             opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              {/* Ligne de scan minimaliste */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent
                             opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent
                             opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              {/* Texte principal épuré */}
              <span className="relative z-10 transition-all duration-300 group-hover:text-white text-center
                              block font-bold"
                    style={{
                      fontFamily: "'Audiowide', 'Share Tech Mono', 'Orbitron', monospace",
                      letterSpacing: '0.15em'
                    }}>
                JAILBREAK GROK
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Texte Arasaka optimisé */}
      <div className={`absolute bottom-8 right-8 select-none z-20 transition-all duration-500 ${matrixTransition ? 'opacity-0' : 'opacity-100'}`}>
        <div className="relative will-change-transform">
          {/* Texte principal optimisé */}
          <div className="relative z-10">
            <p className="relative text-base md:text-lg bg-black/40 backdrop-blur-sm rounded px-3 py-2
                           border border-pink-400/50 shadow-lg shadow-pink-400/20
                           font-bold font-mono text-pink-300
                           tracking-[0.2em] transition-all duration-300 ease-out
                           hover:text-pink-100 hover:border-pink-400/80 hover:shadow-pink-400/40
                           will-change-transform"
               style={{
                 textShadow: '0 0 10px #FF1493, 0 0 20px #FF1493, 0 0 30px #FF1493'
               }}>
              discord : arasaka.exe
            </p>
          </div>
        </div>
      </div>
      
      {/* Indicateur optimisé */}
      <div className={`absolute bottom-4 left-4 z-20 opacity-70 hover:opacity-100 transition-all duration-500 ${matrixTransition ? 'opacity-0' : ''}`}>
        <div className="relative bg-black/30 backdrop-blur-sm rounded px-2 py-1 border border-pink-400/30
                        text-pink-300 text-xs font-mono tracking-wider font-bold
                        hover:text-pink-100 hover:border-pink-400/60 transition-all duration-300"
             style={{
               textShadow: '0 0 8px #FF1493, 0 0 16px #FF1493'
             }}>
          matrix site v0.5 beta
        </div>
      </div>
    </div>
  );
}

export default App;