import React from 'react';
import { 
  ChartBarIcon, 
  MagnifyingGlassIcon, 
  ArrowTrendingDownIcon,
  BellAlertIcon
} from '@heroicons/react/24/outline';

const FeatureSection = () => {
  const features = [
    {
      name: 'Real-time Price Comparison',
      description: 'Compare prices across major Bulgarian retail stores to find the best deals.',
      icon: MagnifyingGlassIcon,
    },
    {
      name: 'Price History Charts',
      description: 'See how prices have changed over time and identify genuine discounts.',
      icon: ChartBarIcon,
    },
    {
      name: 'Real Deal Detection',
      description: 'We analyze price history to show you which promotions are actually worth it.',
      icon: ArrowTrendingDownIcon,
    },
    {
      name: 'Price Alerts',
      description: 'Get notified when products you follow drop below your target price.',
      icon: BellAlertIcon,
    },
  ];

  return (
    <div className="py-12 bg-gray-50 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">How PriceRadar Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            We help you find genuine savings by tracking real prices, not just advertised discounts.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection; 