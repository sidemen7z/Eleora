import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const startingPrice = product.prices?.['50g'] || 0;
  
  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className="product-card-content">
        <h3 className="product-card-title">{product.short_name}</h3>
        <p className="product-card-price">From ₹{formatPrice(startingPrice)}</p>
        <Link to={`/product/${product.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
