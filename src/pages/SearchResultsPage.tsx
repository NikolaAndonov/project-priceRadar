import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import FilterSidebar from '../components/search/FilterSidebar';
import SortDropdown from '../components/search/SortDropdown';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('price-asc');
  const [filters, setFilters] = useState({
    stores: [],
    priceRange: { min: 0, max: 100 },
    onlyDiscounted: false,
    onlyInStock: false,
  });

  // Mock search results for demonstration
  const [products, setProducts] = useState([
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
      name: 'Olive Oil Classic',
      brand: 'Bertolli',
      image: '/src/assets/images/placeholder.png',
      currentPrice: 8.49,
      originalPrice: 12.99,
      discount: 35,
      store: 'Lidl',
      unit: '500ml',
      isRealDeal: true,
    },
    {
      id: '3',
      name: 'Olive Oil Pure',
      brand: 'Filippo Berio',
      image: '/src/assets/images/placeholder.png',
      currentPrice: 11.99,
      originalPrice: 11.99,
      discount: 0,
      store: 'Billa',
      unit: '1L',
      isRealDeal: false,
    },
    {
      id: '4',
      name: 'Olive Oil Extra Light',
      brand: 'Monini',
      image: '/src/assets/images/placeholder.png',
      currentPrice: 10.49,
      originalPrice: 13.99,
      discount: 25,
      store: 'Fantastico',
      unit: '750ml',
      isRealDeal: true,
    },
    {
      id: '5',
      name: 'Olive Oil Spray',
      brand: 'Borges',
      image: '/src/assets/images/placeholder.png',
      currentPrice: 7.99,
      originalPrice: 9.99,
      discount: 20,
      store: 'T-Market',
      unit: '200ml',
      isRealDeal: false,
    },
    {
      id: '6',
      name: 'Olive Oil Organic',
      brand: 'Terra Creta',
      image: '/src/assets/images/placeholder.png',
      currentPrice: 14.99,
      originalPrice: 19.99,
      discount: 25,
      store: 'Kaufland',
      unit: '500ml',
      isRealDeal: true,
    },
  ]);

  // Sort products based on selected sort option
  useEffect(() => {
    const sortedProducts = [...products];
    
    switch (sortBy) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case 'discount':
        sortedProducts.sort((a, b) => b.discount - a.discount);
        break;
      case 'name':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    setProducts(sortedProducts);
  }, [sortBy]);

  // Handle filter changes
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // In a real app, you would apply these filters to your data
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Search results for "{query}"
        </h1>
        <p className="text-gray-600 mt-1">
          Found {products.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Search Results */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing {products.length} results
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

export default SearchResultsPage; 