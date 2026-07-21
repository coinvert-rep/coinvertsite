import React, { useState } from 'react';

export default function TabBar() {
  const [activeTab, setActiveTab] = useState('maison');
  const [isVisible, setIsVisible] = useState(true); // État pour cacher/montrer la barre

  const handleTab = (tabId) => {
    if (activeTab !== tabId) {
      setActiveTab(tabId);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Composant interne pour le liquide
  const LiquidBackground = () => (
    <div className="liquid-container">
      <div className={`water-layer water-vert ${activeTab === 'vert' ? 'show' : ''}`}></div>
      <div className={`water-layer water-snack ${activeTab === 'snack' ? 'show' : ''}`}></div>
      <div className={`water-layer water-admin ${activeTab === 'admin' ? 'show' : ''}`}></div>
      
      {/* Nouveau liquide Maison : prend toute la place avec un dégradé multicolore */}
      <div className={`water-layer water-maison ${activeTab === 'maison' ? 'show' : ''}`}></div>
    </div>
  );

  return (
    // La classe 'hidden' s'ajoute si isVisible est faux, déclenchant l'animation CSS
    <div className={`tabbar-global-wrapper ${isVisible ? '' : 'hidden'}`}>
      <style>{`
        /* POSITIONNEMENT GLOBAL ET ANIMATION HIDE/SHOW */
        .tabbar-global-wrapper {
          position: fixed !important;
          bottom: 25px !important;
          left: 50% !important;
          /* On ajoute une variable translateY pour gérer le glissement vers le bas */
          transform: translateX(-50%) translateY(var(--translate-y, 0)) !important;
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          z-index: 999999 !important; 
          
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px; 
        }

        /* Quand la barre est cachée, elle descend de 145px */
        .tabbar-global-wrapper.hidden {
          --translate-y: 145px;
        }

        /* LE BOUTON FLÈCHE (TOGGLE) */
        .toggle-btn {
          width: 50px;
          height: 25px;
          border-radius: 15px 15px 0 0; /* Arrondi en haut, plat en bas */
          background: rgba(255, 255, 255, 0.05); /* Très transparent */
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-bottom: none;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          margin-bottom: -2px; /* Colle le bouton à la barre */
          z-index: 20;
          color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.2);
        }

        .toggle-icon {
          width: 20px;
          height: 20px;
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* Tourne la flèche quand c'est caché */
        .hidden .toggle-icon {
          transform: rotate(180deg);
        }

        /* L'EFFET VERRE ULTRA-TRANSPARENT */
        .glass-row, .glass-padlock {
          /* On baisse drastiquement l'opacité (0.05 au lieu de 0.4) pour plus de transparence */
          background: rgba(255, 255, 255, 0.05); 
          backdrop-filter: blur(25px); /* On augmente le flou pour garder l'effet verre */
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          border-bottom: 1px solid rgba(0, 0, 0, 0.3);
          box-shadow: 
            0 15px 30px rgba(0, 0, 0, 0.4), 
            inset 0 1px 3px rgba(255, 255, 255, 0.1);
          
          position: relative;
          overflow: hidden; 
        }

        .glass-row {
          width: clamp(280px, 85vw, 400px);
          height: 70px;
          border-radius: 35px;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .glass-padlock {
          width: 60px;
          height: 60px;
          border-radius: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* COMPORTEMENT DES BOUTONS */
        .tab-btn {
          flex: 1; height: 100%; background: none; border: none; cursor: pointer;
          display: flex; justify-content: center; align-items: center;
          z-index: 10; position: relative; outline: none; -webkit-tap-highlight-color: transparent;
        }
        .padlock-btn { width: 100%; }

        /* LES ICÔNES SVG */
        .icon-svg {
          width: 26px; height: 26px; fill: none;
          stroke: rgba(255, 255, 255, 0.6);
          stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .tab-btn:hover .icon-svg { stroke: rgba(255, 255, 255, 0.9); transform: scale(1.1); }
        .tab-btn.active .icon-svg {
          stroke: rgba(255, 255, 255, 1); transform: scale(1.2);
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.6)); 
        }

        /* --- L'EFFET LIQUIDE (EAU COLORÉE) --- */
        .liquid-container { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
        
        .water-layer {
          position: absolute; inset: 0; opacity: 0;
          transform: translateY(100%); 
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease;
        }

        .water-layer.show { opacity: 1; transform: translateY(0); }

        /* Les couleurs de l'eau */
        .water-vert { background: linear-gradient(to top, rgba(57, 255, 20, 0.5), rgba(57, 255, 20, 0.05)); }
        .water-snack { background: linear-gradient(to top, rgba(255, 105, 180, 0.5), rgba(255, 105, 180, 0.05)); }
        .water-admin { background: linear-gradient(to top, rgba(255, 69, 0, 0.5), rgba(255, 69, 0, 0.05)); }
        
        /* Nouveau Liquide Maison (Plein écran, mix des couleurs du site) */
        .water-maison { 
          background: linear-gradient(to top, rgba(0, 255, 255, 0.4), rgba(255, 105, 180, 0.15), rgba(57, 255, 20, 0.05)); 
        }
      `}</style>

      {/* BOUTON POUR MASQUER/AFFICHER */}
      <button className="toggle-btn" onClick={toggleVisibility}>
        <svg className="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* --- LIGNE DE 3 --- */}
      <div className="glass-row">
        <LiquidBackground />
        
        {/* Bouton 1 : Coin Vert */}
        <button className={`tab-btn ${activeTab === 'vert' ? 'active' : ''}`} onClick={() => handleTab('vert')}>
          <svg className="icon-svg" viewBox="0 0 24 24">
            <path d="M2 22c5-10 12-14 20-14-3 9-9 14-20 14z" />
            <path d="M2 22l8-8" />
          </svg>
        </button>

        {/* Bouton 2 : Maison */}
        <button className={`tab-btn ${activeTab === 'maison' ? 'active' : ''}`} onClick={() => handleTab('maison')}>
          <svg className="icon-svg" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>

        {/* Bouton 3 : Coin Snack */}
        <button className={`tab-btn ${activeTab === 'snack' ? 'active' : ''}`} onClick={() => handleTab('snack')}>
          <svg className="icon-svg" viewBox="0 0 24 24">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
        </button>
      </div>

      {/* --- LE 4ÈME BOUTON (CADENAS ADMIN) --- */}
      <div className="glass-padlock">
        <LiquidBackground />
        
        <button className={`tab-btn padlock-btn ${activeTab === 'admin' ? 'active' : ''}`} onClick={() => handleTab('admin')}>
          <svg className="icon-svg" viewBox="0 0 24 24">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </button>
      </div>

    </div>
  );
}