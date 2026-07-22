import React, { useState } from 'react';

const CATEGORIES = {
  VAPESHOP: ["Tout", "Pièces", "Kit (Prêt à remplir)", "Accessoire (Autre)", "Juice"],
  SMOKESHOP: ["Tout", "Bong", "Pipe", "Papier", "Stockage", "Plaque à rouler", "Autres"]
};

const MOCK_PRODUCTS = [
  { id: 1, nom: "Kit Vaporesso Luxe", prix: 55.00, rayon: "VAPESHOP", sousCategorie: "Kit (Prêt à remplir)", image: "💨" },
  { id: 2, nom: "E-Liquide Fruits Rouges", prix: 19.99, rayon: "VAPESHOP", sousCategorie: "Juice", image: "🍓" },
  { id: 3, nom: "Résistance Mesh", prix: 4.50, rayon: "VAPESHOP", sousCategorie: "Pièces", image: "⚙️" },
  { id: 4, nom: "Bong en Verre Premium", prix: 35.00, rayon: "SMOKESHOP", sousCategorie: "Bong", image: "🏺" },
  { id: 5, nom: "Feuilles OCB Slim", prix: 2.00, rayon: "SMOKESHOP", sousCategorie: "Papier", image: "📄" },
  { id: 6, nom: "Plateau Rick & Morty", prix: 12.50, rayon: "SMOKESHOP", sousCategorie: "Plaque à rouler", image: "🛹" },
  { id: 7, nom: "Boîte Sous Vide", prix: 22.00, rayon: "SMOKESHOP", sousCategorie: "Stockage", image: "📦" },
  { id: 8, nom: "Pipe en Bois", prix: 18.00, rayon: "SMOKESHOP", sousCategorie: "Pipe", image: "🪵" },
];

