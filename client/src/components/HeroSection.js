import React from 'react';
import '../styles/HeroSection.css';
import '../styles/Styles.css';

const HeroSection = () => {
  return (
    <section className='hero'>
      <div className='hero-container'>
        <h1 className='hero-title'>Talk to your Documents</h1>
        <p className='hero-subtitle'>
          From contracts to research papers, DocVerse transforms your documents
          into interactive conversations.
          <br />
          Get insights, summaries, and answers instantly.
        </p>
        <div className='hero-buttons'>
          <button
            className='btn primary-btn'
            onClick={() => window.location.replace('/#use-section')}
          >
            Get started for free →
          </button>
          <button
            className='btn secondary-btn'
            onClick={() => window.location.replace('/#howtousesection')}
          >
            How to use
          </button>
        </div>
        {/* <div className='hero-footer'>
          <div className='avatar-group'>
            <img src='/avatars/user1.jpg' alt='User 1' className='avatar' />
            <img src='/avatars/user2.jpg' alt='User 2' className='avatar' />
            <img src='/avatars/user3.jpg' alt='User 3' className='avatar' />
            <img src='/avatars/user4.jpg' alt='User 4' className='avatar' />
          </div>
          <p className='hero-loves'>
            Loved by 1,500,000+ happy users and counting!
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
