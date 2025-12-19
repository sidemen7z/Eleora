import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { getCartCount } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    document.body.classList.remove('menu-open');
  }, [location]);

  // Toggle mobile menu and body scroll
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  // Close menu when clicking overlay
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  const handleSignOut = async () => {
    await signOut();
    closeMobileMenu();
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <img src="/images/logo.png" alt="Logo" className="logo-img" />
            </Link>
            
            <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
              <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
              <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`}>Products</Link>
              <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About Us</Link>
              <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
              <Link to="/cart" className={`nav-link cart-link ${isActive('/cart') ? 'active' : ''}`}>
                <span className="cart-icon">🛒</span>
                <span className="cart-count">{getCartCount()}</span>
              </Link>
              
              <div className="auth-section">
                {user ? (
                  <div className="user-menu">
                    <span className="user-greeting">👋 {user.full_name || 'User'}</span>
                    <div className="user-dropdown">
                      {user.is_admin && (
                        <Link to="/admin" className="dropdown-link">Admin Panel</Link>
                      )}
                      <button onClick={handleSignOut} className="dropdown-link">Logout</button>
                    </div>
                  </div>
                ) : (
                  <Link to="/login" className="login-link">Login</Link>
                )}
              </div>
            </nav>

            <button 
              className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      ></div>
    </>
  );
};

export default Header;
