import React, { useMemo } from 'react';
import TabBar from './TabBar'; // Assure-toi que le fichier est bien dans le même dossier

export default function Accueil() {
  const particles = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => {
      return {
        id: i,
        size: Math.random() * 10 + 1, 
        startPositionY: Math.random() * 10 + 100, 
        moveDuration: 7000 + Math.random() * 4000, 
        delayContainer: Math.random() * 11000, 
        delayCircle: Math.random() * 4000, 
        startX: Math.random() * 100,
        endX: Math.random() * 100,
        endYOffset: Math.random() * 35 
      };
    });
  }, []);

  return (
    <div className="accueil-wrapper" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* COUCHE 1 : L'arrière-plan animé (Particules) */}
      <div className="hub-background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <style>{`
          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }

          .hub-background {
            width: 100vw;
            height: 100vh;
            background-image: radial-gradient(#021027, #000000);
            position: relative;
            overflow: hidden;
          }

          @keyframes fadein-frames {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
          }

          @keyframes scale-frames {
            0% { transform: scale3d(0.4, 0.4, 1); }
            50% { transform: scale3d(2.2, 2.2, 1); }
            100% { transform: scale3d(0.4, 0.4, 1); }
          }

          .circle {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            mix-blend-mode: screen;
            background-image: radial-gradient(
              hsl(180, 100%, 80%),
              hsl(180, 100%, 80%) 10%,
              hsla(180, 100%, 80%, 0) 56%
            );
            animation: fadein-frames 200ms infinite, scale-frames 2s infinite;
          }

          ${particles.map(p => `
            @keyframes move-frames-${p.id} {
              from {
                transform: translate3d(${p.startX}vw, ${p.startPositionY}vh, 0);
              }
              to {
                transform: translate3d(${p.endX}vw, ${-p.startPositionY - p.endYOffset}vh, 0);
              }
            }

            .circle-container-${p.id} {
              position: absolute;
              transform: translateY(-10vh);
              animation-iteration-count: infinite;
              animation-timing-function: linear;
              width: ${p.size}px;
              height: ${p.size}px;
              animation-name: move-frames-${p.id};
              animation-duration: ${p.moveDuration}ms;
              animation-delay: ${p.delayContainer}ms;
            }

            .circle-container-${p.id} .circle {
              animation-delay: ${p.delayCircle}ms;
            }
          `).join('')}
        `}</style>

        {particles.map((p) => (
          <div key={p.id} className={`circle-container-${p.id}`}>
            <div className="circle"></div>
          </div>
        ))}
      </div>

      {/* COUCHE 2 : Le texte et le contenu principal */}
      <main 
        className="accueil-content" 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 10, 
          overflowY: 'auto',
          paddingBottom: '130px'
        }}
      >
        <div style={{ padding: '40px', color: 'white', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h1>Le Coin Vert x Snack</h1>
          <p>Bienvenue sur notre application.</p>
        </div>
      </main>

      {/* COUCHE 3 : La TabBar (Apparaîtra par-dessus tout le reste) */}
      <TabBar />

    </div>
  );
}