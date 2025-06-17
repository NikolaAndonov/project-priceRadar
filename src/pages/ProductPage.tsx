import React from 'react';
import { useParams } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import PriceComparisonTable from '../components/product/PriceComparisonTable';
import PriceHistoryChart from '../components/product/PriceHistoryChart';
import DealAnalysis from '../components/product/DealAnalysis';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = React.useState(false);

  // Mock data for demonstration
  const product = {
    id: id || '1',
    name: 'Olive Oil Extra Virgin',
    brand: 'Borges',
    image: '/src/assets/images/placeholder.png',
    description: 'Premium quality extra virgin olive oil from Spain. Cold pressed for maximum flavor and health benefits.',
    category: 'Groceries',
    unit: '750ml',
    nutritionalInfo: 'Energy: 824 kcal, Fat: 91.6g, Carbohydrates: 0g, Protein: 0g',
    labels: ['Organic', 'Imported'],
  };

  // Mock price data
  const priceData = [
    { store: 'Kaufland', currentPrice: 9.99, originalPrice: 15.99, lastUpdated: '2023-11-20', inStock: true },
    { store: 'Lidl', currentPrice: 10.49, originalPrice: 10.49, lastUpdated: '2023-11-19', inStock: true },
    { store: 'Billa', currentPrice: 12.99, originalPrice: 16.99, lastUpdated: '2023-11-18', inStock: true },
    { store: 'Fantastico', currentPrice: 11.99, originalPrice: 13.99, lastUpdated: '2023-11-17', inStock: false },
    { store: 'T-Market', currentPrice: 13.49, originalPrice: 13.49, lastUpdated: '2023-11-16', inStock: true },
  ];

  // Mock price history data
  const priceHistoryData = {
    labels: ['Oct 1', 'Oct 8', 'Oct 15', 'Oct 22', 'Oct 29', 'Nov 5', 'Nov 12', 'Nov 19'],
    datasets: [
      {
        store: 'Kaufland',
        data: [14.99, 14.99, 15.99, 15.99, 15.99, 13.99, 11.99, 9.99],
        color: '#FF5C5C',
      },
      {
        store: 'Lidl',
        data: [13.99, 13.99, 12.99, 12.99, 11.99, 10.99, 10.49, 10.49],
        color: '#3B82F6',
      },
      {
        store: 'Billa',
        data: [16.99, 16.99, 16.99, 16.99, 14.99, 14.99, 14.99, 12.99],
        color: '#10B981',
      },
    ],
  };

  const dealAnalysis = {
    isRealDeal: true,
    lowestPriceEver: 9.99,
    averagePrice: 13.85,
    priceVolatility: 'Medium',
    recommendation: 'Good time to buy! Current price at Kaufland is the lowest recorded in the past 8 weeks.',
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Product Image */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-contain"
            style={{ maxHeight: '400px' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=No+Image';
            }}
          />
        </div>

        {/* Product Info */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.brand}</p>
            </div>
            <button
              onClick={toggleFavorite}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isFavorite ? (
                <HeartSolidIcon className="h-6 w-6 text-danger-500" />
              ) : (
                <HeartIcon className="h-6 w-6 text-gray-400" />
              )}
            </button>
          </div>

          <div className="mt-4 p-4 bg-primary-50 rounded-lg">
            <h2 className="text-lg font-semibold text-primary-900">Best Price</h2>
            <div className="flex items-baseline mt-1">
              <span className="text-3xl font-bold text-primary-700">9.99 лв.</span>
              <span className="ml-2 text-sm text-gray-500">at Kaufland</span>
            </div>
            <p className="mt-1 text-sm text-primary-800">
              Save up to 3.50 лв. compared to other stores
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold">Product Details</h2>
            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Category:</span>
                <span className="ml-2 text-gray-900">{product.category}</span>
              </div>
              <div>
                <span className="text-gray-500">Size:</span>
                <span className="ml-2 text-gray-900">{product.unit}</span>
              </div>
              {product.labels && product.labels.length > 0 && (
                <div className="col-span-2">
                  <span className="text-gray-500">Labels:</span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {product.labels.map((label) => (
                      <span
                        key={label}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="mt-4 text-gray-700">{product.description}</p>
          </div>

          {product.nutritionalInfo && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Nutritional Information</h2>
              <p className="mt-2 text-sm text-gray-700">{product.nutritionalInfo}</p>
            </div>
          )}
        </div>
      </div>

      {/* Deal Analysis */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Deal Analysis</h2>
        <DealAnalysis analysis={dealAnalysis} />
      </div>

      {/* Price Comparison Table */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Price Comparison</h2>
        <PriceComparisonTable prices={priceData} />
      </div>

      {/* Price History Chart */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Price History</h2>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <PriceHistoryChart data={priceHistoryData} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 