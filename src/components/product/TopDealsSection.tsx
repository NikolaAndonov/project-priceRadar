import React from 'react';
import ProductCard from './ProductCard';

const TopDealsSection = () => {
  // Mock data for demonstration
  const topDeals = [
    {
      id: '1',
      name: 'Olive Oil Extra Virgin',
      brand: 'Borges',
      image: '/src/assets/images/placeholder.png',
      currentPrice: 9.99,
      originalPrice: 15.99,
      discount: 38,
      store: 'Kaufland',
      unit: '750ml',
      isRealDeal: true,
    },
    {
      id: '2',
      name: 'Ground Coffee Classic',
      brand: 'Lavazza',
      image: '/src/assets/images/placeholder.png',
      currentPrice: 8.49,
      originalPrice: 12.99,
      discount: 35,
      store: 'Lidl',
      unit: '250g',
      isRealDeal: true,
    },
    {
      id: '3',
      name: 'Greek Yogurt',
      brand: 'Danone',
      image: '/src/assets/images/placeholder.png',
      currentPrice: 1.99,
      originalPrice: 2.79,
      discount: 29,
      store: 'Billa',
      unit: '400g',
      isRealDeal: true,
    },
    {
      id: '4',
      name: 'Toilet Paper 3-Ply',
      brand: 'Zewa',
      image: '/src/assets/images/placeholder.png',
      currentPrice: 7.49,
      originalPrice: 10.99,
      discount: 32,
      store: 'Fantastico',
      unit: '8 rolls',
      isRealDeal: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {topDeals.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default TopDealsSection; 