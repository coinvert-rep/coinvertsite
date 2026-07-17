import { Outlet, Link } from 'react-router-dom';
import AgeGate from '../components/AgeGate';
import InteractiveSmoke from '../components/InteractiveSmoke'; // L'import de la fumée

export default function Layout() {
  return (
    // On remplace le <> par un div avec un peu de Tailwind pour le style global
    <div className="relative min-h-screen text-white font-sans selection:bg-green-500 selection:text-black">
      
      {/* Notre effet de fond interactif */}
      <InteractiveSmoke />
      
      <AgeGate />
      
      {/* J'ai ajouté quelques classes de base pour espacer un peu ton menu */}
      <header className="p-6 border-b border-gray-800/50">
        <h1 className="text-3xl font-bold tracking-wider">Le Coin Vert x Snack</h1>
        <nav className="mt-4 text-gray-400 space-x-2">
          <Link to="/vape" className="hover:text-green-400 transition-colors">Vape & Weed</Link>
          <span>|</span>
          <Link to="/snacks" className="hover:text-green-400 transition-colors">Snacks Exotiques</Link>
          <span>|</span>
          <Link to="/clothes" className="hover:text-green-400 transition-colors">Vêtements</Link>
        </nav>
      </header>

      {/* Les pages viendront s'injecter ici */}
      <main className="p-6">
        <Outlet />
      </main>

      <footer className="p-6 text-sm text-gray-600 text-center mt-auto">
        © {new Date().getFullYear()} Le Coin Vert x Le Coin Snack - Montmagny.
      </footer>
    </div>
  );
}