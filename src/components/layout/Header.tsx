import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../search/SearchBar';
import Logo from './Logo';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Check if the current path matches the link path
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white bg-opacity-90 backdrop-blur-md shadow-md' 
          : 'bg-gradient-blue-purple'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo />
            <span className={`text-2xl font-bold ml-2 ${scrolled ? 'text-primary-600' : 'text-white'}`}>
              PriceRadar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="w-64">
              <SearchBar />
            </div>
            <nav className="flex items-center space-x-6">
              <Link 
                to="/" 
                className={`font-medium transition-colors duration-200 ${
                  isActive('/') 
                    ? (scrolled ? 'text-primary-600' : 'text-white font-bold') 
                    : (scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-blue-100')
                }`}
              >
                Home
              </Link>
              <Link 
                to="/search?q=deals" 
                className={`font-medium transition-colors duration-200 ${
                  isActive('/search?q=deals') 
                    ? (scrolled ? 'text-primary-600' : 'text-white font-bold') 
                    : (scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-blue-100')
                }`}
              >
                Deals
              </Link>
              <Link 
                to="/search" 
                className={`font-medium transition-colors duration-200 ${
                  isActive('/search') && !location.search.includes('q=deals')
                    ? (scrolled ? 'text-primary-600' : 'text-white font-bold') 
                    : (scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-blue-100')
                }`}
              >
                Browse
              </Link>
              <Link 
                to="/login" 
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  scrolled 
                    ? 'bg-primary-500 text-white hover:bg-primary-600' 
                    : 'bg-white text-primary-600 hover:bg-blue-50'
                }`}
              >
                Sign In
              </Link>
            </nav>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`focus:outline-none ${scrolled ? 'text-gray-700' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (always visible) */}
        <div className="mt-3 md:hidden">
          <SearchBar />
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="mt-3 md:hidden animate-fade-in">
            <div className={`flex flex-col space-y-3 pb-3 rounded-lg ${
              scrolled ? 'bg-white' : 'bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg'
            }`}>
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-md ${
                  isActive('/') 
                    ? 'bg-primary-100 text-primary-700 font-medium' 
                    : scrolled ? 'hover:bg-gray-100' : 'text-white hover:bg-white hover:bg-opacity-20'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/search?q=deals" 
                className={`block px-3 py-2 rounded-md ${
                  isActive('/search?q=deals') 
                    ? 'bg-primary-100 text-primary-700 font-medium' 
                    : scrolled ? 'hover:bg-gray-100' : 'text-white hover:bg-white hover:bg-opacity-20'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Deals
              </Link>
              <Link 
                to="/search" 
                className={`block px-3 py-2 rounded-md ${
                  isActive('/search') && !location.search.includes('q=deals')
                    ? 'bg-primary-100 text-primary-700 font-medium' 
                    : scrolled ? 'hover:bg-gray-100' : 'text-white hover:bg-white hover:bg-opacity-20'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse
              </Link>
              <Link 
                to="/login" 
                className="block px-3 py-2 bg-primary-500 text-white rounded-md font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 