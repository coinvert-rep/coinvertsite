import { Outlet, Link } from 'react-router-dom';
import AgeGate from '../components/AgeGate';

export default function Layout() {
  return (
    
      
      <>
        <AgeGate />
        <header>
          <h1>Le Coin Vert x Snack</h1>
          <nav>
            <Link to="/vape">Vape &amp; Weed</Link>
            {' | '}
            <Link to="/snacks">Snacks Exotiques</Link>
            {' | '}
            <Link to="/clothes">Vêtements</Link>
          </nav>
        </header>

        {/* Les pages viendront s'injecter ici */}
        <main>
          <Outlet />
        </main>

        <footer>© {new Date().getFullYear()} Le Coin Vert x Le Coin Snack - Montmagny.</footer>
      </>
    );
}