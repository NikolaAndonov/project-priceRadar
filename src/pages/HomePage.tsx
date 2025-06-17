import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/ui/HeroSection';
import TopDealsSection from '../components/product/TopDealsSection';
import CategoryGrid from '../components/ui/CategoryGrid';
import StoreLogos from '../components/ui/StoreLogos';
import FeatureSection from '../components/ui/FeatureSection';

const HomePage = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <HeroSection />

      {/* Store Logos */}
      <div className="py-6">
        <h2 className="text-center text-lg font-medium text-gray-600 mb-6">Compare prices across major stores</h2>
        <StoreLogos />
      </div>

      {/* Top Deals Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Deals This Week</h2>
          <Link to="/deals" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View all deals
          </Link>
        </div>
        <TopDealsSection />
      </section>

      {/* Categories Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Browse Categories</h2>
          <Link to="/categories" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View all categories
          </Link>
        </div>
        <CategoryGrid />
      </section>

      {/* Features Section */}
      <FeatureSection />
    </div>
  );
};

export default HomePage; 