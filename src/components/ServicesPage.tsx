import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Eye, Users, Zap, Star, ChevronRight, Sparkles, Plus, Minus } from 'lucide-react';
import { TikTokLogo, YouTubeLogo, InstagramLogo, XLogo } from './SocialLogos';

interface ServicesPageProps {
  onBack: () => void;
}

interface Service {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  packages: {
    amount: string;
    price: string;
    popular?: boolean;
  }[];
  pricePerUnit: number; // Prix pour 1 unité (en euros)
  minQuantity: number;
  maxQuantity: number;
  step: number;
}

interface SocialNetwork {
  id: string;
  name: string;
  logo: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onBack }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('tiktok');
  const [selectedService, setSelectedService] = useState<string>('views');
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null);
  const [matrixRain, setMatrixRain] = useState<Array<{id: number, x: number, delay: number, duration: number}>>([]);
  const [glitchActive, setGlitchActive] = useState(false);
  const [scanlinePosition, setScanlinePosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [customQuantity, setCustomQuantity] = useState<number>(1000);
  const [quantityError, setQuantityError] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  // Initialiser la quantité personnalisée avec les bonnes valeurs minimales
  useEffect(() => {
    // Démarrer avec un champ vide
    setCustomQuantity(0);
    setInputValue('');
    setQuantityError('');
  }, []);

  // Réseaux sociaux avec leurs logos et couleurs
  const socialNetworks: SocialNetwork[] = [
    {
      id: 'tiktok',
      name: 'TikTok',
      logo: TikTokLogo,
      color: '#FF0050',
      gradient: 'from-pink-500 to-red-500'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      logo: YouTubeLogo,
      color: '#FF0000',
      gradient: 'from-red-500 to-red-600'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      logo: InstagramLogo,
      color: '#E4405F',
      gradient: 'from-purple-500 via-pink-500 to-orange-500'
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      logo: XLogo,
      color: '#1DA1F2',
      gradient: 'from-blue-400 to-blue-600'
    }
  ];

  // Services par réseau social avec prix réalistes
  const servicesByNetwork: Record<string, Service[]> = {
    tiktok: [
      {
        id: 'views',
        icon: Eye,
        title: 'VUES TIKTOK',
        subtitle: 'Visibilité Maximale',
        pricePerUnit: 0.0005, // 0.05 centimes par vue
        minQuantity: 100,
        maxQuantity: 999000000,
        step: 1,
        packages: [
          { amount: '1K', price: '0.50€' },
          { amount: '5K', price: '2.50€' },
          { amount: '10K', price: '5.00€', popular: true },
          { amount: '25K', price: '12.50€' },
          { amount: '50K', price: '25.00€' },
          { amount: '100K', price: '50.00€' }
        ]
      },
      {
        id: 'followers',
        icon: Users,
        title: 'FOLLOWERS TIKTOK',
        subtitle: 'Communauté Active',
        pricePerUnit: 0.005, // 0.5 centimes par follower
        minQuantity: 10,
        maxQuantity: 5000000,
        step: 1,
        packages: [
          { amount: '100', price: '0.50€' },
          { amount: '500', price: '2.50€' },
          { amount: '1K', price: '5.00€', popular: true },
          { amount: '2.5K', price: '12.50€' },
          { amount: '5K', price: '25.00€' },
          { amount: '10K', price: '50.00€' }
        ]
      }
    ],
    youtube: [
      {
        id: 'views',
        icon: Eye,
        title: 'VUES YOUTUBE',
        subtitle: 'Audience Globale',
        pricePerUnit: 0.0005,
        minQuantity: 100,
        maxQuantity: 999000000,
        step: 1,
        packages: [
          { amount: '1K', price: '0.50€' },
          { amount: '5K', price: '2.50€' },
          { amount: '10K', price: '5.00€', popular: true },
          { amount: '25K', price: '12.50€' },
          { amount: '50K', price: '25.00€' },
          { amount: '100K', price: '50.00€' }
        ]
      },
      {
        id: 'subscribers',
        icon: Users,
        title: 'ABONNÉS YOUTUBE',
        subtitle: 'Croissance Durable',
        pricePerUnit: 0.005,
        minQuantity: 10,
        maxQuantity: 5000000,
        step: 1,
        packages: [
          { amount: '100', price: '0.50€' },
          { amount: '500', price: '2.50€' },
          { amount: '1K', price: '5.00€', popular: true },
          { amount: '2.5K', price: '12.50€' },
          { amount: '5K', price: '25.00€' },
          { amount: '10K', price: '50.00€' }
        ]
      }
    ],
    instagram: [
      {
        id: 'views',
        icon: Eye,
        title: 'VUES INSTAGRAM',
        subtitle: 'Engagement Visual',
        pricePerUnit: 0.0005,
        minQuantity: 100,
        maxQuantity: 999000000,
        step: 1,
        packages: [
          { amount: '1K', price: '0.50€' },
          { amount: '5K', price: '2.50€' },
          { amount: '10K', price: '5.00€', popular: true },
          { amount: '25K', price: '12.50€' },
          { amount: '50K', price: '25.00€' },
          { amount: '100K', price: '50.00€' }
        ]
      },
      {
        id: 'followers',
        icon: Users,
        title: 'FOLLOWERS INSTAGRAM',
        subtitle: 'Influence Sociale',
        pricePerUnit: 0.005,
        minQuantity: 10,
        maxQuantity: 5000000,
        step: 1,
        packages: [
          { amount: '100', price: '0.50€' },
          { amount: '500', price: '2.50€' },
          { amount: '1K', price: '5.00€', popular: true },
          { amount: '2.5K', price: '12.50€' },
          { amount: '5K', price: '25.00€' },
          { amount: '10K', price: '50.00€' }
        ]
      }
    ],
    x: [
      {
        id: 'views',
        icon: Eye,
        title: 'VUES X (TWITTER)',
        subtitle: 'Portée Virale',
        pricePerUnit: 0.0005,
        minQuantity: 100,
        maxQuantity: 999000000,
        step: 1,
        packages: [
          { amount: '1K', price: '0.50€' },
          { amount: '5K', price: '2.50€' },
          { amount: '10K', price: '5.00€', popular: true },
          { amount: '25K', price: '12.50€' },
          { amount: '50K', price: '25.00€' },
          { amount: '100K', price: '50.00€' }
        ]
      },
      {
        id: 'followers',
        icon: Users,
        title: 'FOLLOWERS X',
        subtitle: 'Réseau Professionnel',
        pricePerUnit: 0.005,
        minQuantity: 10,
        maxQuantity: 5000000,
        step: 1,
        packages: [
          { amount: '100', price: '0.50€' },
          { amount: '500', price: '2.50€' },
          { amount: '1K', price: '5.00€', popular: true },
          { amount: '2.5K', price: '12.50€' },
          { amount: '5K', price: '25.00€' },
          { amount: '10K', price: '50.00€' }
        ]
      }
    ]
  };

  // Initialisation des animations Matrix
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    
    // Génération de la pluie Matrix réduite pour les performances
    const rainDrops = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 2
    }));
    setMatrixRain(rainDrops);

    // Animation de glitch périodique moins fréquente
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 15000 + Math.random() * 10000);

    // Animation scanline optimisée
    const scanlineInterval = setInterval(() => {
      setScanlinePosition(prev => (prev + 0.5) % 100);
    }, 150);

    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
      clearInterval(scanlineInterval);
    };
  }, []);

  const currentServices = servicesByNetwork[selectedNetwork] || [];
  const currentService = currentServices.find(s => s.id === selectedService) || currentServices[0];
  const currentNetwork = socialNetworks.find(n => n.id === selectedNetwork);

  const handleNetworkChange = (networkId: string) => {
    if (networkId === selectedNetwork) return;
    setSelectedNetwork(networkId);
    // Reset au premier service du nouveau réseau
    const newServices = servicesByNetwork[networkId] || [];
    if (newServices.length > 0) {
      setSelectedService(newServices[0].id);
    }
  };

  const handleServiceChange = (serviceId: string) => {
    if (serviceId === selectedService) return;
    setSelectedService(serviceId);
  };

  // Reset la quantité lors du changement de service
  useEffect(() => {
    // Reset à vide lors du changement de service
    setCustomQuantity(0);
    setInputValue('');
    setQuantityError('');
  }, [currentService?.id]);

  const calculatePrice = (quantity: number) => {
    if (!currentService) return '0.00€';
    if (quantity === 0) return '0.00€';
    const price = quantity * currentService.pricePerUnit;
    return `${price.toFixed(2)}€`;
  };

  const formatQuantity = (quantity: number) => {
    if (quantity >= 1000000) {
      return `${(quantity / 1000000).toFixed(1)}M`;
    } else if (quantity >= 1000) {
      return `${(quantity / 1000).toFixed(0)}K`;
    }
    return quantity.toString();
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentService) return;
    
    const value = e.target.value;
    setInputValue(value);
    
    // Effacer l'erreur lors de la saisie
    if (quantityError) {
      setQuantityError('');
    }
    
    // Permettre une chaîne vide pendant la saisie
    if (value === '') {
      setCustomQuantity(0);
      return;
    }
    
    // Convertir en nombre et valider
    const numericValue = parseInt(value, 10);
    
    // Vérifier si c'est un nombre valide
    if (isNaN(numericValue)) {
      return; // Ne pas mettre à jour si ce n'est pas un nombre
    }
    
    // Permettre toute valeur entre 0 et max, sans forcer le minimum
    const clampedValue = Math.max(0, Math.min(currentService.maxQuantity, numericValue));
    
    setCustomQuantity(clampedValue);
  };

  const handleCustomOrder = () => {
    if (!currentService) return;
    
    // Vérifier si la quantité respecte le minimum requis
    if (customQuantity < currentService.minQuantity) {
      const minRequired = currentService.minQuantity;
      const serviceType = currentService.id === 'views' ? 'vues' : 
                         currentService.id === 'subscribers' ? 'abonnés' : 'followers';
      
      setQuantityError(`Quantité minimum requise : ${minRequired} ${serviceType}`);
      return;
    }
    
    if (customQuantity === 0) {
      setQuantityError('Veuillez saisir une quantité');
      return;
    }
    
    // Effacer l'erreur et procéder à la commande
    setQuantityError('');
    
    // Ici vous pouvez ajouter la logique de commande
    console.log('Commande:', customQuantity, currentService.id);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black overflow-y-auto overflow-x-hidden relative"
      style={{ 
        scrollBehavior: 'smooth',
        scrollbarWidth: 'thin',
        scrollbarColor: '#FF0041 #000000',
        maxHeight: '100vh'
      }}
    >
      {/* Style pour la scrollbar optimisé */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 12px;
        }
        div::-webkit-scrollbar-track {
          background: #000000;
          border-radius: 6px;
        }
        div::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #FF0041, #00FFFF);
          border-radius: 6px;
          border: 2px solid #000000;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #FF0055, #00FFFF);
        }
        div::-webkit-scrollbar-corner {
          background: #000000;
        }
      `}</style>

      {/* Fond Matrix Web3 optimisé et fixe */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Grille Matrix dynamique */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="absolute inset-0 animate-matrix-grid" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(0,255,65,0.08) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(0,255,65,0.08) 1px, transparent 1px)
                 `,
                 backgroundSize: '50px 50px'
               }} />
        </div>

        {/* Pluie Matrix réduite pour les performances */}
        <div className="absolute inset-0 overflow-hidden">
          {matrixRain.map((drop) => (
            <div
              key={drop.id}
              className="absolute text-green-400/10 font-mono text-xs font-bold animate-matrix-data-stream"
              style={{
                left: `${drop.x}%`,
                animationDelay: `${drop.delay}s`,
                animationDuration: `${drop.duration}s`,
                textShadow: '0 0 6px #00FF41'
              }}
            >
              {['0', '1', 'X', '#'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>

        {/* Scanline globale */}
        <div 
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm"
          style={{
            top: `${scanlinePosition}%`,
            boxShadow: '0 0 10px #00FFFF'
          }}
        />

        {/* Gradient central adaptatif */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                        w-[800px] h-[500px] bg-gradient-radial from-cyan-400/6 via-cyan-400/3 to-transparent 
                        blur-3xl animate-matrix-pulse" />

        {/* Effet de glitch global */}
        {glitchActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-cyan-400/5 
                         animate-hack-glitch-intense" />
        )}
      </div>

      {/* Header fixe optimisé */}
      <header className={`sticky top-0 z-30 bg-black/90 backdrop-blur-xl border-b border-cyan-400/20 
                         transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <button
              onClick={onBack}
              className="group flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2 lg:py-3 bg-black/60 backdrop-blur-xl
                        border border-cyan-400/30 rounded-xl hover:border-cyan-400/60
                        text-cyan-400 font-mono font-bold tracking-wider text-sm lg:text-base
                        transition-all duration-500 ease-out
                        hover:text-white hover:scale-105 hover:bg-black/80"
              style={{ textShadow: '0 0 10px #00FFFF' }}
            >
              <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>RETOUR</span>
            </button>

            <div className="text-right">
              <div className="text-cyan-400 font-mono text-lg lg:text-xl font-bold tracking-[0.3em] mb-1"
                   style={{ textShadow: '0 0 15px #00FFFF' }}>
                MATRIX SERVICES
              </div>
              <div className="text-cyan-400/80 font-mono text-xs lg:text-sm tracking-wider">
                GG EZ
              </div>
            </div>
          </div>

          {/* Navigation par réseaux sociaux */}
          <div className="flex justify-center">
            <div className="flex bg-black/70 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-1 lg:p-2 
                           shadow-2xl shadow-cyan-400/10 overflow-x-auto max-w-full">
              {socialNetworks.map((network) => {
                const LogoComponent = network.logo;
                return (
                <button
                  key={network.id}
                  onClick={() => handleNetworkChange(network.id)}
                  className={`relative flex items-center gap-2 lg:gap-3 px-3 lg:px-6 py-2 lg:py-4 rounded-xl font-mono font-bold text-sm lg:text-base
                             transition-all duration-700 ease-out group overflow-hidden whitespace-nowrap flex-shrink-0
                             ${selectedNetwork === network.id 
                               ? `bg-gradient-to-r ${network.gradient} text-white shadow-lg` 
                               : 'text-cyan-400/80 hover:text-white hover:bg-black/60'}`}
                  style={{
                    textShadow: selectedNetwork === network.id ? '0 0 10px rgba(255,255,255,0.8)' : '0 0 8px #00FFFF',
                    minWidth: 'fit-content'
                  }}
                >
                  {/* Effet de fond Matrix */}
                  {selectedNetwork === network.id && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-matrix-warp" />
                      <div className="absolute inset-0 border border-white/20 rounded-xl animate-matrix-border-scan" />
                    </>
                  )}

                  <LogoComponent className="w-5 h-5 lg:w-7 lg:h-7" />
                  <span className="tracking-[0.1em] font-bold hidden sm:inline">{network.name}</span>

                  {/* Particules au hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-energy-particles"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal scrollable */}
      <main className="relative z-10 pb-8">
        {/* Navigation services */}
        {currentServices.length > 0 && (
          <section className={`px-4 lg:px-6 py-6 lg:py-8 transition-all duration-1200 ease-out delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="max-w-6xl mx-auto flex justify-center">
              <div className="flex bg-black/60 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-1 lg:p-2 
                             shadow-xl shadow-cyan-400/10 overflow-x-auto max-w-full">
                {currentServices.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleServiceChange(service.id)}
                      className={`relative flex items-center gap-2 lg:gap-3 px-4 lg:px-8 py-2 lg:py-4 rounded-xl font-mono font-bold text-sm lg:text-lg
                                 transition-all duration-700 ease-out group overflow-hidden whitespace-nowrap flex-shrink-0
                                 ${selectedService === service.id 
                                   ? 'bg-gradient-to-r from-cyan-400/20 to-red-400/20 text-white border border-cyan-400/40' 
                                   : 'text-cyan-400/80 hover:text-white hover:bg-black/60'}`}
                      style={{
                        textShadow: selectedService === service.id ? '0 0 15px #FFFFFF' : '0 0 10px #00FFFF',
                        minWidth: 'fit-content'
                      }}
                    >
                      <IconComponent className={`w-4 h-4 lg:w-6 lg:h-6 transition-all duration-500 ${selectedService === service.id ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`} />
                      <span className="tracking-[0.1em]">{service.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Titre du service actuel */}
        {currentService && (
          <section className={`text-center py-8 lg:py-12 px-4 transition-all duration-1000 ease-out delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative inline-block">
              <h1 className="text-2xl lg:text-4xl xl:text-6xl font-bold font-mono text-white mb-4 tracking-tight"
                  style={{ 
                    textShadow: `0 0 30px rgba(255,255,255,0.5), 0 0 60px #00FFFF30`,
                    filter: 'drop-shadow(0 0 20px rgba(0,255,255,0.4))'
                  }}>
                {currentService.title}
              </h1>
              
              {/* Ligne de scan sous le titre */}
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 lg:w-24 h-1 
                             bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full
                             animate-pulse shadow-lg shadow-cyan-400/50`} />
            </div>
            
            <p className="text-cyan-400 text-base lg:text-xl font-mono tracking-[0.2em] mt-6 opacity-90"
               style={{ textShadow: '0 0 15px #00FFFF' }}>
              {currentService.subtitle}
            </p>
          </section>
        )}

        {/* Packages */}
        {currentService && (
          <section className={`pb-8 lg:pb-12 transition-all duration-1200 ease-out delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
              {/* Packages prédéfinis */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4 mb-8 lg:mb-12">
                {currentService.packages.map((pkg, index) => (
                  <div
                    key={pkg.amount}
                    className={`group relative bg-gradient-to-br from-black/95 via-gray-950/98 to-black/95 
                               backdrop-blur-xl border rounded-xl p-3 lg:p-4 cursor-pointer
                               transition-all duration-300 ease-out hover:scale-105
                               ${pkg.popular 
                                 ? 'border-cyan-400/50 shadow-xl shadow-cyan-400/20' 
                                 : 'border-gray-600/30 hover:border-cyan-400/40'}
                               hover:shadow-xl hover:shadow-cyan-400/15`}
                    onMouseEnter={() => setHoveredPackage(pkg.amount)}
                    onMouseLeave={() => setHoveredPackage(null)}
                    style={{ 
                      transitionDelay: `${index * 50}ms`
                    }}
                  >
                    {/* Badge populaire */}
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className={`bg-gradient-to-r ${currentNetwork?.gradient || 'from-cyan-400 to-red-400'} text-white text-xs font-bold 
                                       px-2 lg:px-3 py-1 rounded-full shadow-lg flex items-center gap-1`}>
                          <Sparkles className="w-2 h-2 lg:w-3 lg:h-3 fill-current" />
                          <span className="tracking-wider">TOP</span>
                        </div>
                      </div>
                    )}

                    {/* Effet Matrix au hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-cyan-400/10 rounded-2xl animate-matrix-warp" />
                      
                      {/* Lignes de scan */}
                      <div className="absolute inset-0 overflow-hidden rounded-2xl">
                        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent
                                       top-0 animate-pulse" />
                        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent
                                       bottom-0 animate-pulse" />
                      </div>
                    </div>

                    {/* Contenu du package */}
                    <div className="relative z-10 text-center">
                      {/* Prix */}
                      <div className="mb-2 lg:mb-3">
                        <div className={`text-lg lg:text-2xl font-bold text-transparent bg-gradient-to-r ${currentNetwork?.gradient || 'from-cyan-400 to-red-400'} bg-clip-text mb-1`}
                             style={{ 
                               filter: 'drop-shadow(0 0 8px rgba(0,255,255,0.3))'
                             }}>
                          {pkg.price}
                        </div>
                        
                        <div className="text-base lg:text-xl font-bold text-white/90 mb-1">
                          {pkg.amount}
                        </div>
                        
                        <div className="text-gray-400 font-mono text-xs tracking-wide">
                          {currentService.id === 'views' ? 'VUES' : 
                           currentService.id === 'subscribers' ? 'ABONNÉS' : 'FOLLOWERS'}
                        </div>
                      </div>

                      {/* Bouton d'action */}
                      <button className="relative w-full py-1.5 lg:py-2 bg-gradient-to-r from-gray-800/80 to-gray-900/80 
                                       border border-gray-600/50 rounded-lg overflow-hidden
                                       text-gray-300 font-mono font-medium text-xs lg:text-sm tracking-wide
                                       transition-all duration-300 ease-out 
                                       hover:text-white hover:border-cyan-400/60 hover:bg-gradient-to-r hover:from-cyan-400/10 hover:to-cyan-400/10
                                       active:scale-95 flex items-center justify-center gap-1 lg:gap-2 group/btn">
                        
                        <Zap className="w-3 h-3 transition-transform duration-200 group-hover/btn:scale-110" />
                        <span className="relative z-10">COMMANDER</span>
                        <ChevronRight className="w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </button>
                    </div>

                    {/* Effet subtil pour le package recommandé */}
                    {pkg.popular && (
                      <div className="absolute -inset-2 bg-gradient-radial from-cyan-400/10 via-cyan-400/3 to-transparent 
                                     blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                    )}
                  </div>
                ))}
              </div>

              {/* Section personnalisée */}
              <div className="bg-gradient-to-br from-black/95 via-gray-950/98 to-black/95 backdrop-blur-xl 
                             border border-cyan-400/30 rounded-2xl p-6 lg:p-8 shadow-2xl shadow-cyan-400/10">
                <div className="text-center mb-6">
                  <h3 className="text-xl lg:text-2xl font-bold font-mono text-white mb-2 tracking-[0.1em]"
                      style={{ textShadow: '0 0 15px rgba(255,255,255,0.5)' }}>
                    QUANTITÉ PERSONNALISÉE
                  </h3>
                  <p className="text-cyan-400/80 font-mono text-sm tracking-wider">
                    Choisissez votre quantité exacte
                  </p>
                </div>

                <div className="max-w-md mx-auto">
                  {/* Input de quantité */}
                  <div className="mb-4">
                    <input
                      type="number"
                      value={inputValue}
                      onChange={handleQuantityChange}
                      min={0}
                      max={currentService?.maxQuantity || 100000}
                      placeholder="Entrez la quantité"
                      className={`w-full px-4 py-3 bg-black/70 border rounded-lg
                               text-white font-mono text-center text-xl font-bold
                               focus:outline-none focus:ring-2 transition-all duration-300
                               ${quantityError 
                                 ? 'border-red-400/60 focus:border-red-400/80 focus:ring-red-400/20 hover:border-red-400/70' 
                                 : 'border-cyan-400/30 focus:border-cyan-400/60 focus:ring-cyan-400/20 hover:border-cyan-400/50'}`}
                    />
                    <div className="text-center mt-2 text-gray-500 font-mono text-xs">
                      Min: {currentService?.minQuantity || 1} - Max: {formatQuantity(currentService?.maxQuantity || 100000)}
                    </div>
                    
                    {/* Message d'erreur */}
                    {quantityError && (
                      <div className="text-center mt-2 text-red-400 font-mono text-sm font-bold animate-pulse"
                           style={{ textShadow: '0 0 10px #FF0041' }}>
                        ⚠️ {quantityError}
                      </div>
                    )}
                  </div>

                  {/* Prix calculé */}
                  <div className="text-center mb-4">
                    <div className={`text-3xl font-bold text-transparent bg-gradient-to-r ${currentNetwork?.gradient || 'from-cyan-400 to-red-400'} bg-clip-text mb-1`}>
                      {calculatePrice(customQuantity)}
                    </div>
                    <div className="text-gray-400 font-mono text-xs">
                      {formatQuantity(customQuantity)} {currentService?.id === 'views' ? 'VUES' : 
                       currentService?.id === 'subscribers' ? 'ABONNÉS' : 'FOLLOWERS'}
                    </div>
                  </div>

                  {/* Bouton commander */}
                  <button 
                    onClick={handleCustomOrder}
                    className="w-full py-3 bg-gradient-to-r from-cyan-400/20 to-cyan-400/20 
                                   border border-cyan-400/50 rounded-lg overflow-hidden
                                   text-white font-mono font-bold text-base tracking-wide
                                   transition-all duration-500 ease-out 
                                   hover:border-cyan-400/80 hover:bg-gradient-to-r hover:from-cyan-400/30 hover:to-cyan-400/30
                                   hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group/custom
                                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    
                    <Zap className="w-4 h-4 transition-transform duration-200 group-hover/custom:scale-110" />
                    <span className="relative z-10">COMMANDER MAINTENANT</span>
                    <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/custom:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
};