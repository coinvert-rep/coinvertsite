import React, { useState } from 'react';

// Structure des catégories basée sur ton schéma
const CATEGORIES = {
  VAPESHOP: ["Tout", "Pièces", "Kit (Prêt à remplir)", "Accessoire (Autre)", "Juice"],
  SMOKESHOP: ["Tout", "Bong", "Pipe", "Papier", "Stockage", "Plaque à rouler", "Autres"]
};

// Base de données fictive adaptée aux nouvelles catégories
const MOCK_PRODUCTS = [
  { id: 1, nom: "Kit Vaporesso Luxe", prix: 55.00, rayon: "VAPESHOP", sousCategorie: "Kit (Prêt à remplir)", image: "💨" },
  { id: 2, nom: "E-Liquide Fruits Rouges 50ml", prix: 19.99, rayon: "VAPESHOP", sousCategorie: "Juice", image: "🍓" },
  { id: 3, nom: "Résistance Mesh 0.2ohm", prix: 4.50, rayon: "VAPESHOP", sousCategorie: "Pièces", image: "⚙️" },
  { id: 4, nom: "Bong en Verre 30cm", prix: 35.00, rayon: "SMOKESHOP", sousCategorie: "Bong", image: "🏺" },
  { id: 5, nom: "Feuilles OCB Slim", prix: 2.00, rayon: "SMOKESHOP", sousCategorie: "Papier", image: "📄" },
  { id: 6, nom: "Plateau Métal Rick & Morty", prix: 12.50, rayon: "SMOKESHOP", sousCategorie: "Plaque à rouler", image: "🛹" },
  { id: 7, nom: "Boîte de Conservation Sous Vide", prix: 22.00, rayon: "SMOKESHOP", sousCategorie: "Stockage", image: "📦" },
  { id: 8, nom: "Pipe en Bois Artisanale", prix: 18.00, rayon: "SMOKESHOP", sousCategorie: "Pipe", image: "🪵" },
];

export default function CoinVert() {
  // États pour les filtres à deux niveaux
  const [rayonActif, setRayonActif] = useState("VAPESHOP"); // Niveau 1
  const [sousCategorieActive, setSousCategorieActive] = useState("Tout"); // Niveau 2

  // Fonction pour changer de rayon (et réinitialiser la sous-catégorie à "Tout")
  const changerRayon = (nouveauRayon) => {
    setRayonActif(nouveauRayon);
    setSousCategorieActive("Tout");
  };

  // Filtrer les produits selon le rayon ET la sous-catégorie
  const produitsFiltres = MOCK_PRODUCTS.filter(produit => {
    const correspondRayon = produit.rayon === rayonActif;
    const correspondSousCat = sousCategorieActive === "Tout" || produit.sousCategorie === sousCategorieActive;
    return correspondRayon && correspondSousCat;
  });

  return (
    <div className="min-h-screen bg-[#021027] text-white pb-[150px] font-sans">
      
      {/* 1. EN-TÊTE */}
      <header className="pt-16 px-6 text-center">
        <h1 className="text-4xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
          Le Coin Vert
        </h1>
      </header>

      {/* 2. SÉLECTEUR NIVEAU 1 : VAPESHOP vs SMOKESHOP */}
      <div className="flex justify-center px-6 mt-8">
        <div className="bg-black/30 backdrop-blur-md p-1 rounded-xl border border-white/10 flex w-full max-w-sm">
          <button 
            onClick={() => changerRayon("VAPESHOP")}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-300 ${
              rayonActif === "VAPESHOP" 
                ? 'bg-green-500/20 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            VAPESHOP
          </button>
          <button 
            onClick={() => changerRayon("SMOKESHOP")}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-300 ${
              rayonActif === "SMOKESHOP" 
                ? 'bg-green-500/20 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            SMOKESHOP
          </button>
        </div>
      </div>

      {/* 3. SÉLECTEUR NIVEAU 2 : SOUS-CATÉGORIES */}
      <div className="flex gap-2 px-6 mt-6 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES[rayonActif].map(cat => (
          <button 
            key={cat}
            onClick={() => setSousCategorieActive(cat)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              sousCategorieActive === cat 
                ? 'bg-white text-black' // Style très visible pour la sous-catégorie active
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10' 
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. GRILLE DE PRODUITS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 mt-2 max-w-7xl mx-auto">
        {produitsFiltres.map(produit => (
          <div 
            key={produit.id} 
            className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-black/40 flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {produit.image}
            </div>
            
            <h3 className="font-semibold text-gray-100 text-sm md:text-base leading-tight mb-1">{produit.nom}</h3>
            <span className="text-[10px] uppercase tracking-wider text-green-400/70 mb-auto">{produit.sousCategorie}</span>
            <p className="text-white font-bold mt-3 text-lg">{produit.prix.toFixed(2)} $</p>

            <button className="mt-3 w-full py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium hover:bg-green-500 hover:text-black hover:border-green-500 transition-colors">
              Ajouter
            </button>
          </div>
        ))}
        
        {/* Message si aucun produit dans la catégorie */}
        {produitsFiltres.length === 0 && (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 text-center py-10 text-gray-500">
            Aucun produit disponible dans cette catégorie pour le moment.
          </div>
        )}
      </div>

    </div>
  );
}