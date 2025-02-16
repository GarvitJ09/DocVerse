import React from 'react';
import '../styles/UseCaseSection.css'; // Import CSS for styling

const UseCaseSection = () => {
  const useCases = [
    {
      icon: '📚',
      title: 'Books',
      description:
        'Dive into a whole new reading experience! Chat with your favorite books using PDF.ai and get ready for interactive conversations that bring the pages to life.',
    },
    {
      icon: '🔬',
      title: 'Scientific Papers',
      description:
        'Take your research game to the next level with PDF.ai. Collaborate effortlessly and exchange knowledge with a simple chat interface for scientific papers.',
    },
    {
      icon: '💼',
      title: 'Financial Reports',
      description:
        'Say goodbye to boring number crunching! Chat with your financial reports using PDF.ai and get quick answers like a pro.',
    },
    {
      icon: '📱',
      title: 'Product User Manuals',
      description:
        'Confused about how to set up that gadget? Chat with your user manual using PDF.ai and get instant, friendly assistance that’ll have you up and running in no time.',
    },
    {
      icon: '⚖️',
      title: 'Legal Documents',
      description:
        'No more headaches trying to decipher legal jargon! With PDF.ai, legal documents become a breeze to understand and discuss.',
    },
    {
      icon: '👩‍💻',
      title: 'Employee Training Documents',
      description:
        'Boring training sessions, be gone! With PDF.ai, training documents become interactive buddies, making learning fun, engaging, and as easy as chatting with a friend.',
    },
  ];

  return (
    <section className='use-case-section' id='usecasesection'>
      <h2>Explore a Variety of Use Cases</h2>
      <p className='subtitle'>
        Chat with PDF documents using the best ChatPDF app
      </p>
      <div className='use-cases-grid'>
        {useCases.map((useCase, index) => (
          <div key={index} className='use-case-card'>
            <span className='use-case-icon'>{useCase.icon}</span>
            <h3>{useCase.title}</h3>
            <p>{useCase.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UseCaseSection;
