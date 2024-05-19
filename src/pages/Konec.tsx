import React from 'react';
import '../Styles/konec_style.css';
import { useLocation } from 'react-router-dom';
const KonecPage = () => {
  const location = useLocation();
  const { points } = location.state || { points: 0 }; // Default to 0 if no points passed

  return (
    <div className="container">
      <div className="card">
        <div className="title">KONEC IGRE</div>
        <div className="points">{points} točk</div>
        <input className="input" type="text" placeholder="Vnesi ime" />
        <button className="button">Shrani na lestvico</button>
      </div>
    </div>
  );

};

export default KonecPage;
