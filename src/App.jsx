import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import CoinSnack from './pages/CoinSnack';
import CoinVert from './pages/CoinVert';
import Vetements from './pages/Vetements';
import './App.css'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />}>
          <Route path="snack" element={<CoinSnack />} />
          <Route path="vert" element={<CoinVert />} />
          <Route path="vetements" element={<Vetements />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}