import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/meni_style.css';

const MenuPage = () => {

  return (
    <div className='container'>
      <div className='card'>
        <div className='title'>PERUTNIŠKA APOKALIPSA</div>
        <Link to={'/game'} className='button'>ZAČNI</Link>
        <Link to={'/lestvica'} className='button'>LESTVICA</Link>
      </div>
    </div>
  );

};

export default MenuPage;
