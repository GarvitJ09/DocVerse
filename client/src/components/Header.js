import React from 'react';
import '../styles/Header.css';
import '../styles/Styles.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='header-left'>
        <h1 className='.app-title'>DocVerse</h1>
      </div>
      <div className='header-right'>
        <button
          className='btn'
          onClick={() => window.location.replace('/#usecasesection')}
        >
          Use Cases
        </button>
        <button
          className='btn'
          onClick={() => window.location.replace('/#aboutussection')}
        >
          About Us
        </button>
        {/* <button className='btn btn-primary'>Testimonials</button> */}
      </div>
    </div>
  );
};
export default Header;
