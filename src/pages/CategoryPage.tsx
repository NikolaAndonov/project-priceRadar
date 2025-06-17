import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import FilterSidebar from '../components/search/FilterSidebar';
import SortDropdown from '../components/search/SortDropdown';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [sortBy, setSortBy] = useState('price-asc');
  const [filters, setFilters] = useState({
    stores: [],
    priceRange: { min: 0, max: 100 },
    onlyDiscounted: false,
    onlyInStock: false,
  });

  // Mock category data
  const categories = {
    groceries: { name: 'Groceries', icon: '🥫' },
    beverages: { name: 'Beverages', icon: '🥤' },
    dairy: { name: 'Dairy', icon: '🥛' },
    meat: { name: 'Meat & Fish', icon: '🥩' },
    bakery: { name: 'Bakery', icon: '🍞' },
    fruits: { name: 'Fruits & Vegetables', icon: '🍎' },
    cleaning: { name: 'Cleaning', icon: '🧹' },
    'personal-care': { name: 'Personal Care', icon: '🧴' },
  };

  const category = categoryId ? categories[categoryId as keyof typeof categories] : null;

  // Mock products for demonstration
  const products = [
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
    {
      id: '5',
      name: 'Dishwashing Liquid',
      brand: 'Fairy',
      image: '/src/assets/images/placeholder.png',
      currentPrice: 3.99,
      originalPrice: 5.49,
      discount: 27,
      store: 'T-Market',
      unit: '650ml',
      isRealDeal: true,
    },
    {
      id: '6',
      name: 'Chocolate Bar',
      brand: 'Milka',
      image: '/src/assets/images/placeholder.png',
      currentPrice: 2.29,
      originalPrice: 2.99,
      discount: 23,
      store: 'Kaufland',
      unit: '100g',
      isRealDeal: false,
    },
  ];

  // Handle filter changes
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // In a real app, you would apply these filters to your data
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  if (!category) {
    return <div className="text-center py-12">Category not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center">
          <span className="text-4xl mr-3">{category.icon}</span>
          <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
        </div>
        <p className="text-gray-600 mt-1">
          Browse all {category.name.toLowerCase()} products and compare prices
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing {products.length} products
            </p>
            <SortDropdown value={sortBy} onChange={handleSortChange} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage; 