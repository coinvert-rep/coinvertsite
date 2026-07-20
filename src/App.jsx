import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Accueil = () => {
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
      endYOffset: Math.random() * 30,
    }));
  }, []);

  return (
    <div className="hub-background">
      <style>{`
        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
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
            from { transform: translate3d(${p.startX}vw, ${p.startPositionY}vh, 0); }
            to { transform: translate3d(${p.endX}vw, ${-p.startPositionY - p.endYOffset}vh, 0); }
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
          .circle-container-${p.id} .circle { animation-delay: ${p.delayCircle}ms; }
        `).join('')}
      `}</style>
      {particles.map((p) => (
        <div key={p.id} className={`circle-container-${p.id}`}>
          <div className="circle"></div>
        </div>
      ))}
    </div>
  );
};

const CoinVert = () => (
    <div style={{ color: 'white', padding: '2rem', textAlign: 'center', background: '#0a1f18', height: '100vh' }}>
        <h1>Page Coin Vert (En construction)</h1>
        <a href="/" style={{ color: '#a3e6cd' }}>Retour au Hub</a>
    </div>
);

const CoinSnack = () => (
    <div style={{ color: 'white', padding: '2rem', textAlign: 'center', background: '#1f110a', height: '100vh' }}>
        <h1>Page Coin Snack (En construction)</h1>
        <a href="/" style={{ color: '#fcae86' }}>Retour au Hub</a>
    </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/vert" element={<CoinVert />} />
        <Route path="/snack" element={<CoinSnack />} />
      </Routes>
    </BrowserRouter>
  );
}