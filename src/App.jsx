import React, { useState } from 'react';
// import InteractiveSmoke from './components/InteractiveSmoke'; // Ton effet de fond

export default function App() {
  // On définit "Coin Snack" comme onglet actif par défaut
  const [activeTab, setActiveTab] = useState('Coin Snack');

  const categories = [
    { id: 'coin-vert', label: 'Coin Vert' },
    { id: 'vetements', label: 'Vêtements' },
    { id: 'coin-snack', label: 'Coin Snack' },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
      {/* <InteractiveSmoke /> */}
      
      {/* Contenu principal par-dessus la fumée */}
      <div className="relative z-10 flex flex-col h-screen">
        
        {/* En-tête */}
        <header className="p-6 pt-10 text-center">
          <h1 className="text-3xl font-bold tracking-widest uppercase mb-2">Le Shop</h1>
          <p className="text-gray-400 text-sm">Choisis ta catégorie</p>
        </header>

        {/* Navigation : Les 3 Boutons */}
        <div className="px-6 flex flex-col gap-4 mb-8">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveTab(cat.label)}
              className={`py-4 px-6 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-lg backdrop-blur-md 
                ${activeTab === cat.label 
                  ? 'bg-green-500/90 text-black border-2 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                  : 'bg-gray-900/60 text-gray-300 border border-gray-700/50 hover:bg-gray-800/80'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Zone de la grille de produits (pour demain) */}
        <main className="flex-1 bg-gray-900/80 backdrop-blur-xl rounded-t-[40px] p-6 border-t border-gray-700/50">
          <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-700 rounded-3xl">
            <p className="text-center text-gray-500 animate-pulse">
              Les {activeTab === 'Vêtements' ? 'vêtements' : activeTab === 'Coin Vert' ? 'produits verts' : 'snacks'} apparaîtront ici...
            </p>
          </div>
        </main>

      </div>
    </div>
  );
}