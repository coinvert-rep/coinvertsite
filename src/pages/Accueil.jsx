import React, { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TabBar from '../components/TabBar';

export default function Accueil() {
  const location = useLocation();
  // Vérifie si on est sur la page principale pour afficher le texte de base
  const isMaison = location.pathname === '/'; 

  const particles = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => ({
      id: i, 
      size: Math.random() * 10 + 1, 
      startPositionY: Math.random() * 10 + 100, 
      moveDuration: 7000 + Math.random() * 4000, 
      delayContainer: Math.random() * 11000, 
      delayCircle: Math.random() * 4000, 
      startX: Math.random() * 100, 
      endX: Math.random() * 100, 
      endYOffset: Math.random() * 35 
    }));
  }, []);

  return (
    <>
      {/* COUCHE 1 : Arrière-plan et Particules */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, backgroundColor: '#021027', overflow: 'hidden' }}>
        <div className="hub-background" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
          <style>{`
            body { margin: 0; padding: 0; }
            .hub-background { background-image: radial-gradient(#021027, #000000); }
            @keyframes fadein-frames { 0% { opacity: 1; } 50% { opacity: 0.7; } 100% { opacity: 1; } }
            @keyframes scale-frames { 0% { transform: scale3d(0.4, 0.4, 1); } 50% { transform: scale3d(2.2, 2.2, 1); } 100% { transform: scale3d(0.4, 0.4, 1); } }
            .circle { width: 100%; height: 100%; border-radius: 50%; mix-blend-mode: screen; background-image: radial-gradient(hsl(180, 100%, 80%), hsl(180, 100%, 80%) 10%, hsla(180, 100%, 80%, 0) 56%); animation: fadein-frames 200ms infinite, scale-frames 2s infinite; }
            ${particles.map(p => `
              @keyframes move-frames-${p.id} { from { transform: translate3d(${p.startX}vw, ${p.startPositionY}vh, 0); } to { transform: translate3d(${p.endX}vw, ${-p.startPositionY - p.endYOffset}vh, 0); } }
              .circle-container-${p.id} { position: absolute; transform: translateY(-10vh); animation-iteration-count: infinite; animation-timing-function: linear; width: ${p.size}px; height: ${p.size}px; animation-name: move-frames-${p.id}; animation-duration: ${p.moveDuration}ms; animation-delay: ${p.delayContainer}ms; }
              .circle-container-${p.id} .circle { animation-delay: ${p.delayCircle}ms; }
            `).join('')}
          `}</style>
          {particles.map((p) => (
            <div key={p.id} className={`circle-container-${p.id}`}><div className="circle"></div></div>
          ))}
        </div>
      </div>

      {/* COUCHE 2 : Le Contenu */}
      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', width: '100%' }}>
        
        {/* S'affiche UNIQUEMENT sur l'onglet Maison */}
        {isMaison && (
          <>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-11/12 max-w-3xl overflow-hidden rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 p-3 text-white">
              <div className="defilement-texte flex gap-12 whitespace-nowrap">
                <span>🎉 Promo de la semaine : -20% sur la nouvelle collection !</span>
                <span>📢 Actualité : Nouveau drop ce vendredi à 18h !</span>
                <span>⭐ N'oubliez pas de vérifier vos points de fidélité.</span>
                <span>🎉 Promo de la semaine : -20% sur la nouvelle collection !</span>
              </div>
            </div>
            <main style={{ padding: '20px', paddingBottom: '150px', color: 'white', textAlign: 'center', paddingTop: '120px' }}>
              <h1>Le Coin Vert x Snack</h1>
              <p>Bienvenue sur l'accueil !</p>
            </main>
          </>
        )}

        {/* Le routeur : C'est ici que CoinVert et CoinSnack vont s'injecter */}
        <Outlet />
        
      </div>

      {/* COUCHE 3 : La TabBar */}
      <TabBar />
    </>
  );
}