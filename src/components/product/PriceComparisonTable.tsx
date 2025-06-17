import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface Price {
  store: string;
  currentPrice: number;
  originalPrice: number;
  lastUpdated: string;
  inStock: boolean;
}

interface PriceComparisonTableProps {
  prices: Price[];
}

const PriceComparisonTable: React.FC<PriceComparisonTableProps> = ({ prices }) => {
  // Sort prices from lowest to highest
  const sortedPrices = [...prices].sort((a, b) => a.currentPrice - b.currentPrice);
  const lowestPrice = sortedPrices[0]?.currentPrice || 0;

  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Store
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Current Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Original Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Discount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Updated
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Availability
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPrices.map((price) => {
              const isLowestPrice = price.currentPrice === lowestPrice;
              const discountPercent = price.originalPrice > price.currentPrice
                ? Math.round(((price.originalPrice - price.currentPrice) / price.originalPrice) * 100)
                : 0;

              return (
                <tr
                  key={price.store}
                  className={isLowestPrice ? 'bg-primary-50' : ''}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {price.store}
                        {isLowestPrice && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                            Best Price
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{price.currentPrice.toFixed(2)} лв.</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {price.originalPrice !== price.currentPrice ? (
                        <span className="line-through">{price.originalPrice.toFixed(2)} лв.</span>
                      ) : (
                        <span>{price.originalPrice.toFixed(2)} лв.</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {discountPercent > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger-100 text-danger-800">
                        -{discountPercent}%
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{price.lastUpdated}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {price.inStock ? (
                      <span className="inline-flex items-center text-success-600">
                        <CheckIcon className="mr-1.5 h-4 w-4" />
                        <span className="text-sm">In Stock</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-danger-600">
                        <XMarkIcon className="mr-1.5 h-4 w-4" />
                        <span className="text-sm">Out of Stock</span>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceComparisonTable; 