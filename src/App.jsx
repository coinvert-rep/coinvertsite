import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
      {/* En-tête / Navbar */}
      <nav className="p-6 border-b border-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold tracking-wide">Le Coin Vert x Snack</h1>
        <div className="text-sm text-gray-400 tracking-wider">
          Vape & Weed <span className="mx-3 text-gray-700">|</span> Snacks Exotiques <span className="mx-3 text-gray-700">|</span> Vêtements
        </div>
      </nav>

      {/* Contenu Principal */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 mt-12 mb-12">
        {/* Titre Hero */}
        <div className="text-center max-w-3xl mb-16 space-y-4">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            L'EXPÉRIENCE <br/>
            <span className="text-[#1cd45e]">COIN VERT</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mt-6 px-4">
            Ta destination numéro un à Montmagny pour la vape, les accessoires et les munchies introuvables ailleurs au Québec.
          </p>
        </div>

        {/* Grille des 3 Catégories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl w-full px-4">
          
          {/* Carte 1 : Coin Vert */}
          <div className="bg-[#121212] border border-gray-800 rounded-2xl p-8 hover:border-[#1cd45e]/50 hover:bg-[#181818] transition-all duration-300 cursor-pointer group">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">💨</span> 
              Le Coin Vert
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Bongs, vapes, feuilles et accessoires. Tout l'équipement dont tu as besoin, avec les meilleurs conseils en boutique.
            </p>
          </div>

          {/* Carte 2 : Vêtements */}
          <div className="bg-[#121212] border border-gray-800 rounded-2xl p-8 hover:border-white/50 hover:bg-[#181818] transition-all duration-300 cursor-pointer group">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">👕</span> 
              Vêtements
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Affiche tes couleurs avec notre merch exclusif et notre sélection streetwear. Le style de la rue, directement en boutique.
            </p>
          </div>

          {/* Carte 3 : Coin Snack */}
          <div className="bg-[#121212] border border-gray-800 rounded-2xl p-8 hover:border-red-500/50 hover:bg-[#181818] transition-all duration-300 cursor-pointer group">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🍬</span> 
              Le Coin Snack
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Importations exclusives, bonbons rares et boissons exotiques pour gérer tes munchies comme il se doit.
            </p>
          </div>

        </div>
      </main>

      {/* Pied de page */}
      <footer className="text-center p-8 text-gray-600 text-sm mt-auto border-t border-gray-800/30">
        © 2026 Le Coin Vert x Le Coin Snack - Montmagny.
      </footer>
    </div>
  );
}