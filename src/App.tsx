import React from 'react';
import { Routes, Route, Link, useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Product } from './context/ProductContext';
import { useProducts } from './hooks';
import Layout from './components/layout/Layout';
import SearchBar from './components/search/SearchBar';

// Simple ProductCard component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const discountPercentage = Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100);
  
  return (
    <div className="product-card group">
      {product.discount > 0 && (
        <div className="discount-tag">-{discountPercentage}%</div>
      )}
      <div className="product-image-container">
        <img 
          src={product.image || '/images/placeholder.svg'} 
          alt={product.name}
          className="product-image"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = '/images/placeholder.svg';
          }}
        />
      </div>
      <div className="p-4">
        <p className="product-store">{product.store}</p>
        <h3 className="product-title mt-1">{product.name}</h3>
        <p className="product-meta mt-1">{product.brand} · {product.unit}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="price-current">${product.currentPrice.toFixed(2)}</span>
          {product.originalPrice > product.currentPrice && (
            <span className="price-original">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        {product.isRealDeal && (
          <div className="mt-2">
            <span className="badge badge-success">Best Deal</span>
          </div>
        )}
      </div>
    </div>
  );
};

// HomePage component
const HomePage = () => {
  const { topDeals, featuredProducts, isLoading } = useProducts();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8 h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-blue-purple text-white py-16 px-4 rounded-b-3xl">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Find the Best Deals on Products You Love
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Compare prices across multiple stores and save money on your shopping.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/search?q=groceries" className="btn bg-white text-primary-600 hover:bg-blue-50">
                  Groceries
                </Link>
                <Link to="/search?q=electronics" className="btn bg-white text-primary-600 hover:bg-blue-50">
                  Electronics
                </Link>
                <Link to="/search?q=household" className="btn bg-white text-primary-600 hover:bg-blue-50">
                  Household
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/images/placeholder.svg" 
                alt="Shopping savings" 
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Top Deals Section */}
        <section className="mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Top Deals Today</h2>
            <Link to="/search?q=deals" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              View all deals
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDeals.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="block transform hover:-translate-y-1 transition-transform duration-300">
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </section>
        
        {/* Featured Products Section */}
        <section className="mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/search" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              View all products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="block transform hover:-translate-y-1 transition-transform duration-300">
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Groceries', 'Beverages', 'Dairy', 'Household', 'Electronics', 'Clothing'].map(category => (
              <Link 
                key={category} 
                to={`/search?q=${category.toLowerCase()}`}
                className="card-glass p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300 hover:bg-primary-50 group"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-3 group-hover:bg-primary-200 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <div className="text-gray-800 font-medium group-hover:text-primary-700 transition-colors duration-300">{category}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// ProductPage component
const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { products, isLoading } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8 h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">We couldn't find the product you're looking for.</p>
        <button 
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Return to Home
        </button>
      </div>
    );
  }
  
  const discountPercentage = Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100);
  
  // Check if we came from search results
  const fromSearch = location.key !== 'default' && location.state?.from === 'search';
  
  const handleGoBack = () => {
    if (fromSearch) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <button 
          onClick={handleGoBack}
          className="mb-8 flex items-center text-primary-600 hover:text-primary-800 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to {fromSearch ? 'Search Results' : 'Home'}
        </button>
        
        <div className="card p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="aspect-w-1 aspect-h-1 bg-gray-100">
                  <img 
                    src={product.image || '/images/placeholder.svg'} 
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = '/images/placeholder.svg';
                    }}
                  />
                </div>
              </div>
              
              {/* Store Information */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-2">Available at</h3>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-gray-600">{product.store.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.store}</p>
                    <p className="text-sm text-gray-600">In stock</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="badge badge-primary">{product.category}</span>
                {product.isRealDeal && <span className="badge badge-success">Best Deal</span>}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.brand} · {product.unit}</p>
              
              {product.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{product.description}</p>
                </div>
              )}
              
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">${product.currentPrice.toFixed(2)}</span>
                  {product.originalPrice > product.currentPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                      <span className="text-green-600 font-medium">Save {discountPercentage}%</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Deal Analysis</h3>
                <div className={`p-4 rounded-lg flex items-start ${product.isRealDeal ? 'bg-green-50' : 'bg-yellow-50'}`}>
                  <div className={`rounded-full p-2 mr-3 ${product.isRealDeal ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {product.isRealDeal ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${product.isRealDeal ? 'text-green-700' : 'text-yellow-700'}`}>
                      {product.isRealDeal ? 'This is a good deal!' : 'This price has been lower in the past.'}
                    </p>
                    <p className="text-sm mt-1 text-gray-600">
                      {product.isRealDeal 
                        ? 'Based on historical pricing data, this is one of the best prices we\'ve seen for this product.'
                        : 'We\'ve seen this product at a lower price in the last 30 days.'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn btn-primary flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  View at {product.store}
                </button>
                <button className="btn btn-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SearchResultsPage component
const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products, isLoading } = useProducts();
  
  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.brand.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) ||
    product.store.toLowerCase().includes(query.toLowerCase())
  );
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8 h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
          <p className="text-gray-600">
            {filteredProducts.length === 0 
              ? 'No results found' 
              : `Found ${filteredProducts.length} ${filteredProducts.length === 1 ? 'result' : 'results'}`} 
            {query && <span> for "<span className="font-medium">{query}</span>"</span>}
          </p>
        </div>
        
        {filteredProducts.length > 0 && (
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-gray-700 mr-2">Sort by:</span>
            <select className="form-input py-1 pl-3 pr-8 rounded-md text-sm">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Discount</option>
              <option>Name</option>
            </select>
          </div>
        )}
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id}
              state={{ from: 'search' }}
              className="block transform hover:-translate-y-1 transition-transform duration-300"
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="card-glass p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
          <p className="text-gray-600 mb-6">We couldn't find any products matching your search.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn btn-primary">
              Return to Home
            </Link>
            <Link to="/search" className="btn btn-outline">
              Browse All Products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const NotFoundPage = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-red-600">404 - Not Found</h1>
    <p className="mt-4">The page you're looking for doesn't exist.</p>
  </div>
);

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App; 