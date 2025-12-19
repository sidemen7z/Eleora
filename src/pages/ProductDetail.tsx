import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../config/supabase';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<'50g' | '100g' | '200g' | '500g'>('100g');
  const [currentImage, setCurrentImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadProduct(parseInt(id));
  }, [id]);

  useEffect(() => {
    // Update image when size changes
    if (product) {
      const sizeImage = product.size_images?.[selectedSize];
      setCurrentImage(sizeImage || product.image_url);
    }
  }, [selectedSize, product]);

  const loadProduct = async (productId: number) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .eq('is_active', true)
        .single();
      
      if (error) {
        console.error('Error loading product:', error);
        return;
      }
      
      if (data) {
        console.log('Product loaded:', data); // Debug log
        
        // Ensure highlights is an array
        if (typeof data.highlights === 'string') {
          data.highlights = data.highlights.split(',').map((h: string) => h.trim());
        }
        
        // Ensure prices is an object with correct structure
        if (typeof data.prices === 'string') {
          data.prices = JSON.parse(data.prices);
        }

        // Ensure size_images is an object
        if (typeof data.size_images === 'string') {
          data.size_images = JSON.parse(data.size_images);
        }
        
        console.log('Prices:', data.prices); // Debug log
        
        setProduct(data);
        // Set initial image
        const initialImage = data.size_images?.['100g'] || data.image_url;
        setCurrentImage(initialImage);
      }
    } catch (error) {
      console.error('Error in loadProduct:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPrice = (): number => {
    if (!product || !product.prices) return 0;
    const price = product.prices[selectedSize];
    const numPrice = typeof price === 'number' ? price : Number(price) || 0;
    console.log(`Price for ${selectedSize}:`, numPrice); // Debug log
    return numPrice;
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      product,
      size: selectedSize,
      quantity,
      price: getPrice()
    });
    alert('Added to cart!');
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
        <div>Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
        <div>Product not found</div>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '2rem' }}>
          Back to Products
        </Link>
      </div>
    );
  }

  const currentPrice = getPrice();
  const totalPrice = currentPrice * quantity;

  return (
    <section className="section">
      <div className="container">
        <div className="product-detail-container">
          <div className="product-detail-image">
            <img src={currentImage} alt={product.name} />
            {product.size_images && (
              <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                📦 Image changes based on selected size
              </p>
            )}
          </div>
          
          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <p className="product-detail-description">{product.description}</p>
            <p className="product-detail-use"><strong>Use:</strong> {product.use_case}</p>
            
            <div className="product-detail-highlights">
              <h3>Highlights:</h3>
              <ul>
                {Array.isArray(product.highlights) ? (
                  product.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))
                ) : (
                  <li>{product.highlights}</li>
                )}
              </ul>
            </div>

            <div className="product-detail-options">
              <div className="size-selector">
                <label>Select Size:</label>
                <div className="size-buttons">
                  {(['50g', '100g', '200g', '500g'] as const).map(size => {
                    const sizePrice = product.prices?.[size] || 0;
                    return (
                      <button
                        key={size}
                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size} - ₹{formatPrice(sizePrice)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className="product-detail-price">
                <span className="price-label">Total:</span>
                <span className="price-value">₹{formatPrice(totalPrice)}</span>
              </div>

              <button className="btn btn-primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
