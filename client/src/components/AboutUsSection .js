import React from 'react';
import '../styles/AboutUsSection.css';
import '../styles/Styles.css';

const AboutUsSection = () => {
  return (
    <section className='about-us-section'>
      <h2>About Us</h2>
      <p>
        We are a team of AI and document management experts dedicated to making
        your life easier. Our mission is to provide a seamless way to interact
        with your documents using cutting-edge AI technology.
      </p>
      <div className='team-grid'>
        <div className='team-member'>
          <img src='https://via.placeholder.com/150' alt='Team Member 1' />
          <h3>John Doe</h3>
          <p>CEO & Founder</p>
        </div>
        <div className='team-member'>
          <img src='https://via.placeholder.com/150' alt='Team Member 2' />
          <h3>Jane Smith</h3>
          <p>Lead Developer</p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
