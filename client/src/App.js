import React from 'react';
import FeaturesSection from './components/FeaturesSection';
import HeroSection from './components/HeroSection';
import HowToUse from './components/HowToUse';
import Footer from './components/Footer';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection ';
import UseSection from './components/UseSection';
import AboutUsSection from './components/AboutUsSection ';
import './styles/Styles.css';

const App = () => {
  return (
    <div className='App'>
      <HeroSection />
      <HowItWorksSection />
      <HowToUse />
      <UseSection />
      <FeaturesSection />
      <TestimonialsSection />
      <AboutUsSection />
      <Footer />
    </div>
  );
};

export default App;
