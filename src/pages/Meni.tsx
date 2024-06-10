import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/meni_style.css';

const MenuPage = () => {

  return (
    <div className='relative  flex justify-center items-center h-screen w-screen'>
      <div className='bg-image absolute w-full backround h-full top-0 left-0 right-0'></div>
      <div className='bg-black/60 backdrop-blur-sm flex flex-col px-5 py-20 items-center rounded-3xl min-w-[500px]'>
        <div className='title-shadow text-6xl leading-24 font-bold drop-shadow-lg drop-shadow-red-600 text-[#fbee0f] mb-16 max-w-sm'>PERUTNIŠKA APOKALIPSA</div>
        <Link to={'/game'} className='button'>ZAČNI</Link>
        <Link to={'/lestvica'} className='button'>LESTVICA</Link>
      </div>
    </div >
  );

};

export default MenuPage;