export default function CoinVert() {
  const [rayonActif, setRayonActif] = useState("SMOKESHOP");
  const [sousCategorieActive, setSousCategorieActive] = useState("Tout");

  const changerRayon = (nouveauRayon) => {
    setRayonActif(nouveauRayon);
    setSousCategorieActive("Tout");
  };

  const produitsFiltres = MOCK_PRODUCTS.filter(produit => {
    const correspondRayon = produit.rayon === rayonActif;
    const correspondSousCat = sousCategorieActive === "Tout" || produit.sousCategorie === sousCategorieActive;
    return correspondRayon && correspondSousCat;
  });

  return (
    <div className="min-h-screen bg-[#08090a] text-white pb-[150px] font-oswald selection:bg-[#4a8b41] selection:text-white">
      
      {/* --- EN-TÊTE IMMERSIF --- */}
      <header className="relative pt-12 pb-10 px-6 text-center overflow-hidden border-b border-white/5 bg-black/40">
        
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen overflow-hidden flex items-center justify-center">
          <div className="absolute w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_rgba(74,139,65,0.15)_0%,_rgba(0,0,0,0)_60%)] smoke-anim-1"></div>
          <div className="absolute w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_rgba(180,50,40,0.1)_0%,_rgba(0,0,0,0)_60%)] smoke-anim-2"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="font-cheddar text-[#b43228] uppercase text-xl sm:text-2xl mb-4 opacity-90 tracking-[0.15em]">
            Engrais Spécialisés
          </h2>
          
          {/* CONTENEUR TITRE + LOGOS AVEC FONDU */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-2">
            
            {/* Rectangle Vert Gauche : Logo avec fondu radial */}
            <img 
              src="/masque.png" 
              alt="Logo Gauche" 
              className="w-14 sm:w-24 h-auto object-contain opacity-90 drop-shadow-[0_0_15px_rgba(74,139,65,0.2)]" 
              style={{
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)'
              }}
            />

            <h1 className="font-kiln text-5xl sm:text-7xl uppercase flex gap-3 drop-shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
              <span className="text-gray-200">Le Coin</span>
              <span className="text-[#4a8b41]">Vert</span>
            </h1>

            {/* Rectangle Vert Droit : Logo en miroir avec fondu radial */}
            <img 
              src="/masque.png" 
              alt="Logo Droit" 
              className="w-14 sm:w-24 h-auto object-contain opacity-90 drop-shadow-[0_0_15px_rgba(180,50,40,0.2)]" 
              style={{ 
                transform: 'scaleX(-1)', 
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)'
              }}
            />

          </div>
          
          <h3 className="font-cheddar text-[#b43228] uppercase text-3xl sm:text-4xl opacity-95 mt-2 tracking-[0.1em]">
            Smoke Shop
          </h3>
        </div>
      </header>

      {/* --- SÉLECTEUR NIVEAU 1 : VAPESHOP vs SMOKESHOP --- */}
      <div className="flex justify-center px-6 mt-8">
        <div className="bg-[#0b0d0f] p-1.5 rounded-xl border border-white/5 flex w-full max-w-md shadow-2xl">
          <button 
            onClick={() => changerRayon("VAPESHOP")}
            className={`font-cheddar flex-1 py-3 text-xl tracking-[0.1em] rounded-lg transition-all duration-500 uppercase ${
              rayonActif === "VAPESHOP" 
                ? 'bg-gradient-to-b from-[#1a1c20] to-[#0b0d0f] text-[#b43228] border border-[#b43228]/30 shadow-[0_0_20px_rgba(180,50,40,0.15)]' 
                : 'text-gray-500 hover:text-gray-300 border border-transparent'
            }`}
          >
            Vapeshop
          </button>
          <button 
            onClick={() => changerRayon("SMOKESHOP")}
            className={`font-cheddar flex-1 py-3 text-xl tracking-[0.1em] rounded-lg transition-all duration-500 uppercase ${
              rayonActif === "SMOKESHOP" 
                ? 'bg-gradient-to-b from-[#1a1c20] to-[#0b0d0f] text-[#4a8b41] border border-[#4a8b41]/30 shadow-[0_0_20px_rgba(74,139,65,0.15)]' 
                : 'text-gray-500 hover:text-gray-300 border border-transparent'
            }`}
          >
            Smokeshop
          </button>
        </div>
      </div>

      {/* --- SÉLECTEUR NIVEAU 2 : SOUS-CATÉGORIES --- */}
      <div className="flex gap-2 px-6 mt-8 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES[rayonActif].map(cat => {
          const isActive = sousCategorieActive === cat;
          const accentColor = rayonActif === "VAPESHOP" ? 'bg-[#b43228] text-white' : 'bg-[#4a8b41] text-white';
          
          return (
            <button 
              key={cat}
              onClick={() => setSousCategorieActive(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-md text-sm tracking-widest uppercase transition-all duration-300 ${
                isActive 
                  ? accentColor 
                  : 'bg-[#15171a] text-gray-400 border border-white/5 hover:bg-[#1f2226] hover:text-gray-200' 
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* --- GRILLE DE PRODUITS --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 mt-4 max-w-7xl mx-auto">
        {produitsFiltres.map(produit => (
          <div 
            key={produit.id} 
            className="bg-[#0b0d0f]/80 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center transition-all duration-300 group hover:bg-[#121418] hover:border-white/10"
          >
            <div className="w-full aspect-square rounded-xl bg-[#050607] border border-white/5 flex items-center justify-center text-4xl mb-4 group-hover:scale-95 transition-transform duration-500 shadow-inner">
              {produit.image}
            </div>
            
            <h3 className="font-cheddar text-gray-200 text-xl leading-tight mb-1 tracking-wider">
              {produit.nom}
            </h3>
            
            <span className="text-[11px] uppercase tracking-widest text-gray-500 mb-auto">{produit.sousCategorie}</span>
            
            <p className={`font-semibold mt-3 text-xl tracking-wider ${produit.rayon === 'VAPESHOP' ? 'text-[#b43228]' : 'text-[#4a8b41]'}`}>
              {produit.prix.toFixed(2)} $
            </p>

            <button className={`mt-4 w-full py-2.5 rounded-md border border-white/10 text-sm tracking-widest uppercase transition-colors duration-300 ${
              produit.rayon === 'VAPESHOP' 
                ? 'bg-[#15171a] text-gray-300 hover:bg-[#b43228] hover:text-white hover:border-[#b43228]' 
                : 'bg-[#15171a] text-gray-300 hover:bg-[#4a8b41] hover:text-white hover:border-[#4a8b41]'
            }`}>
              Ajouter
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .smoke-anim-1 { animation: smoke-drift 20s infinite alternate ease-in-out; filter: blur(40px); }
        .smoke-anim-2 { animation: smoke-drift 25s infinite alternate-reverse ease-in-out; filter: blur(50px); }
        @keyframes smoke-drift {
          0% { transform: translate(-5%, -5%) scale(1); opacity: 0.3; }
          50% { transform: translate(5%, 10%) scale(1.1); opacity: 0.6; }
          100% { transform: translate(-10%, 5%) scale(1.05); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}