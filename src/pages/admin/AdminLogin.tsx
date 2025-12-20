import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabase';
import '../../styles/admin.css';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setLoading(false);
      setError('Login timeout. Please check your connection and try again.');
    }, 30000); // 30 second timeout

    try {
      // Sign in first
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) throw signInError;
      
      if (authData.user) {
        // Check admin status immediately
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('is_admin')
          .eq('id', authData.user.id)
          .single();

        if (profileError) {
          console.error('Profile error:', profileError);
          throw new Error('Failed to verify admin status');
        }

        if (profile?.is_admin) {
          // Success - clear timeout and navigate
          clearTimeout(timeoutId);
          navigate('/admin');
        } else {
          // Not an admin - sign out
          clearTimeout(timeoutId);
          setError('Access denied. Admin privileges required.');
          await supabase.auth.signOut();
        }
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error('Login error:', error);
      setError(error.message || 'Invalid credentials');
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="admin-icon">🛡️</div>
            <h1>Admin Access</h1>
            <p>Authorized Personnel Only</p>
          </div>

          <div className="warning-box">
            ⚠️ This area is restricted to administrators only
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                ❌ {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Admin Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@eleorafood.com"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary login-btn"
              disabled={loading}
            >
              {loading ? '⏳ Logging in...' : '🔐 Login to Admin Panel'}
            </button>
          </form>

          <div className="back-link">
            <a href="/">← Back to Website</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
