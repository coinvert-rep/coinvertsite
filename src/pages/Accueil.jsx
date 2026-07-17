import { Link } from 'react-router-dom';

export default function Accueil() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight uppercase">
          L'expérience <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Coin Vert</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Ta destination numéro un à Montmagny pour la vape, les accessoires et les munchies introuvables ailleurs au Québec.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Section Coin Vert */}
        <Link 
          to="/coin-vert" 
          className="group relative p-10 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-green-500 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">
            💨 Le Coin Vert
          </h2>
          <p className="text-zinc-400 text-lg">
            Bongs, vapes, feuilles et accessoires. Tout l'équipement dont tu as besoin, avec les meilleurs conseils en boutique.
          </p>
        </Link>

        {/* Section Coin Snack */}
        <Link 
          to="/coin-snack" 
          className="group relative p-10 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
            🍬 Le Coin Snack
          </h2>
          <p className="text-zinc-400 text-lg">
            Importations exclusives, bonbons rares et boissons exotiques pour gérer tes munchies comme il se doit.
          </p>
        </Link>
      </div>
    </div>
  );
}