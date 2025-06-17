import React, { useState } from 'react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FilterSidebarProps {
  filters: {
    stores: string[];
    priceRange: { min: number; max: number };
    onlyDiscounted: boolean;
    onlyInStock: boolean;
  };
  onFilterChange: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const stores = [
    { id: 'lidl', name: 'Lidl' },
    { id: 'kaufland', name: 'Kaufland' },
    { id: 'billa', name: 'Billa' },
    { id: 'fantastico', name: 'Fantastico' },
    { id: 'tmarket', name: 'T-Market' },
    { id: 'metro', name: 'Metro' },
  ];

  const handleStoreToggle = (storeId: string) => {
    const updatedStores = localFilters.stores.includes(storeId)
      ? localFilters.stores.filter(id => id !== storeId)
      : [...localFilters.stores, storeId];
    
    const newFilters = {
      ...localFilters,
      stores: updatedStores,
    };
    
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    const newFilters = {
      ...localFilters,
      priceRange: { min, max },
    };
    
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCheckboxChange = (name: 'onlyDiscounted' | 'onlyInStock') => {
    const newFilters = {
      ...localFilters,
      [name]: !localFilters[name],
    };
    
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <>
      {/* Mobile filter dialog */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 flex z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsMobileFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile filters */}
            <div className="mt-4 px-4">
              {/* Store filters */}
              <div className="border-t border-gray-200 py-6">
                <h3 className="text-sm font-medium text-gray-900">Stores</h3>
                <div className="mt-4 space-y-2">
                  {stores.map((store) => (
                    <div key={store.id} className="flex items-center">
                      <input
                        id={`store-${store.id}-mobile`}
                        name={`store-${store.id}`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        checked={localFilters.stores.includes(store.id)}
                        onChange={() => handleStoreToggle(store.id)}
                      />
                      <label htmlFor={`store-${store.id}-mobile`} className="ml-3 text-sm text-gray-600">
                        {store.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price range filter */}
              <div className="border-t border-gray-200 py-6">
                <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      min="0"
                      placeholder="Min"
                      className="w-24 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      value={localFilters.priceRange.min}
                      onChange={(e) => handlePriceRangeChange(Number(e.target.value), localFilters.priceRange.max)}
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="Max"
                      className="w-24 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      value={localFilters.priceRange.max}
                      onChange={(e) => handlePriceRangeChange(localFilters.priceRange.min, Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              {/* Other filters */}
              <div className="border-t border-gray-200 py-6">
                <h3 className="text-sm font-medium text-gray-900">Other Filters</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <input
                      id="only-discounted-mobile"
                      name="only-discounted"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={localFilters.onlyDiscounted}
                      onChange={() => handleCheckboxChange('onlyDiscounted')}
                    />
                    <label htmlFor="only-discounted-mobile" className="ml-3 text-sm text-gray-600">
                      Only show discounted items
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="only-in-stock-mobile"
                      name="only-in-stock"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={localFilters.onlyInStock}
                      onChange={() => handleCheckboxChange('onlyInStock')}
                    />
                    <label htmlFor="only-in-stock-mobile" className="ml-3 text-sm text-gray-600">
                      Only show in-stock items
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile filter button */}
      <div className="flex items-center justify-between lg:hidden mb-4">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          onClick={() => setIsMobileFiltersOpen(true)}
        >
          <FunnelIcon className="h-5 w-5 mr-2 text-gray-400" aria-hidden="true" />
          Filters
        </button>
      </div>

      {/* Desktop filters */}
      <div className="hidden lg:block">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>

          {/* Store filters */}
          <div className="border-t border-gray-200 py-6">
            <h3 className="text-sm font-medium text-gray-900">Stores</h3>
            <div className="mt-4 space-y-2">
              {stores.map((store) => (
                <div key={store.id} className="flex items-center">
                  <input
                    id={`store-${store.id}`}
                    name={`store-${store.id}`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={localFilters.stores.includes(store.id)}
                    onChange={() => handleStoreToggle(store.id)}
                  />
                  <label htmlFor={`store-${store.id}`} className="ml-3 text-sm text-gray-600">
                    {store.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price range filter */}
          <div className="border-t border-gray-200 py-6">
            <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  min="0"
                  placeholder="Min"
                  className="w-20 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={localFilters.priceRange.min}
                  onChange={(e) => handlePriceRangeChange(Number(e.target.value), localFilters.priceRange.max)}
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  min="0"
                  placeholder="Max"
                  className="w-20 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  value={localFilters.priceRange.max}
                  onChange={(e) => handlePriceRangeChange(localFilters.priceRange.min, Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Other filters */}
          <div className="border-t border-gray-200 py-6">
            <h3 className="text-sm font-medium text-gray-900">Other Filters</h3>
            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <input
                  id="only-discounted"
                  name="only-discounted"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={localFilters.onlyDiscounted}
                  onChange={() => handleCheckboxChange('onlyDiscounted')}
                />
                <label htmlFor="only-discounted" className="ml-3 text-sm text-gray-600">
                  Only show discounted items
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="only-in-stock"
                  name="only-in-stock"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  checked={localFilters.onlyInStock}
                  onChange={() => handleCheckboxChange('onlyInStock')}
                />
                <label htmlFor="only-in-stock" className="ml-3 text-sm text-gray-600">
                  Only show in-stock items
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar; 