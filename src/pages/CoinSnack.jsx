import React, { useState, useMemo } from 'react';

// Couleurs vives pour les éclats de bonbons
const CANDY_COLORS = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#1dd1a1'];

const CATEGORIES = {
  SUCRÉ: ["Tout", "Bonbons", "Chocolat", "Exotique", "Gommes"],
  SALÉ_SOIF: ["Tout", "Chips", "Boissons", "Épicé", "Nouilles"]
};

const MOCK_PRODUCTS = [
  { id: 101, nom: "Gummies Pêche Japon", prix: 4.50, rayon: "SUCRÉ", sousCategorie: "Bonbons", image: "🍑" },
  { id: 102, nom: "KitKat Matcha", prix: 6.00, rayon: "SUCRÉ", sousCategorie: "Chocolat", image: "🍫" },
  { id: 103, nom: "Chips Takis Fuego", prix: 5.50, rayon: "SALÉ_SOIF", sousCategorie: "Épicé", image: "🌶️" },
  { id: 104, nom: "Ramune Litchi", prix: 3.50, rayon: "SALÉ_SOIF", sousCategorie: "Boissons", image: "🥤" },
  { id: 105, nom: "Oreo Fraise", prix: 7.00, rayon: "SUCRÉ", sousCategorie: "Exotique", image: "🍪" },
  { id: 106, nom: "Cheetos Flamin' Hot", prix: 4.99, rayon: "SALÉ_SOIF", sousCategorie: "Chips", image: "🧀" },
  { id: 107, nom: "Nouilles Samyang", prix: 2.50, rayon: "SALÉ_SOIF", sousCategorie: "Nouilles", image: "🍜" },
  { id: 108, nom: "Hubba Bubba Cola", prix: 2.00, rayon: "SUCRÉ", sousCategorie: "Gommes", image: "🍬" },
];

