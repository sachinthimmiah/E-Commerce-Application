// Footer.jsx
import React from 'react';
 import './assets/home.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3 className="footer-title">ShopNest</h3>
          <p className="footer-tagline">Your one-stop shop for all your needs</p>
        </div>
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="footer-social">
          <a href="#" className="social-link">
            <i className="fa fa-facebook" />
          </a>
          <a href="#" className="social-link">
            <i className="fa fa-twitter" />
          </a>
          <a href="#" className="social-link">
            <i className="fa fa-instagram" />
          </a>
        </div>
        
      </div>
      <div className="footer-bottom">
        <p>© 2024 ShopNest. All rights reserved.</p>
      </div>
    </footer>
  );
}
