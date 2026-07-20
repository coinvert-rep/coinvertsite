import React, { useMemo } from 'react';

export default function Accueil() {
  const particles = useMemo(() => {
    // On crée un tableau de 200 éléments avec des valeurs mathématiques aléatoires
    return Array.from({ length: 200 }).map((_, i) => {
      return {
        id: i,
        // Équivalent de $circleSize: random($particleWidth);
        size: Math.random() * 10 + 1, 
        
        // Équivalent de $startPositionY: random(10) + 100;
        startPositionY: Math.random() * 10 + 100, 
        
        // Équivalent de $moveDuration: 7000 + random(4000) + ms;
        moveDuration: 7000 + Math.random() * 4000, 
        
        // Équivalent de animation-delay: random(11000) + ms;
        delayContainer: Math.random() * 11000, 
        
        // Équivalent de animation-delay: random(4000) + ms; pour .circle
        delayCircle: Math.random() * 4000, 
        
        // Coordonnées X (vw) de départ et d'arrivée
        startX: Math.random() * 100,
        endX: Math.random() * 100,
        
        // Variation de la hauteur finale
        endYOffset: Math.random() * 35 
      };
    });
  }, []);

  return (
    <div className="hub-background">
      <style>{`
        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden; /* Empêche la barre de défilement */
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

      {}
      {particles.map((p) => (
        <div key={p.id} className={`circle-container-${p.id}`}>
          <div className="circle"></div>
        </div>
      ))}
    </div>
  );
}