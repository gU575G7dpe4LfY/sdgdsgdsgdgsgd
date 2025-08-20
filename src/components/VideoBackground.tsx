import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VideoBackgroundProps {
  videoUrl: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Démarrer avec le son activé
  const [volume, setVolume] = useState(0.5); // Volume initial à 50%
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  // Fonction optimisée pour démarrer la vidéo
  const startVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return false;

    try {
      // Configuration optimisée pour la compatibilité
      video.muted = isMuted;
      video.volume = isMuted ? 0 : volume;
      
      // Forcer le rechargement si nécessaire
      if (video.readyState === 0 && retryCount < maxRetries) {
        video.load();
        setRetryCount(prev => prev + 1);
        return false;
      }
      
      try {
        await video.play();
        setIsPlaying(true);
        setRetryCount(0); // Reset retry count on success
        return true;
      } catch (playError) {
        // Si l'autoplay avec son échoue, essayer en muet
        console.log('Autoplay avec son échoué, passage en muet:', playError);
        video.muted = true;
        setIsMuted(true);
        await video.play();
        setIsPlaying(true);
        setRetryCount(0);
        return true;
      }
    } catch (error) {
      console.log('Erreur lecture vidéo:', error);
      
      // Retry logic avec fallback en muet
      if (retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        try {
          video.muted = true;
          video.volume = 0;
          await video.play();
          setIsPlaying(true);
          setIsMuted(true);
          return true;
        } catch (mutedError) {
          console.log('Retry failed:', mutedError);
          setTimeout(() => startVideo(), 1000); // Retry après 1 seconde
          return false;
        }
      } else {
        setHasError(true);
        return false;
      }
    }
  }, [isMuted, volume, retryCount, maxRetries]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Configuration optimisée pour la performance
    video.preload = 'auto';
    video.playsInline = true;
    video.loop = true;
    video.controls = false;
    video.disablePictureInPicture = true;
    video.muted = isMuted;
    video.volume = isMuted ? 0 : volume;
    video.defaultMuted = false; // Ne pas forcer le muet par défaut
    
    // Optimisations pour éviter les coupures
    video.setAttribute('preload', 'auto');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    // Ne pas forcer l'attribut muted au démarrage
    if (isMuted) {
      video.setAttribute('muted', 'true');
    }

    const handleCanPlay = () => {
      setIsLoaded(true);
      startVideo();
    };

    const handleLoadedData = () => {
      if (!isLoaded) {
        setIsLoaded(true);
        startVideo();
      }
    };

    const handleLoadedMetadata = () => {
      if (!isLoaded) {
        setIsLoaded(true);
      }
    };

    const handleError = (e: Event) => {
      console.log('Erreur vidéo:', e);
      // Retry avant de marquer comme erreur
      if (retryCount < maxRetries) {
        setTimeout(() => {
          video.load();
          startVideo();
        }, 2000);
      } else {
        setHasError(true);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    // Gestionnaire pour éviter les interruptions
    const handleStalled = () => {
      console.log('Vidéo bloquée, tentative de relance...');
      if (video.readyState < 3) {
        video.load();
      }
    };
    
    const handleWaiting = () => {
      console.log('Vidéo en attente de données...');
    };
    
    const handleSuspend = () => {
      console.log('Chargement vidéo suspendu');
    };

    // Gestionnaire optimisé pour maintenir les paramètres
    const handleTimeUpdate = () => {
      if (video.muted !== isMuted) {
        video.muted = isMuted;
      }
      if (video.volume !== (isMuted ? 0 : volume)) {
        video.volume = isMuted ? 0 : volume;
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('suspend', handleSuspend);

    // Démarrage immédiat si possible
    if (video.readyState >= 3) {
      startVideo();
    } else if (video.readyState >= 1) {
      // Si les métadonnées sont chargées, essayer de démarrer
      setTimeout(startVideo, 100);
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('stalled', handleStalled);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('suspend', handleSuspend);
    };
  }, [startVideo, isLoaded, isMuted, volume, retryCount, maxRetries]);

  // Activation sur interaction utilisateur (optimisée)
  useEffect(() => {
    const handleUserInteraction = () => {
      const video = videoRef.current;
      if (video && !isPlaying) {
        startVideo();
      }
    };

    const interactionEvents = ['click', 'touchstart'];
    interactionEvents.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [startVideo, isPlaying]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    video.muted = newMutedState;
    video.volume = newMutedState ? 0 : volume;
  }, [isMuted, volume]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    const roundedVolume = Math.round(newVolume * 100) / 100;
    setVolume(roundedVolume);
    
    if (roundedVolume === 0) {
      setIsMuted(true);
      video.muted = true;
      video.volume = 0;
    } else {
      if (isMuted) {
        setIsMuted(false);
        video.muted = false;
      }
      video.volume = roundedVolume;
    }
  }, [isMuted]);

  const handleVolumeBarClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    let newVolume = Math.max(0, Math.min(1, clickX / rect.width));
    
    if (newVolume < 0.02) {
      newVolume = 0;
    }
    
    handleVolumeChange(newVolume);
  }, [handleVolumeChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    handleVolumeBarClick(e);
    e.preventDefault();
  }, [handleVolumeBarClick]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const volumeBar = document.querySelector('.volume-bar') as HTMLElement;
    if (!volumeBar) return;
    
    const rect = volumeBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    let newVolume = Math.max(0, Math.min(1, clickX / rect.width));
    
    if (newVolume < 0.02) {
      newVolume = 0;
    }
    
    handleVolumeChange(newVolume);
    e.preventDefault();
  }, [isDragging, handleVolumeChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (hasError) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-green-900/10 animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-green-400/5 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        autoPlay
        playsInline
        controls={false}
        preload="auto"
        disablePictureInPicture
        muted={isMuted}
        style={{ 
          filter: 'brightness(0.7) contrast(1.1) saturate(0.9) hue-rotate(5deg)',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.6)_100%)] pointer-events-none" />
      
      {/* Effet Matrix subtil optimisé */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-400/3 via-transparent to-red-400/3 pointer-events-none" />

      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-black" />
      )}

      {/* Contrôles de volume optimisés */}
      {isLoaded && (
        <div className="absolute top-4 right-4 z-30">
          <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 border border-red-400/30">
            <button
              onClick={toggleMute}
              className="text-red-400 hover:text-white transition-colors duration-300"
              aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            
            <div className="relative">
              <div 
                className="volume-bar w-20 h-2 bg-black/60 rounded-full cursor-pointer 
                           border border-red-400/50 hover:border-red-400/80 transition-all duration-300"
                onClick={handleVolumeBarClick}
                onMouseDown={handleMouseDown}
              >
                <div 
                  className="h-full bg-gradient-to-r from-red-400 to-red-300 rounded-full transition-all duration-300"
                  style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                />
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 
                             bg-gradient-to-br from-white to-red-100 rounded-full
                             border-2 border-red-400 cursor-pointer
                             hover:scale-110 transition-all duration-200"
                  style={{ left: `calc(${isMuted ? 0 : volume * 100}% - 6px)` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};