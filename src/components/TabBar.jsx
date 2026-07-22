import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  // On déduit l'onglet actif en lisant l'URL actuelle
  let activeTab = 'maison';
  if (location.pathname === '/vert') activeTab = 'vert';
  if (location.pathname === '/snack') activeTab = 'snack';
  if (location.pathname === '/admin') activeTab = 'admin';

  const handleTab = (tabId) => {
    // Au lieu de juste changer une variable, on change de page
    if (tabId === 'maison') navigate('/');
    if (tabId === 'vert') navigate('/vert');
    if (tabId === 'snack') navigate('/snack');
    if (tabId === 'admin') navigate('/admin');
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const LiquidBackground = () => (
    <div className="liquid-container">
      <div className={`water-layer water-vert ${activeTab === 'vert' ? 'show' : ''}`}></div>
      <div className={`water-layer water-snack ${activeTab === 'snack' ? 'show' : ''}`}></div>
      <div className={`water-layer water-admin ${activeTab === 'admin' ? 'show' : ''}`}></div>
      
      {/* L'eau de la maison est transparente */}
      <div className={`water-layer water-maison ${activeTab === 'maison' ? 'show' : ''}`}></div>
    </div>
  );

  return (
    <div className={`tabbar-global-wrapper ${isVisible ? '' : 'hidden'}`}>
      <style>{`
        /* POSITIONNEMENT GLOBAL ET ANIMATION HIDE/SHOW */
        .tabbar-global-wrapper {
          position: fixed !important;
          bottom: 25px !important;
          left: 50% !important;
          transform: translateX(-50%) translateY(var(--translate-y, 0)) !important;
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
          z-index: 999999 !important; 
          
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px; 
        }

        .tabbar-global-wrapper.hidden {
          --translate-y: 145px;
        }

        /* LE BOUTON FLÈCHE (TOGGLE) */
        .toggle-btn {
          width: 50px;
          height: 25px;
          border-radius: 15px 15px 0 0;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-bottom: none;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          margin-bottom: -2px;
          z-index: 20;
          color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.2);
        }

        .toggle-icon {
          width: 20px;
          height: 20px;
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .hidden .toggle-icon {
          transform: rotate(180deg);
        }

        /* L'EFFET VERRE ULTRA-TRANSPARENT */
        .glass-row, .glass-padlock {
          background: rgba(255, 255, 255, 0.05); 
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          border-bottom: 1px solid rgba(0, 0, 0, 0.3);
          box-shadow: 
            0 15px 30px rgba(0, 0, 0, 0.4), 
            inset 0 1px 3px rgba(255, 255, 255, 0.1);
          
          position: relative;
          overflow: hidden; 
          transition: all 0.4s ease;
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

        /* CLASSE POUR RENDRE TRANSPARENT SUR LA MAISON */
        .transparent-maison {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border-color: transparent !important;
          box-shadow: none !important;
        }

        /* COMPORTEMENT DES BOUTONS */
        .tab-btn {
          flex: 1; height: 100%; background: none; border: none; cursor: pointer;
          display: flex; justify-content: center; align-items: center;
          z-index: 10; position: relative; outline: none; -webkit-tap-highlight-color: transparent;
        }
        .padlock-btn { width: 100%; }

        /* STYLE DES ICÔNES EMOJIS */
        .emoji-icon {
          font-size: 28px;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: inline-block;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }

        .tab-btn:hover .emoji-icon { 
          transform: scale(1.15); 
        }
        
        .tab-btn.active .emoji-icon {
          transform: scale(1.3);
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5)); 
        }

        /* Le cadenas SVG */
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

        .water-vert { background: linear-gradient(to top, rgba(57, 255, 20, 0.5), rgba(57, 255, 20, 0.05)); }
        .water-snack { background: linear-gradient(to top, rgba(255, 105, 180, 0.5), rgba(255, 105, 180, 0.05)); }
        .water-admin { background: linear-gradient(to top, rgba(255, 69, 0, 0.5), rgba(255, 69, 0, 0.05)); }
        .water-maison { background: transparent !important; }
      `}</style>

      {/* BOUTON POUR MASQUER/AFFICHER */}
      <button className={`toggle-btn ${activeTab === 'maison' ? 'transparent-maison' : ''}`} onClick={toggleVisibility}>
        <svg className="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* --- LIGNE DE 3 (Devient transparente sur la maison) --- */}
      <div className={`glass-row ${activeTab === 'maison' ? 'transparent-maison' : ''}`}>
        <LiquidBackground />
        
        {/* Bouton 1 : Coin Vert (Emoji Feuille) */}
        <button className={`tab-btn ${activeTab === 'vert' ? 'active' : ''}`} onClick={() => handleTab('vert')}>
          <span className="emoji-icon">🍃</span>
        </button>

        {/* Bouton 2 : Maison (Emoji Maison) */}
        <button className={`tab-btn ${activeTab === 'maison' ? 'active' : ''}`} onClick={() => handleTab('maison')}>
          <span className="emoji-icon">🏠</span>
        </button>

        {/* Bouton 3 : Coin Snack (Emoji Café) */}
        <button className={`tab-btn ${activeTab === 'snack' ? 'active' : ''}`} onClick={() => handleTab('snack')}>
          <span className="emoji-icon">☕</span>
        </button>
      </div>

      {/* --- LE 4ÈME BOUTON (Cadenas SVG conservé) --- */}
      <div className={`glass-padlock ${activeTab === 'maison' ? 'transparent-maison' : ''}`}>
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