import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import * as searchService from '../services/searchService';
import { Product } from '../services/productService';

// Filter types
export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  stores?: string[];
  inStock?: boolean;
  sortBy?: 'price' | 'discount' | 'name';
  sortOrder?: 'asc' | 'desc';
}

interface SearchContextType {
  searchQuery: string;
  searchResults: Product[];
  filters: SearchFilters;
  isLoading: boolean;
  error: string | null;
  totalResults: number;
  suggestions: string[];
  setSearchQuery: (query: string) => void;
  performSearch: () => Promise<void>;
  updateFilters: (newFilters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
  getSuggestions: (query: string) => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Perform search with current query and filters
  const performSearch = async (): Promise<void> => {
    if (!searchQuery.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const { products, total } = await searchService.searchProducts(searchQuery, filters);
      setSearchResults(products);
      setTotalResults(total);
      
      // Navigate to search results page if not already there
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } catch (err: any) {
      setError(err.message || 'Search failed. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update filters
  const updateFilters = (newFilters: Partial<SearchFilters>): void => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    
    // Re-search with new filters if there's an active query
    if (searchQuery) {
      performSearch();
    }
  };

  // Clear all filters
  const clearFilters = (): void => {
    setFilters({});
    
    // Re-search without filters if there's an active query
    if (searchQuery) {
      performSearch();
    }
  };

  // Get search suggestions
  const getSuggestions = async (query: string): Promise<void> => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const results = await searchService.getSearchSuggestions(query);
      setSuggestions(results);
    } catch (err) {
      console.error('Error fetching search suggestions:', err);
      setSuggestions([]);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        searchResults,
        filters,
        isLoading,
        error,
        totalResults,
        suggestions,
        setSearchQuery,
        performSearch,
        updateFilters,
        clearFilters,
        getSuggestions
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export default SearchContext; 