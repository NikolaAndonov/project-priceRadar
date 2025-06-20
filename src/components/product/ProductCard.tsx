import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Product } from '../../services/productService';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Temporarily disable favorites functionality until we fix the hooks
  const isProductFavorite = false;
  const isLoading = false;

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Temporarily disabled
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="card group"
    >
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden">
          <img
            src={product.image || '/images/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-center object-cover group-hover:opacity-90"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder.svg';
            }}
          />
        </div>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          disabled={isLoading}
          className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white disabled:opacity-50"
          aria-label={isProductFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isProductFavorite ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      <div className="p-4">
        {/* Store Name */}
        <div className="text-xs font-medium text-gray-500 mb-1">{product.store}</div>

        {/* Product Name */}
        <h3 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h3>

        {/* Brand & Unit */}
        <div className="text-xs text-gray-500 mb-2">
          {product.brand} · {product.unit}
        </div>

        {/* Price */}
        <div className="flex items-end gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900">${product.currentPrice.toFixed(2)}</span>
          {product.originalPrice > product.currentPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Real Deal Indicator */}
        <div className="flex items-center text-xs">
          {product.isRealDeal ? (
            <>
              <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-700">Real deal</span>
            </>
          ) : (
            <>
              <ExclamationCircleIcon className="h-4 w-4 text-amber-500 mr-1" />
              <span className="text-amber-700">Price often fluctuates</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 