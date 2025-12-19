import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Order Placed Successfully!</h1>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div style={{
            backgroundColor: 'var(--color-dark-gray)',
            padding: '3rem',
            borderRadius: '12px',
            border: '2px solid var(--color-gold)'
          }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ 
              color: 'var(--color-gold)', 
              fontFamily: 'var(--font-heading)',
              fontSize: '2.5rem',
              marginBottom: '1rem'
            }}>
              Thank You for Your Order!
            </h2>
            <p style={{ 
              color: 'var(--color-text-secondary)', 
              fontSize: '1.1rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Your order has been placed successfully. We'll send you a confirmation email shortly with your order details.
            </p>
            
            <div style={{
              backgroundColor: 'var(--color-medium-gray)',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '2rem'
            }}>
              <h3 style={{ color: 'var(--color-gold)', marginBottom: '1rem' }}>What's Next?</h3>
              <ul style={{ 
                textAlign: 'left', 
                color: 'var(--color-text-secondary)',
                listStyle: 'none',
                padding: 0
              }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  📧 Check your email for order confirmation
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  📦 We'll process your order within 24 hours
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  🚚 You'll receive tracking details once shipped
                </li>
                <li>
                  💬 Contact us on WhatsApp for any queries
                </li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/products" className="btn btn-primary">
                Continue Shopping
              </Link>
              <Link to="/" className="btn btn-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderSuccess;
