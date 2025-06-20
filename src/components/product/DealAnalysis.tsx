import React from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { formatPrice } from '../../utils/formatting';
import { DealAnalysis as DealAnalysisType } from '../../services/productService';

interface DealAnalysisProps {
  analysis: DealAnalysisType;
}

const DealAnalysis: React.FC<DealAnalysisProps> = ({ analysis }) => {
  const getStatusIcon = () => {
    if (analysis.isRealDeal) {
      return <CheckCircleIcon className="h-8 w-8 text-success-500" />;
    } else {
      return <ExclamationCircleIcon className="h-8 w-8 text-amber-500" />;
    }
  };

  const getStatusColor = () => {
    return analysis.isRealDeal ? 'bg-success-50 border-success-200' : 'bg-amber-50 border-amber-200';
  };

  const getVolatilityBadge = () => {
    switch (analysis.priceVolatility.toLowerCase()) {
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-danger-100 text-danger-800">
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
            Low
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Unknown
          </span>
        );
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getStatusColor()}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">{getStatusIcon()}</div>
        <div className="ml-3">
          <h3 className="text-lg font-medium">
            {analysis.isRealDeal ? 'This is a real deal!' : 'This might not be the best deal'}
          </h3>
          <p className="mt-2 text-sm text-gray-600">{analysis.recommendation}</p>
          
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded-md shadow-sm">
              <div className="text-sm font-medium text-gray-500">Lowest Price Ever</div>
              <div className="mt-1 text-lg font-semibold text-gray-900">{formatPrice(analysis.lowestPriceEver)}</div>
            </div>
            
            <div className="bg-white p-3 rounded-md shadow-sm">
              <div className="text-sm font-medium text-gray-500">Average Price</div>
              <div className="mt-1 text-lg font-semibold text-gray-900">{formatPrice(analysis.averagePrice)}</div>
            </div>
            
            <div className="bg-white p-3 rounded-md shadow-sm">
              <div className="text-sm font-medium text-gray-500">Price Volatility</div>
              <div className="mt-1">{getVolatilityBadge()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealAnalysis; 