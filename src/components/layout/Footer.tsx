import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Logo />
              <span className="ml-2 text-xl font-bold text-primary-600">PriceRadar.bg</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Compare real prices and promotions across Bulgarian retail stores to find the best deals.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Categories</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/category/groceries" className="text-sm text-gray-600 hover:text-primary-600">
                  Groceries
                </Link>
              </li>
              <li>
                <Link to="/category/beverages" className="text-sm text-gray-600 hover:text-primary-600">
                  Beverages
                </Link>
              </li>
              <li>
                <Link to="/category/dairy" className="text-sm text-gray-600 hover:text-primary-600">
                  Dairy
                </Link>
              </li>
              <li>
                <Link to="/category/cleaning" className="text-sm text-gray-600 hover:text-primary-600">
                  Cleaning
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Stores</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/store/lidl" className="text-sm text-gray-600 hover:text-primary-600">
                  Lidl
                </Link>
              </li>
              <li>
                <Link to="/store/kaufland" className="text-sm text-gray-600 hover:text-primary-600">
                  Kaufland
                </Link>
              </li>
              <li>
                <Link to="/store/billa" className="text-sm text-gray-600 hover:text-primary-600">
                  Billa
                </Link>
              </li>
              <li>
                <Link to="/store/fantastico" className="text-sm text-gray-600 hover:text-primary-600">
                  Fantastico
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">About</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-primary-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-gray-600 hover:text-primary-600">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-primary-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} PriceRadar.bg. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 