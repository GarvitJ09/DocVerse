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
import Header from './components/Header';
import UseCaseSection from './components/UseCaseSection';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <HowToUse />
      <UseSection />
      <FeaturesSection />
      <UseCaseSection />
      {/* <TestimonialsSection />
      <AboutUsSection /> */}
      <Footer />
    </div>
  );
};

export default App;
