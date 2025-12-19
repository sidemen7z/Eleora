import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('id');
      
      if (error) {
        console.error('Error loading products:', error);
        throw error;
      }
      
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <section className="page-header">
          <div className="container">
            <h1 className="page-title">Our Products</h1>
            <p className="page-subtitle">Authentic Maharashtrian Masalas & Chutneys</p>
          </div>
        </section>
        <section className="section">
          <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ 
              display: 'inline-block',
              width: '60px',
              height: '60px',
              border: '6px solid var(--color-light-gray)',
              borderTop: '6px solid var(--color-gold)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ 
              color: 'var(--color-text-secondary)', 
              marginTop: '1.5rem',
              fontSize: '1.1rem'
            }}>
              Loading products...
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Our Products</h1>
          <p className="page-subtitle">Authentic Maharashtrian Masalas & Chutneys</p>
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <div className="products-list-grid">
            {products.map(product => {
              const startingPrice = product.prices?.['50g'] || 0;
              return (
                <div key={product.id} className="product-list-card">
                  <div className="product-list-image">
                    <img src={product.image_url} alt={product.name} />
                  </div>
                  <div className="product-list-content">
                    <h3 className="product-list-title">{product.short_name}</h3>
                    <p className="product-list-description">{product.description}</p>
                    <p className="product-list-use">Use: {product.use_case}</p>
                    <p className="product-list-price">From ₹{formatPrice(startingPrice)}</p>
                    <Link to={`/product/${product.id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