export default function CoinSnack() {
  const [rayonActif, setRayonActif] = useState("SUCRÉ");
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

  // Générateur d'éclats de bonbons (particules)
  const particules = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: CANDY_COLORS[Math.floor(Math.random() * CANDY_COLORS.length)],
      size: `${Math.random() * 8 + 4}px`, // Taille entre 4px et 12px
      delay: `${Math.random() * 5}s`, // Délai d'animation aléatoire
      duration: `${Math.random() * 10 + 15}s`, // Vitesse de flottaison
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#08090a] text-white pb-[150px] font-oswald selection:bg-[#ff9ff3] selection:text-white">
      
      {/* --- EN-TÊTE IMMERSIF (SNACK EDITION) --- */}
      <header className="relative pt-12 pb-10 px-6 text-center overflow-hidden border-b border-white/5 bg-black/40">
        
        {/* ARRIÈRE-PLAN ANIMÉ : Éclats de Bonbons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particules.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full candy-particle"
              style={{
                left: p.left,
                top: p.top,
                backgroundColor: p.color,
                width: p.size,
                height: p.size,
                boxShadow: `0 0 10px ${p.color}`,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="font-cheddar text-[#ff9ff3] uppercase text-xl sm:text-2xl mb-4 opacity-90 tracking-[0.15em]">
            Munchies & Douceurs
          </h2>
          
          {/* CONTENEUR TITRE + LOGOS OURSONS */}
          <div className="flex items-center justify-center gap-2 sm:gap-6 mb-2">
            
            {/* Ourson Gauche (Regarde vers la droite) */}
            <img 
              src="/logo snack v1.jpg" 
              alt="Ourson Gauche" 
              className="w-20 sm:w-32 h-auto object-contain drop-shadow-[0_0_20px_rgba(255,159,243,0.3)]" 
              style={{
                mixBlendMode: 'screen', // Supprime le fond noir du jpg
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
              }}
            />

            <h1 className="font-kiln text-5xl sm:text-7xl uppercase flex gap-3 drop-shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
              <span className="text-gray-200">Le Coin</span>
              <span className="text-[#ff9ff3]">Snack</span>
            </h1>

            {/* Ourson Droit (Miroir, regarde vers la gauche) */}
            <img 
              src="/logo snack v1 mirroir.jpg" 
              alt="Ourson Droit" 
              className="w-20 sm:w-32 h-auto object-contain drop-shadow-[0_0_20px_rgba(72,219,251,0.3)]" 
              style={{ 
                mixBlendMode: 'screen', // Supprime le fond noir du jpg
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
              }}
            />

          </div>
          
          <h3 className="font-cheddar text-[#48dbfb] uppercase text-3xl sm:text-4xl opacity-95 mt-2 tracking-[0.1em]">
            Exotique Shop
          </h3>
        </div>
      </header>

      {/* --- SÉLECTEUR NIVEAU 1 : SUCRÉ vs SALÉ --- */}
      <div className="flex justify-center px-6 mt-8">
        <div className="bg-[#0b0d0f] p-1.5 rounded-xl border border-white/5 flex w-full max-w-md shadow-2xl relative z-10">
          <button 
            onClick={() => changerRayon("SUCRÉ")}
            className={`font-cheddar flex-1 py-3 text-xl tracking-[0.1em] rounded-lg transition-all duration-500 uppercase ${
              rayonActif === "SUCRÉ" 
                /* THÈME ROSE BONBON POUR LE SUCRÉ */
                ? 'bg-gradient-to-b from-[#1a1c20] to-[#0b0d0f] text-[#ff9ff3] border border-[#ff9ff3]/30 shadow-[0_0_20px_rgba(255,159,243,0.15)]' 
                : 'text-gray-500 hover:text-gray-300 border border-transparent'
            }`}
          >
            Sucré
          </button>
          <button 
            onClick={() => changerRayon("SALÉ_SOIF")}
            className={`font-cheddar flex-1 py-3 text-xl tracking-[0.1em] rounded-lg transition-all duration-500 uppercase ${
              rayonActif === "SALÉ_SOIF" 
                /* THÈME BLEU CYAN POUR LE SALÉ ET SOIF */
                ? 'bg-gradient-to-b from-[#1a1c20] to-[#0b0d0f] text-[#48dbfb] border border-[#48dbfb]/30 shadow-[0_0_20px_rgba(72,219,251,0.15)]' 
                : 'text-gray-500 hover:text-gray-300 border border-transparent'
            }`}
          >
            Salé & Soif
          </button>
        </div>
      </div>

      {/* --- SÉLECTEUR NIVEAU 2 : SOUS-CATÉGORIES --- */}
      <div className="flex gap-2 px-6 mt-8 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center relative z-10" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES[rayonActif].map(cat => {
          const isActive = sousCategorieActive === cat;
          const accentColor = rayonActif === "SUCRÉ" ? 'bg-[#ff9ff3] text-black' : 'bg-[#48dbfb] text-black';
          
          return (
            <button 
              key={cat}
              onClick={() => setSousCategorieActive(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-md text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 mt-4 max-w-7xl mx-auto relative z-10">
        {produitsFiltres.map(produit => (
          <div 
            key={produit.id} 
            className="bg-[#0b0d0f]/80 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center transition-all duration-300 group hover:bg-[#121418] hover:border-white/10"
          >
            <div className="w-full aspect-square rounded-xl bg-[#050607] border border-white/5 flex items-center justify-center text-4xl mb-4 group-hover:scale-95 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
              {produit.image}
            </div>
            
            <h3 className="font-cheddar text-gray-200 text-xl leading-tight mb-1 tracking-wider">
              {produit.nom}
            </h3>
            
            <span className="text-[11px] uppercase tracking-widest text-gray-500 mb-auto">{produit.sousCategorie}</span>
            
            <p className={`font-semibold mt-3 text-xl tracking-wider ${produit.rayon === 'SUCRÉ' ? 'text-[#ff9ff3]' : 'text-[#48dbfb]'}`}>
              {produit.prix.toFixed(2)} $
            </p>

            <button className={`mt-4 w-full py-2.5 rounded-md border border-white/10 text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
              produit.rayon === 'SUCRÉ' 
                ? 'bg-[#15171a] text-gray-300 hover:bg-[#ff9ff3] hover:text-black hover:border-[#ff9ff3]' 
                : 'bg-[#15171a] text-gray-300 hover:bg-[#48dbfb] hover:text-black hover:border-[#48dbfb]'
            }`}>
              Ajouter
            </button>
          </div>
        ))}
      </div>

      {/* --- CSS POUR LES PARTICULES DE BONBONS --- */}
      <style>{`
        .candy-particle {
          animation: floatCandy infinite linear alternate;
          opacity: 0.6;
        }
        @keyframes floatCandy {
          0% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-50px) rotate(180deg) scale(1.2); opacity: 0.9; }
          100% { transform: translateY(50px) rotate(360deg) scale(0.8); }
        }
      `}</style>
    </div>
  );
}