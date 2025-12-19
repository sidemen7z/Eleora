import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign up
        await signUp(formData.email, formData.password, {
          full_name: formData.fullName,
          phone: formData.phone
        });
        
        alert('Account created successfully! Please check your email to verify your account.');
        navigate('/');
      } else {
        // Sign in
        await signIn(formData.email, formData.password);
        
        navigate('/');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">{isSignUp ? 'Create Account' : 'Login'}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '500px' }}>
          <div style={{
            backgroundColor: 'var(--color-dark-gray)',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px solid var(--color-gold)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                {isSignUp ? '👤' : '🔐'}
              </div>
              <h2 style={{ 
                color: 'var(--color-gold)', 
                fontFamily: 'var(--font-heading)',
                marginBottom: '0.5rem'
              }}>
                {isSignUp ? 'Create Your Account' : 'Welcome Back'}
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                {isSignUp 
                  ? 'Sign up to track your orders and save your details' 
                  : 'Login to access your account'}
              </p>
            </div>

            {error && (
              <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(244, 67, 54, 0.2)',
                border: '1px solid #f44336',
                borderRadius: '6px',
                color: '#f44336',
                marginBottom: '1.5rem'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      pattern="[0-9]{10}"
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  minLength={6}
                />
                {isSignUp && (
                  <small style={{ color: 'var(--color-text-muted)', display: 'block', marginTop: '0.25rem' }}>
                    Minimum 6 characters
                  </small>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1rem' }}
                disabled={loading}
              >
                {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Login')}
              </button>
            </form>

            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--color-light-gray)',
              textAlign: 'center'
            }}>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              </p>
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setFormData({ email: '', password: '', fullName: '', phone: '' });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-gold)',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textDecoration: 'underline'
                }}
              >
                {isSignUp ? 'Login instead' : 'Create an account'}
              </button>
            </div>

            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: 'var(--color-medium-gray)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                💡 <strong>Guest Checkout Available</strong>
                <br />
                You can checkout without creating an account!
              </p>
            </div>

            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <Link 
                to="/" 
                style={{ 
                  color: 'var(--color-text-muted)', 
                  textDecoration: 'none',
                  fontSize: '0.9rem'
                }}
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
