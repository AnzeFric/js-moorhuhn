import React, { useState, useRef, useEffect } from 'react';
import '../Styles/konec_style.css';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { useNavigate } from 'react-router-dom';
const KonecPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { points } = location.state || { points: 0 };
  const [leaderboard, setLeaderboard] = useLocalStorage<{ name: string; points: number, date: string }[]>('leaderBoard', [])
  const [name, setName] = useState('');
  const dramaticSound = useRef(new Audio('/sounds/dramatic.mp3'));

  function saveToLeaderboard() {
    if (!name) {
      alert("Prosim vnesite svoje ime.");
      return;
    }
    const newEntry = { name, points, date: new Date().toLocaleString() };
    const updatedLeaderboard = [...leaderboard, newEntry];

    updatedLeaderboard.sort((a, b) => b.points - a.points); //sortiraj po točkah
    setLeaderboard(updatedLeaderboard);
    setName('');
    navigate('/lestvica');
  }

  useEffect(() => {
    dramaticSound.current.play();
    return () => {
      dramaticSound.current.pause();
    }
  }, []);
  return (
    <div className="cnt">
      <div className="card">
        <div className='title-shadow text-6xl leading-24 font-bold drop-shadow-lg drop-shadow-red-600 text-[#fbee0f] mb-16 max-w-sm'>KONEC IGRE</div>

        <div className="points">{points} točk</div>
        <input
          className="input"
          type="text"
          placeholder="Vnesi ime"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="button" onClick={saveToLeaderboard}>Shrani na lestvico</button>
        <a className="button" href="/">Poskusi znova</a>
      </div>
    </div>
  );

};

export default KonecPage;
