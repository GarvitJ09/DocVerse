import React from 'react';
import '../styles/AboutUsSection.css';
import '../styles/Styles.css';
import image from '../Assets/image.jpeg';

const AboutUsSection = () => {
  return (
    <section className='about-us-section' id='aboutussection'>
      <h2>About Us</h2>
      <div className='team-grid'>
        <div className='team-member'>
          <img src={image} alt='Team Member 1' />
          <h3>John Doe</h3>
          <p>CEO & Founder</p>
        </div>
        <div className='team-member'>
          <img src={image} alt='Team Member 2' />
          <h3>Jane Smith</h3>
          <p>Lead Developer</p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
