import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <p className="footer-text">📞 +91 98765 43210</p>
            <p className="footer-text">✉️ info@eleorafood.com</p>
            <p className="footer-text">📍 123, Shivaji Nagar, Pune, Maharashtra 411005, India</p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <Link to="/products" className="footer-link">Products</Link>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Order Now</h3>
            <a 
              href="https://wa.me/919876543210?text=Hello,%20I%20want%20to%20place%20an%20order%20from%20Eleora%20Food%20Company."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              WhatsApp Order
            </a>
            <div className="social-icons">
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">📷</a>
              <a href="#" className="social-icon">🐦</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Eleora Food Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
