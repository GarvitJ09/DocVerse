import React from 'react';
import '../styles/HowItWorksSection.css';
import '../styles/Styles.css';

const HowItWorksSection = () => {
  const steps = [
    {
      step: 1,
      title: 'Upload Your Document',
      description: 'Drag and drop your PDF or DOC file into the platform.',
    },
    {
      step: 2,
      title: 'Ask Questions',
      description:
        'Type your questions or request summaries from the document.',
    },
    {
      step: 3,
      title: 'Get Instant Answers',
      description: 'Receive accurate and instant responses from the AI.',
    },
  ];

  return (
    <section className='how-it-works-section'>
      <h2>How It Works</h2>
      <div className='steps-grid'>
        {steps.map((step, index) => (
          <div key={index} className='step-card'>
            <span className='step-number'>Step {step.step}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
