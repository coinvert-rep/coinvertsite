import React from 'react';
import { Outlet } from 'react-router-dom';
import TabBar from '../components/TabBar'; // Le bon chemin basé sur ton image

export default function Layout() {
  return (
    // On met un padding en bas pour que la TabBar ne cache pas le contenu de tes pages
    <div style={{ paddingBottom: '120px', minHeight: '100vh', position: 'relative' }}>
      
      {/* <Outlet /> est l'endroit magique où s'afficheront Accueil, CoinSnack, etc. */}
      <Outlet />
      
      {/* Ta barre de navigation globale */}
      <TabBar />
      
    </div>
  );
}