import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/lestvica_style.css';
import { useLocalStorage } from 'usehooks-ts';

const LestvicaPage = () => {
  const [leaderboard] = useLocalStorage('leaderBoard', []);  // Retrieve the leaderboard from local storage

  return (
    <div className="con">
      <div className="crd">
        <div className="title">LESTVICA</div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Ime</th>
              <th>točke</th>
              <th>datum</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry: { name: string, points: number, date: string }, index: number) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{entry.name}</td>
                <td>{entry.points}</td>
                <td>{entry.date}</td>  {/* Assuming each entry has a date */}
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={'/'} className="back-button">nazaj</Link>
      </div>
    </div>
  );
};

export default LestvicaPage;
