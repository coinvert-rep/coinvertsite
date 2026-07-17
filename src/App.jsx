import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Accueil from './pages/Accueil';
import CoinVert from './pages/CoinVert';
import CoinSnack from './pages/CoinSnack';
import Vetements from './pages/Vetements';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Accueil />} />
          <Route path="coin-vert" element={<CoinVert />} />
          <Route path="coin-snack" element={<CoinSnack />} />
          <Route path="vetements" element={<Vetements />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;