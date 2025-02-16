import React from 'react';
import LT from '../Assets/LT.mp4';
import '../styles/HowToUse.css';
import '../styles/Styles.css';

const HowToUse = () => {
  return (
    <div className='howtouse' id='howtousesection'>
      <div className='video-player'>
        <video width='600' autoPlay loop muted>
          <source src={LT} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HowToUse;
