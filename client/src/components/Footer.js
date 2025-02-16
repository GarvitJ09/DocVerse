import React from 'react';
import '../styles/Footer.css';
import '../styles/Styles.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-section'>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href='/'>Home</a>
            </li>
            <li>
              <a href='/features'>Features</a>
            </li>
            <li>
              <a href='/pricing'>Pricing</a>
            </li>
            <li>
              <a href='/contact'>Contact</a>
            </li>
          </ul>
        </div>
        <div className='footer-section'>
          <h3>Legal</h3>
          <ul>
            <li>
              <a href='/privacy-policy'>Privacy Policy</a>
            </li>
            <li>
              <a href='/terms-of-service'>Terms of Service</a>
            </li>
          </ul>
        </div>
        <div className='footer-section'>
          <h3>Contact Us</h3>
          <p>Email: hello.docverse@gmail.com</p>
          {/* <p>Phone: +1 (123) 456-7890</p> */}
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; 2025 DocVerse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
