import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <>
        <section className="page-header">
          <div className="container">
            <h1 className="page-title">Shopping Cart</h1>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Add some delicious products to get started!</p>
              <Link to="/products" className="btn btn-primary">Browse Products</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cart-container">
            <div className="cart-items">
              {cart.map((item) => {
                const itemPrice = Number(item.price) || 0;
                const itemTotal = itemPrice * item.quantity;
                
                return (
                  <div key={`${item.product.id}-${item.size}`} className="cart-item">
                    <img src={item.product.image_url} alt={item.product.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h3>{item.product.short_name}</h3>
                      <p>Size: {item.size}</p>
                      <p className="cart-item-price">₹{formatPrice(itemPrice)} each</p>
                    </div>
                    <div className="cart-item-quantity">
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}>+</button>
                    </div>
                    <div className="cart-item-total">
                      ₹{formatPrice(itemTotal)}
                    </div>
                    <button 
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      title="Remove from cart"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{formatPrice(getCartTotal())}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{formatPrice(getCartTotal())}</span>
              </div>
              <button className="btn btn-primary" onClick={() => navigate('/checkout')} style={{ width: '100%', marginBottom: '1rem' }}>
                Proceed to Checkout
              </button>
              <Link to="/products" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
