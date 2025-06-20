import supabase from './supabase';
import { Product, ProductsResponse } from './productService';
import { SearchFilters } from '../context/SearchContext';

export interface SearchSortOptions {
  sortBy: 'price' | 'discount' | 'name' | 'popularity';
  sortOrder: 'asc' | 'desc';
}

export interface SearchResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  query: string;
}

// Search for products
export const searchProducts = async (
  query: string,
  filters: SearchFilters = {}
): Promise<ProductsResponse> => {
  try {
    // Start building the query
    let supabaseQuery = supabase
      .from('products')
      .select(`
        id,
        name,
        brand,
        description,
        image_url,
        category_id,
        unit,
        prices (
          current_price,
          original_price,
          discount_percentage,
          store_id,
          in_stock,
          stores (
            name
          )
        )
      `, { count: 'exact' });

    // Apply text search
    if (query) {
      supabaseQuery = supabaseQuery.textSearch('name', query, {
        type: 'websearch',
        config: 'english',
      });
    }

    // Apply category filter
    if (filters.category) {
      supabaseQuery = supabaseQuery.eq('category_id', filters.category);
    }

    // Apply price filters
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      // We need to filter on the prices table
      // This is a bit complex with Supabase, but we can use a stored procedure or a view for this
      // For now, we'll get all results and filter in-memory
    }

    // Apply store filter
    if (filters.stores && filters.stores.length > 0) {
      // Similar to price filters, this requires filtering on a joined table
      // We'll get all results and filter in-memory
    }

    // Apply sorting
    if (filters.sortBy) {
      const order = filters.sortOrder === 'desc' ? true : false;
      
      switch (filters.sortBy) {
        case 'price':
          // Sort by price would need to be done in-memory
          break;
        case 'name':
          supabaseQuery = supabaseQuery.order('name', { ascending: !order });
          break;
        case 'discount':
          // Sort by discount would need to be done in-memory
          break;
      }
    }

    // Execute the query
    const { data, error, count } = await supabaseQuery;

    if (error) {
      throw error;
    }

    // Format products
    let products = data?.map(item => {
      // Get the best price from all available stores
      const prices = item.prices || [];
      const bestPrice = prices.length > 0 ? prices.reduce((best: any, current: any) => {
        return (current.current_price < best.current_price) ? current : best;
      }, prices[0]) : null;

      return {
        id: item.id,
        name: item.name,
        brand: item.brand,
        image: item.image_url,
        description: item.description,
        category: item.category_id,
        unit: item.unit,
        currentPrice: bestPrice?.current_price || 0,
        originalPrice: bestPrice?.original_price || 0,
        discount: bestPrice?.discount_percentage || 0,
        store: bestPrice?.stores?.name || 'Unknown',
        isRealDeal: false // We'll determine this later
      };
    }) || [];

    // Apply in-memory filters for complex cases
    if (filters.minPrice !== undefined) {
      products = products.filter(p => p.currentPrice >= (filters.minPrice || 0));
    }

    if (filters.maxPrice !== undefined) {
      products = products.filter(p => p.currentPrice <= (filters.maxPrice || Infinity));
    }

    if (filters.stores && filters.stores.length > 0) {
      products = products.filter(p => filters.stores?.includes(p.store));
    }

    // Apply in-memory sorting for complex cases
    if (filters.sortBy) {
      const order = filters.sortOrder === 'desc' ? -1 : 1;
      
      switch (filters.sortBy) {
        case 'price':
          products.sort((a, b) => (a.currentPrice - b.currentPrice) * order);
          break;
        case 'discount':
          products.sort((a, b) => (a.discount - b.discount) * order);
          break;
      }
    }

    return { 
      products, 
      total: count || products.length 
    };
  } catch (error) {
    console.error('Error searching products:', error);
    return { products: [], total: 0 };
  }
};

// Get search suggestions
export const getSearchSuggestions = async (query: string): Promise<string[]> => {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    // Get product name suggestions
    const { data, error } = await supabase
      .from('products')
      .select('name')
      .textSearch('name', query, {
        type: 'websearch',
        config: 'english',
      })
      .limit(10);

    if (error) {
      throw error;
    }

    // Extract unique names
    const suggestions = [...new Set(data?.map(item => item.name) || [])];
    
    return suggestions;
  } catch (error) {
    console.error('Error getting search suggestions:', error);
    return [];
  }
};

// Get available filter options for current search
export const getFilterOptions = async (query: string): Promise<{
  stores: { name: string; count: number }[];
  brands: { name: string; count: number }[];
  categories: { id: string; name: string; count: number }[];
  priceRange: { min: number; max: number };
  labels: { name: string; count: number }[];
}> => {
  try {
    const response = await supabase.from('products').select('*').textSearch('name', query, {
      type: 'websearch',
      config: 'english',
    });
    return {
      stores: [],
      brands: [],
      categories: [],
      priceRange: { min: 0, max: 0 },
      labels: [],
    };
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return {
      stores: [],
      brands: [],
      categories: [],
      priceRange: { min: 0, max: 0 },
      labels: [],
    };
  }
};

// Save search query to user history
export const saveSearchQuery = async (query: string): Promise<void> => {
  try {
    await supabase.from('search_history').insert({ query });
  } catch (error) {
    console.error('Error saving search query to history:', error);
  }
};

// Get user's search history
export const getSearchHistory = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase.from('search_history').select('query');
    if (error) {
      throw error;
    }
    return data.map((item: { query: string }) => item.query);
  } catch (error) {
    console.error('Error fetching search history:', error);
    return [];
  }
}; 