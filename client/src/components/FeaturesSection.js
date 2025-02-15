import React from 'react';
import '../styles/FeaturesSection.css';
import '../styles/Styles.css';

const FeaturesSection = () => {
  const features = [
    {
      icon: '📄',
      title: 'Upload Any Document',
      description:
        'Supports PDFs, DOCs, and more. Easily upload and start chatting.',
    },
    {
      icon: '💬',
      title: 'Ask Questions',
      description:
        'Get instant answers by asking questions about your documents.',
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description:
        'Your documents are safe with our encryption and privacy measures.',
    },
  ];

  return (
    <section className='features-section'>
      <div className='features-grid'>
        {features.map((feature, index) => (
          <div key={index} className='feature-card'>
            <span className='feature-icon'>{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
