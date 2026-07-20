import React, { useState } from 'react';

export default function TabBar() {
  // Le bouton par défaut est la maison (bouton central)
  const [activeTab, setActiveTab] = useState('maison');

  const handleTab = (tabId) => {
    if (activeTab !== tabId) {
      setActiveTab(tabId);
    }
  };

  // Composant interne qui gère le liquide pour pouvoir le mettre dans la barre ET dans le cadenas
  const LiquidBackground = ({ isPadlock }) => (
    <div className="liquid-container">
      {/* Liquide Vert */}
      <div className={`water-layer water-vert ${activeTab === 'vert' ? 'show' : ''}`}></div>
      
      {/* Liquide Rose (Snack) */}
      <div className={`water-layer water-snack ${activeTab === 'snack' ? 'show' : ''}`}></div>
      
      {/* Liquide Orange (Admin) */}
      <div className={`water-layer water-admin ${activeTab === 'admin' ? 'show' : ''}`}></div>
      
      {/* Liquide Maison (Couleurs séparées) */}
      <div className={`water-layer water-maison ${activeTab === 'maison' ? 'show' : ''}`}>
        {!isPadlock ? (
          <>
            <div className="blob blob-vert"></div>
            <div className="blob blob-cyan"></div>
            <div className="blob blob-pink"></div>
          </>
        ) : (
          <div className="blob blob-cyan padlock-blob"></div>
        )}
      </div>
    </div>
  );

  return (
    <div className="tabbar-global-wrapper">
      <style>{`
        /* POSITIONNEMENT GLOBAL */
        .tabbar-global-wrapper {
          position: fixed !important;
          bottom: 25px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          z-index: 999999 !important; 
          
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px; /* L'espace entre la ligne de 3 et le cadenas */
        }

        /* LE VRAI EFFET VERRE (GLASSMORPHISM) */
        .glass-row, .glass-padlock {
          background: rgba(20, 20, 20, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-top: 1px solid rgba(255, 255, 255, 0.4); /* Reflet de lumière au-dessus */
          border-bottom: 1px solid rgba(0, 0, 0, 0.5); /* Ombre de la tranche en dessous */
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.6), /* Ombre projetée très forte */
            inset 0 1px 3px rgba(255, 255, 255, 0.3); /* Brillance interne */
          
          position: relative;
          overflow: hidden; /* Garde l'eau à l'intérieur du verre */
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
          flex: 1;
          height: 100%;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10; /* Au-dessus de l'eau */
          position: relative;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }
        
        .padlock-btn { width: 100%; }

        /* LES ICÔNES SVG */
        .icon-svg {
          width: 26px;
          height: 26px;
          fill: none;
          stroke: rgba(255, 255, 255, 0.5);
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .tab-btn:hover .icon-svg {
          stroke: rgba(255, 255, 255, 0.8);
          transform: scale(1.1);
        }

        .tab-btn.active .icon-svg {
          stroke: rgba(255, 255, 255, 1);
          transform: scale(1.2);
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.6)); /* Brillance quand sélectionné */
        }

        /* --- L'EFFET LIQUIDE (EAU COLORÉE) --- */
        .liquid-container {
          position: absolute;
          inset: 0;
          pointer-events: none; /* Laisse passer les clics vers les boutons */
          z-index: 0;
        }

        .water-layer {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateY(100%); /* Le liquide commence en bas, hors du verre */
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease;
        }

        .water-layer.show {
          opacity: 1;
          transform: translateY(0); /* Le liquide monte et remplit le verre */
        }

        /* Les couleurs de l'eau (plus sombre en bas, transparent en haut) */
        .water-vert { background: linear-gradient(to top, rgba(57, 255, 20, 0.5), rgba(57, 255, 20, 0.05)); }
        .water-snack { background: linear-gradient(to top, rgba(255, 105, 180, 0.5), rgba(255, 105, 180, 0.05)); }
        .water-admin { background: linear-gradient(to top, rgba(255, 69, 0, 0.5), rgba(255, 69, 0, 0.05)); }

        /* L'état Maison (3 Couleurs distinctes) */
        .water-maison {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10%;
        }

        .blob {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          opacity: 0.65;
          filter: blur(12px); /* Crée l'effet de nuage de couleur dans l'eau */
          animation: float-blob 4s infinite ease-in-out alternate;
        }

        .blob-vert { background: #39FF14; animation-delay: 0s; }
        .blob-cyan { background: #00FFFF; animation-delay: -1.5s; }
        .blob-pink { background: #FF69B4; animation-delay: -3s; }
        
        .padlock-blob { width: 35px; height: 35px; margin: auto; }

        @keyframes float-blob {
          0% { transform: translateY(-5px) scale(0.9); }
          100% { transform: translateY(5px) scale(1.15); }
        }
      `}</style>

      {/* --- LIGNE DE 3 --- */}
      <div className="glass-row">
        {/* Le liquide en arrière plan */}
        <LiquidBackground isPadlock={false} />
        
        {/* Bouton 1 : Coin Vert (Feuille) */}
        <button className={`tab-btn ${activeTab === 'vert' ? 'active' : ''}`} onClick={() => handleTab('vert')}>
          <svg className="icon-svg" viewBox="0 0 24 24">
            <path d="M2 22c5-10 12-14 20-14-3 9-9 14-20 14z" />
            <path d="M2 22l8-8" />
          </svg>
        </button>

        {/* Bouton 2 : Maison (Home) */}
        <button className={`tab-btn ${activeTab === 'maison' ? 'active' : ''}`} onClick={() => handleTab('maison')}>
          <svg className="icon-svg" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>

        {/* Bouton 3 : Coin Snack (Tasse/Boisson) */}
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

      {/* --- LE 4ÈME BOUTON (CADENAS ADMIN) EN DESSOUS --- */}
      <div className="glass-padlock">
        {/* Le liquide remplit aussi le cadenas simultanément ! */}
        <LiquidBackground isPadlock={true} />
        
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