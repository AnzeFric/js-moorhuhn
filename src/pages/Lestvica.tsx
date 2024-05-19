import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/lestvica_style.css';

const LestvicaPage = () => {
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
            <tr>
              <td>1.</td>
              <td>Žan Lah</td>
              <td>400</td>
              <td>1. 4. 2024</td>
            </tr>
            <tr>
              <td>2.</td>
              <td>Erik Pustoslemšek</td>
              <td>250</td>
              <td>1. 4. 2024</td>
            </tr>
            <tr>
              <td>3.</td>
              <td>Anže Fric</td>
              <td>245</td>
              <td>1. 4. 2024</td>
            </tr>
          </tbody>
        </table>
        <Link to={'/'} className="back-button">nazaj</Link>
      </div>
    </div>
  );
};

export default LestvicaPage;
