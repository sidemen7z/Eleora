import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .limit(6);
      
      if (fetchError) {
        console.error('Error loading products:', fetchError);
        setError('Failed to load products. Please refresh the page.');
        return;
      }
      
      setProducts(data || []);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, products.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, products.length - 2)) % Math.max(1, products.length - 2));
  };

  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Premium Homemade Masala & Chutneys</h1>
            <p className="hero-subtitle">Organic | Homemade | Preservative Free</p>
            <Link to="/products" className="btn btn-primary">Shop Now</Link>
          </div>
        </div>
      </section>

      <section className="section popular-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Products</h2>
            <div className="divider"></div>
          </div>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div style={{ 
                display: 'inline-block',
                width: '50px',
                height: '50px',
                border: '5px solid var(--color-light-gray)',
                borderTop: '5px solid var(--color-gold)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ color: 'var(--color-text-secondary)', marginTop: '1rem' }}>
                Loading products...
              </p>
            </div>
          ) : error ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              backgroundColor: 'var(--color-dark-gray)',
              borderRadius: '8px',
              border: '2px solid var(--color-red)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
              <p style={{ color: 'var(--color-red)', marginBottom: '1rem' }}>{error}</p>
              <button onClick={loadProducts} className="btn btn-primary">
                Try Again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                No products available at the moment.
              </p>
            </div>
          ) : (
            <div className="slider-container">
              <button className="slider-btn slider-btn-prev" onClick={prevSlide}>‹</button>
              <div className="slider-wrapper">
                <div 
                  className="slider-track" 
                  style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
                >
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
              <button className="slider-btn slider-btn-next" onClick={nextSlide}>›</button>
            </div>
          )}
        </div>
      </section>

      <section className="section maharashtrian-magic">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Maharashtrian Magic</h2>
            <div className="divider"></div>
            <p className="section-description">
              Crafted with love using traditional Maharashtrian recipes passed down through generations.
            </p>
          </div>
          <div className="magic-grid">
            <div className="magic-card">
              <div className="magic-card-image">
                <img src="/images/goda-masala.jpg" alt="Goda Masala" />
              </div>
              <h3 className="magic-card-title">Goda Masala</h3>
              <p className="magic-card-text">The soul of Maharashtrian cuisine with its sweet and aromatic profile</p>
            </div>
            <div className="magic-card">
              <div className="magic-card-image">
                <img src="/images/peanut-chutney.jpg" alt="Peanut Chutney" />
              </div>
              <h3 className="magic-card-title">Peanut Chutney</h3>
              <p className="magic-card-text">Crunchy roasted perfection that elevates every meal</p>
            </div>
            <div className="magic-card">
              <div className="magic-card-image">
                <img src="/images/flaxseed-chutney.jpg" alt="Flaxseed Chutney" />
              </div>
              <h3 className="magic-card-title">Flaxseed Chutney</h3>
              <p className="magic-card-text">Healthy and flavorful with a nutty spicy kick</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section why-choose">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Eleora</h2>
            <div className="divider"></div>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🥘</div>
              <h3 className="feature-title">Small Batch Production</h3>
              <p className="feature-text">Every batch is carefully crafted to ensure maximum freshness and quality</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✋</div>
              <h3 className="feature-title">Hand Blended Spices</h3>
              <p className="feature-text">Meticulously hand-blended to preserve authentic flavors and aromas</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3 className="feature-title">No Artificial Colour</h3>
              <p className="feature-text">Pure and natural ingredients with no synthetic additives</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚫</div>
              <h3 className="feature-title">Preservative Free</h3>
              <p className="feature-text">100% natural with zero preservatives for healthy cooking</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📜</div>
              <h3 className="feature-title">Traditional Recipes</h3>
              <p className="feature-text">Authentic Maharashtrian recipes passed through generations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3 className="feature-title">Premium Quality</h3>
              <p className="feature-text">Only the finest ingredients sourced for superior taste</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
