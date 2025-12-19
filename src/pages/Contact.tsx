import React, { useState } from 'react';
import { supabase } from '../config/supabase';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    country: 'India',
    pincode: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.mobile,
          subject: 'Contact Form',
          message: `${formData.message}\n\nAddress: ${formData.address}, ${formData.city}, ${formData.country} - ${formData.pincode}`
        }]);

      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <>
        <section className="page-header">
          <div className="container">
            <h1 className="page-title">Contact Us</h1>
            <p className="page-subtitle">We'd love to hear from you</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'var(--color-medium-gray)', borderRadius: '8px' }}>
              <div style={{ fontSize: '3rem', color: 'var(--color-gold)', marginBottom: '1rem' }}>✓</div>
              <h2 style={{ color: 'var(--color-gold)', marginBottom: '0.5rem' }}>Thank You!</h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>We will contact you shortly.</p>
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
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">We'd love to hear from you</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
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
                <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={2} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <select id="country" name="country" value={formData.country} onChange={handleChange} required>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="pincode">Pincode *</label>
                <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} pattern="[0-9]{6}" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} required />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
