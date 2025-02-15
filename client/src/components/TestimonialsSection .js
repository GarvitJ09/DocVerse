import React from 'react';
import '../styles/TestimonialsSection.css';
import '../styles/Styles.css';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'John Doe',
      role: 'CEO, Company XYZ',
      quote:
        'This platform has revolutionized how we handle documents. Highly recommended!',
      image: 'https://via.placeholder.com/100',
    },
    {
      name: 'Jane Smith',
      role: 'Marketing Manager',
      quote: 'The AI is incredibly accurate and saves us so much time.',
      image: 'https://via.placeholder.com/100',
    },
  ];

  return (
    <section className='testimonials-section'>
      <h2>What Our Users Say</h2>
      <div className='testimonials-grid'>
        {testimonials.map((testimonial, index) => (
          <div key={index} className='testimonial-card'>
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className='testimonial-image'
            />
            <p className='testimonial-quote'>"{testimonial.quote}"</p>
            <h3>{testimonial.name}</h3>
            <p className='testimonial-role'>{testimonial.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
