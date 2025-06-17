import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../search/SearchBar';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg overflow-hidden shadow-xl">
      <div className="px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Find the <span className="text-yellow-300">real deals</span> in Bulgaria
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl text-primary-100 sm:max-w-3xl">
          Compare actual prices across major retail stores and discover where products are truly cheaper.
        </p>
        <div className="mt-10 max-w-xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="mt-8 text-sm text-primary-100">
          <p>Popular searches: olive oil, toilet paper, coffee, laundry detergent, chicken</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 