import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.css';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await signOut();
      navigate('/admin/login');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="admin-container">
      <button 
        className="mobile-menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="admin-logo">
            <img src="/images/logo.png" alt="Eleora" className="logo-img" />
            <div>
              <h2>🛡️ Admin Panel</h2>
              <p className="admin-welcome">Welcome, {user?.full_name || 'Admin'}</p>
            </div>
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>

        <nav className="admin-nav">
          <Link 
            to="/admin" 
            className={`nav-item ${isActive('/admin') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/admin/products" 
            className={`nav-item ${isActive('/admin/products') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">📦</span>
            <span>Products</span>
          </Link>
          <Link 
            to="/admin/orders" 
            className={`nav-item ${isActive('/admin/orders') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">🛒</span>
            <span>Orders</span>
          </Link>
          <Link 
            to="/admin/contacts" 
            className={`nav-item ${isActive('/admin/contacts') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">✉️</span>
            <span>Messages</span>
          </Link>
          <Link 
            to="/" 
            className="nav-item"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">🏠</span>
            <span>Back to Site</span>
          </Link>
        </nav>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>

      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
