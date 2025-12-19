import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../config/supabase';
import { formatPrice } from '../utils/formatters';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    payment: 'upi'
  });

  // Check if cart is empty and redirect
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart.length, navigate]);

  const createOrderInDatabase = async (paymentId?: string, paymentStatus: string = 'pending') => {
    const orderData = {
      user_id: user?.id || null,
      guest_name: formData.fullName,
      guest_email: formData.email,
      guest_phone: formData.mobile,
      total_amount: getCartTotal(),
      status: 'pending',
      payment_status: paymentStatus,
      payment_method: formData.payment,
      shipping_address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}, ${formData.country}`,
      notes: paymentId ? `Stripe Payment ID: ${paymentId}` : null
    };

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = cart.map(item => ({
      order_id: order.id,
      product_id: item.product.id,
      product_name: item.product.short_name,
      size: item.size,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return order;
  };

  const handleStripePayment = async () => {
    try {
      setLoading(true);
      
      // Create order first
      const order = await createOrderInDatabase(undefined, 'pending');
      
      // Call backend to create Stripe checkout session
      const response = await fetch('http://localhost:3001/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            name: `${item.product.short_name} (${item.size})`,
            description: item.product.description,
            amount: Math.round(item.price * 100), // Convert to paise
            quantity: item.quantity,
          })),
          customerEmail: formData.email,
          orderId: order.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
      
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Backend server not running. Please start the backend server with: node stripe-backend.js\n\nOr use Cash on Delivery for now.');
      setLoading(false);
    }
  };

  const handleCODOrder = async () => {
    try {
      setLoading(true);
      await createOrderInDatabase(undefined, 'cod');
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) return;

    if (formData.payment === 'upi' || formData.payment === 'online') {
      await handleStripePayment();
    } else if (formData.payment === 'cod') {
      await handleCODOrder();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Don't render if cart is empty
  if (cart.length === 0) {
    return null;
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Checkout</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="checkout-container">
            <form className="checkout-form" onSubmit={handleSubmit}>
              <h2 style={{ color: 'var(--color-gold)', marginBottom: '1.5rem' }}>Shipping Information</h2>
              
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number *</label>
                  <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} pattern="[0-9]{10}" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Full Address *</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pincode">Pincode *</label>
                  <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} pattern="[0-9]{6}" required />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <select id="country" name="country" value={formData.country} onChange={handleChange} required>
                    <option value="India">India</option>
                  </select>
                </div>
              </div>

              <h2 style={{ color: 'var(--color-gold)', margin: '2rem 0 1rem' }}>Payment Method</h2>
              <div className="payment-options">
                <label className={`payment-option ${formData.payment === 'upi' ? 'active' : ''}`}>
                  <input type="radio" name="payment" value="upi" checked={formData.payment === 'upi'} onChange={handleChange} />
                  <div>
                    <span style={{ fontWeight: 600 }}>�  Online Payment</span>
                    <small style={{ display: 'block', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                      Pay via UPI, Cards, Net Banking, Wallets
                    </small>
                  </div>
                </label>
                <label className={`payment-option ${formData.payment === 'cod' ? 'active' : ''}`}>
                  <input type="radio" name="payment" value="cod" checked={formData.payment === 'cod'} onChange={handleChange} />
                  <div>
                    <span style={{ fontWeight: 600 }}>� Cash eon Delivery</span>
                    <small style={{ display: 'block', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                      Pay when you receive the order
                    </small>
                  </div>
                </label>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '1.5rem' }}
                disabled={loading}
              >
                {loading ? 'Processing...' : formData.payment === 'upi' ? 'Proceed to Payment' : 'Place Order'}
              </button>

              {formData.payment === 'upi' && (
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '1rem', 
                  backgroundColor: 'var(--color-medium-gray)', 
                  borderRadius: '8px',
                  border: '1px solid var(--color-gold)'
                }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    🔒 Secure payment gateway. You'll be redirected to complete your payment.
                  </p>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    ⚠️ Backend server must be running: <code>node stripe-backend.js</code>
                  </p>
                </div>
              )}
              
              {formData.payment === 'cod' && (
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '1rem', 
                  backgroundColor: 'var(--color-medium-gray)', 
                  borderRadius: '8px',
                  border: '1px solid var(--color-gold)'
                }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    🔒 Your order is secure. Pay when you receive the order.
                  </p>
                </div>
              )}
            </form>

            <div className="order-summary">
              <h2 style={{ color: 'var(--color-gold)', marginBottom: '1rem' }}>Order Summary</h2>
              <div>
                {cart.map((item, index) => {
                  const itemPrice = Number(item.price) || 0;
                  const itemTotal = itemPrice * item.quantity;
                  return (
                    <div key={index} className="summary-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-light-gray)' }}>
                      <span>{item.product.short_name} ({item.size}) x {item.quantity}</span>
                      <span>₹{formatPrice(itemTotal)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="summary-row" style={{ marginTop: '1rem' }}>
                <span>Subtotal</span>
                <span>₹{formatPrice(getCartTotal())}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{formatPrice(getCartTotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;

