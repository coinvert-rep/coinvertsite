import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Accueil from './pages/Accueil';
import CoinSnack from './pages/CoinSnack';
import CoinVert from './pages/CoinVert';
import Vetements from './pages/Vetements';
import './App.css'; // Garde tes styles globaux

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Le Layout englobe TOUTES les routes qui sont à l'intérieur */}
        <Route element={<Layout />}>
          <Route path="/" element={<Accueil />} />
          <Route path="/snack" element={<CoinSnack />} />
          <Route path="/vert" element={<CoinVert />} />
          <Route path="/vetements" element={<Vetements />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}