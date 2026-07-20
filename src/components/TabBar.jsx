import React, { useState, useEffect, useRef } from 'react';

export default function TabBar() {
  const [activeTab, setActiveTab] = useState('tab-one');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: '0px', color: '#39FF14' });
  const [dropStyle, setDropStyle] = useState({ top: '75px', left: '31px', opacity: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  
  const tabsRef = useRef({});

  // Définition de vos couleurs personnalisées
  const tabColors = {
    'tab-one': '#39FF14',   // Vert flash (Coin Vert)
    'tab-two': '#FF69B4',   // Rose bonbon (Coin Snack)
    'tab-three': '#00FFFF', // Cyan (Autre)
    'tab-four': '#FF4500'   // Orange/Rouge (Alert/Admin)
  };

  const handleTabClick = (tabId) => {
    if (activeTab === tabId) return;

    setActiveTab(tabId);
    setIsAnimating(true);

    const el = tabsRef.current[tabId];
    if (el) {
      // Calcul du décalage (offset) pour centrer l'indicateur
      const offsetLeft = el.offsetLeft + 12;

      setIndicatorStyle({
        left: `${offsetLeft}px`,
        color: tabColors[tabId]
      });

      // Animations de la petite goutte de liquide (indicator-drop)
      setTimeout(() => {
        setDropStyle({
          top: '55px',
          left: `${offsetLeft + 6}px`,
          opacity: 1
        });
      }, 300);

      setTimeout(() => {
        setDropStyle({ top: '75px', left: '31px', opacity: 0 });
      }, 500);

      // Fin de l'animation d'étirement de l'indicateur
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  // Met à jour la position de l'indicateur si on redimensionne l'écran
  useEffect(() => {
    const updatePosition = () => {
      const el = tabsRef.current[activeTab];
      if (el) {
        const offsetLeft = el.offsetLeft + 12;
        setIndicatorStyle(prev => ({ ...prev, left: `${offsetLeft}px` }));
      }
    };

    // Petit délai initial pour laisser le navigateur calculer les largeurs
    setTimeout(updatePosition, 100); 
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [activeTab]);

  return (
    <>
      <style>{`
        /* EFFET GLASSMORPHISM ET POSITIONNEMENT */
        .glass-tab-container {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          
          display: flex;
          justify-content: space-around;
          align-items: center;
          
          /* Taille proportionnelle à l'écran */
          width: clamp(320px, 90vw, 500px);
          height: 95px;
          border-radius: 25px;
          
          /* L'effet Verre (Glass) */
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 
                      inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .tab {
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .tab label {
          cursor: pointer;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          -webkit-tap-highlight-color: transparent;
        }

        .tab svg {
          width: 35px;
          position: relative;
        }

        .svg-icon-deactive {
          fill: rgba(255, 255, 255, 0.6);
          stroke: rgba(255, 255, 255, 0.6);
          display: inline;
          width: 100%;
          height: 100%;
          transition: all 0.3s ease;
        }

        .tab input,
        .tab use.tab-active {
          display: none;
        }

        /* Animation au clic */
        .tab input:checked + label svg use.tab-active {
          transform-origin: 50% 50%;
          animation: fill-animation 0.9s ease 0.3s forwards;
          display: block;
          fill: none;
        }

        .tab input:checked + label svg use.tab-deactive {
          display: none;
        }

        .tab label:hover svg {
          animation: scale-animation 0.9s ease 0.2s forwards;
        }

        /* L'INDICATEUR FLUIDE */
        .indicator {
          position: absolute;
          width: 22px;
          height: 17px;
          top: 78px;
          transition: left 0.3s ease-in-out, background-color 0.3s ease-in-out;
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
          transform-origin: center 20px;
          z-index: 1;
        }

        .indicator-animation {
          animation: scale-indicator-animation 0.2s ease-out 0.3s;
        }

        .indicator::before {
          content: "";
          position: absolute;
          border-right: 5px solid var(--indicator);
          border-radius: 0% 35% 51% 0 / 0% 100% 78% 0;
          width: 18px;
          height: 16.5px;
          left: -17.5px;
          top: -2px;
          transform: rotate(36deg);
          transition: border-color 0.3s ease-in-out;
        }

        .indicator::after {
          content: "";
          position: absolute;
          border-left: 5px solid var(--indicator);
          border-radius: 35% 0% 0% 51% / 100% 0% 0% 78%;
          width: 18px;
          height: 16.5px;
          left: 16.5px;
          top: -2px;
          transform: rotate(-36deg);
          transition: border-color 0.3s ease-in-out;
        }

        .indicator-drop {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ffffff;
          transition: top 0.2s ease-in-out, opacity 0.2s ease;
          box-shadow: 0 0 10px rgba(255,255,255,0.8);
          z-index: 1;
        }

        /* KEYFRAMES */
        @keyframes fill-animation {
          from { clip-path: circle(0% at 50% 100%); }
          to { clip-path: circle(110% at bottom); fill: #ffffff; }
        }

        @keyframes scale-animation {
          from { transform: scale(0.9); }
          to { transform: scale(1.1); }
        }

        @keyframes scale-indicator-animation {
          from { transform: scaleY(0.7) scaleX(1.3); }
          to { transform: scaleY(1) scaleX(1); }
        }
      `}</style>

      {/* SYMBOLES SVG INVISIBLES POUR RÉUTILISATION */}
      <svg style={{ display: 'none' }}>
        <symbol id='home-deactive' viewBox='0 0 25 25'>
            <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z" strokeWidth="0.05"/>
        </symbol>
        <symbol id='home-active' viewBox='0 0 25 25'>
            <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"/>
        </symbol>
        <symbol id='message-deactive' viewBox="0 0 53 53">
            <path d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z M 25 5.9375 C 36.714844 5.9375 46.0625 14.089844 46.0625 24 C 46.0625 33.910156 36.714844 42.0625 25 42.0625 C 22.996094 42.0625 21.050781 41.820313 19.21875 41.375 L 18.65625 41.25 L 18.28125 41.71875 C 18.28125 41.71875 15.390625 44.976563 10.78125 45.75 C 11.613281 44.257813 12.246094 42.871094 12.53125 41.8125 C 12.929688 40.332031 12.9375 39.3125 12.9375 39.3125 L 12.9375 38.8125 L 12.5 38.53125 C 7.273438 35.21875 3.9375 29.941406 3.9375 24 C 3.9375 14.089844 13.28125 5.9375 25 5.9375 Z"/>
        </symbol>
        <symbol id='message-active' viewBox="0 0 53 53">
            <path d="M 25 4 C 12.316406 4 2 12.972656 2 24 C 2 30.1875 5.335938 36.066406 10.949219 39.839844 C 10.816406 40.890625 10.285156 43.441406 8.183594 46.425781 L 7.078125 47.992188 L 9.054688 48 C 14.484375 48 18.15625 44.671875 19.363281 43.394531 C 21.195313 43.796875 23.089844 44 25 44 C 37.683594 44 48 35.027344 48 24 C 48 12.972656 37.683594 4 25 4 Z"/>
        </symbol>
        <symbol id='heart-deactive' viewBox="0 0 35 35">
            <path d="M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16 Z" fill="none" strokeOpacity="1" strokeWidth="2"/>
        </symbol>
        <symbol id='heart-active' viewBox="0 0 35 35">
            <path d="M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16 Z" strokeOpacity="1" strokeWidth="2" fillOpacity="1"/>
        </symbol>
        <symbol id='alert-deactive' viewBox="0 0 40 40">
            <path d="M26.8,25H5.2c-0.8,0-1.5-0.4-1.9-1.1c-0.4-0.7-0.3-1.5,0.1-2.2L4.5,20c1.8-2.7,2.7-5.8,2.7-9c0-3.7,2.4-7.1,5.9-8.3   C13.7,1.6,14.8,1,16,1s2.3,0.6,2.9,1.7c3.5,1.2,5.9,4.6,5.9,8.3c0,3.2,0.9,6.3,2.7,9l1.1,1.7c0.4,0.7,0.5,1.5,0.1,2.2   C28.4,24.6,27.6,25,26.8,25z" fill="none" fillOpacity="1" strokeOpacity="1" strokeWidth="2" opacity="1"/>
            <path d="M11.100000381469727,28.129943668842316 c0.5,2.299999952316284 2.5,4 4.900000095367432,4 s4.400000095367432,-1.7000000476837158 4.900000095367432,-4 H11.100000381469727 z" fill="none" strokeWidth="2" opacity="1" strokeOpacity="1"/>
        </symbol>
        <symbol id='alert-active' viewBox="0 0 40 40">
            <path d="M26.8,25H5.2c-0.8,0-1.5-0.4-1.9-1.1c-0.4-0.7-0.3-1.5,0.1-2.2L4.5,20c1.8-2.7,2.7-5.8,2.7-9c0-3.7,2.4-7.1,5.9-8.3   C13.7,1.6,14.8,1,16,1s2.3,0.6,2.9,1.7c3.5,1.2,5.9,4.6,5.9,8.3c0,3.2,0.9,6.3,2.7,9l1.1,1.7c0.4,0.7,0.5,1.5,0.1,2.2   C28.4,24.6,27.6,25,26.8,25z" fill="none" fillOpacity="1" stroke="#ffffff" strokeOpacity="1"/>
            <path d="M11.100000381469727,27.56497174501419 c0.5,2.299999952316284 2.5,4 4.900000095367432,4 s4.400000095367432,-1.7000000476837158 4.900000095367432,-4 H11.100000381469727 z" fillOpacity="1" strokeWidth="2" opacity="1"/>
        </symbol>
      </svg>

      {/* LA BARRE DE NAVIGATION */}
      <div className="glass-tab-container">
        
        {/* Tab 1 : Coin Vert (Vert Flash) */}
        <div className="tab" ref={el => tabsRef.current['tab-one'] = el}>
          <input 
            id="tab-one" 
            name="tab" 
            type="radio" 
            checked={activeTab === 'tab-one'} 
            onChange={() => handleTabClick('tab-one')} 
          />
          <label htmlFor="tab-one">
            <svg className="svg-icon">
              <use href="#home-deactive" className="svg-icon-deactive tab-deactive" />
              <use href="#home-active" className="svg-icon-active tab-active" />
            </svg>
          </label>
        </div>

        {/* Tab 2 : Coin Snack (Rose Bonbon) */}
        <div className="tab" ref={el => tabsRef.current['tab-two'] = el}>
          <input 
            id="tab-two" 
            name="tab" 
            type="radio" 
            checked={activeTab === 'tab-two'} 
            onChange={() => handleTabClick('tab-two')} 
          />
          <label htmlFor="tab-two">
            <svg className="svg-icon">
              <use href="#message-deactive" className="svg-icon-deactive tab-deactive" />
              <use href="#message-active" className="svg-icon-active tab-active" />
            </svg>
          </label>
        </div>

        {/* Tab 3 : Cyan */}
        <div className="tab" ref={el => tabsRef.current['tab-three'] = el}>
          <input 
            id="tab-three" 
            name="tab" 
            type="radio" 
            checked={activeTab === 'tab-three'} 
            onChange={() => handleTabClick('tab-three')} 
          />
          <label htmlFor="tab-three">
            <svg className="svg-icon">
              <use href="#heart-deactive" className="svg-icon-deactive tab-deactive" />
              <use href="#heart-active" className="svg-icon-active tab-active" />
            </svg>
          </label>
        </div>

        {/* Tab 4 : Alert/Admin (Orange) */}
        <div className="tab" ref={el => tabsRef.current['tab-four'] = el}>
          <input 
            id="tab-four" 
            name="tab" 
            type="radio" 
            checked={activeTab === 'tab-four'} 
            onChange={() => handleTabClick('tab-four')} 
          />
          <label htmlFor="tab-four">
            <svg className="svg-icon">
              <use href="#alert-deactive" className="svg-icon-deactive tab-deactive" />
              <use href="#alert-active" className="svg-icon-active tab-active" />
            </svg>
          </label>
        </div>

        {/* Indicateur coloré et petite goutte animée */}
        <div 
          className={`indicator ${isAnimating ? 'indicator-animation' : ''}`}
          style={{ 
            left: indicatorStyle.left, 
            backgroundColor: indicatorStyle.color,
            '--indicator': indicatorStyle.color 
          }}
        ></div>
        
        <div 
          className="indicator-drop"
          style={{ 
            left: dropStyle.left, 
            top: dropStyle.top, 
            opacity: dropStyle.opacity 
          }}
        ></div>
        
      </div>
    </>
  );
}