import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../../hooks/useProducts';

const TopDealsSection = () => {
  const { topDeals, getTopDeals, isLoading, error } = useProducts();

  useEffect(() => {
    getTopDeals();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-64"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Failed to load top deals: {error}</div>;
  }

  if (topDeals.length === 0) {
    return <div className="text-gray-500">No deals available at the moment.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {topDeals.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default TopDealsSection; 