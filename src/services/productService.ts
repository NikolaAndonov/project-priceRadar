import supabase from './supabase';

export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  description?: string;
  category: string;
  unit: string;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  store: string;
  isRealDeal?: boolean;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export interface PriceHistory {
  date: string;
  price: number;
  store: string;
}

export interface DealAnalysis {
  isRealDeal: boolean;
  lowestPriceEver: number;
  averagePrice: number;
  priceDropPercentage: number;
  recommendation: string;
}

// Get a single product by ID
export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
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
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Error fetching product:', error);
      return null;
    }

    // Get the best price from all available stores
    const prices = data.prices || [];
    const bestPrice = prices.length > 0 ? prices.reduce((best, current) => {
      return (current.current_price < best.current_price) ? current : best;
    }, prices[0]) : null;

    // Format the product
    return {
      id: data.id,
      name: data.name,
      brand: data.brand,
      image: data.image_url,
      description: data.description,
      category: data.category_id,
      unit: data.unit,
      currentPrice: bestPrice?.current_price || 0,
      originalPrice: bestPrice?.original_price || 0,
      discount: bestPrice?.discount_percentage || 0,
      store: bestPrice?.stores?.[0]?.name || 'Unknown',
      isRealDeal: true // We'll determine this later
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// Get products by category
export const getProductsByCategory = async (categoryId: string): Promise<ProductsResponse> => {
  try {
    // First check if we need to include subcategories
    const { data: subcategories } = await supabase
      .from('categories')
      .select('id')
      .eq('parent_id', categoryId);
    
    // Create an array of category IDs to search (parent + children)
    const categoryIds = [categoryId];
    if (subcategories) {
      subcategories.forEach(sub => categoryIds.push(sub.id));
    }

    // Get products
    const { data, error, count } = await supabase
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
      `, { count: 'exact' })
      .in('category_id', categoryIds)
      .order('name');

    if (error) {
      console.error('Error fetching products by category:', error);
      return { products: [], total: 0 };
    }

    // Format products
    const products = data?.map(item => {
      // Get the best price from all available stores
      const prices = item.prices || [];
      const bestPrice = prices.length > 0 ? prices.reduce((best, current) => {
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
        store: bestPrice?.stores?.[0]?.name || 'Unknown',
        isRealDeal: true // We'll determine this later
      };
    }) || [];

    return { products, total: count || 0 };
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return { products: [], total: 0 };
  }
};

// Get featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    // Get a random selection of products
    const { data, error } = await supabase
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
      `)
      .limit(6);

    if (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }

    // Format products
    return data?.map(item => {
      // Get the best price from all available stores
      const prices = item.prices || [];
      const bestPrice = prices.length > 0 ? prices.reduce((best, current) => {
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
        store: bestPrice?.stores?.[0]?.name || 'Unknown',
        isRealDeal: true
      };
    }) || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

// Get top deals
export const getTopDeals = async (): Promise<Product[]> => {
  try {
    // Get products with the highest discount percentage
    const { data, error } = await supabase
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
      `)
      .order('prices.discount_percentage', { ascending: false })
      .limit(8);

    if (error) {
      console.error('Error fetching top deals:', error);
      return [];
    }

    // Format products
    return data?.map(item => {
      // Get the best price from all available stores
      const prices = item.prices || [];
      const bestPrice = prices.length > 0 ? prices.reduce((best, current) => {
        return (current.discount_percentage > best.discount_percentage) ? current : best;
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
        store: bestPrice?.stores?.[0]?.name || 'Unknown',
        isRealDeal: true
      };
    }) || [];
  } catch (error) {
    console.error('Error fetching top deals:', error);
    return [];
  }
};

// Get price history for a product
export const getPriceHistory = async (productId: string): Promise<PriceHistory[]> => {
  try {
    const { data, error } = await supabase
      .from('price_history')
      .select(`
        price,
        date,
        stores (
          name
        )
      `)
      .eq('product_id', productId)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching price history:', error);
      return [];
    }

    return data?.map(item => ({
      date: item.date,
      price: item.price,
      store: item.stores?.[0]?.name || 'Unknown'
    })) || [];
  } catch (error) {
    console.error('Error fetching price history:', error);
    return [];
  }
};

// Analyze if a deal is good based on price history
export const analyzeDeal = async (productId: string): Promise<DealAnalysis> => {
  try {
    // Get current price
    const product = await getProduct(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Get price history
    const priceHistory = await getPriceHistory(productId);
    if (priceHistory.length === 0) {
      return {
        isRealDeal: false,
        lowestPriceEver: product.currentPrice,
        averagePrice: product.currentPrice,
        priceDropPercentage: 0,
        recommendation: 'Not enough price history data to analyze.'
      };
    }

    // Calculate metrics
    const prices = priceHistory.map(item => item.price);
    const lowestPriceEver = Math.min(...prices);
    const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const priceDropPercentage = ((averagePrice - product.currentPrice) / averagePrice) * 100;

    // Determine if it's a good deal
    const isRealDeal = product.currentPrice <= lowestPriceEver * 1.05; // Within 5% of lowest price ever

    // Generate recommendation
    let recommendation = '';
    if (isRealDeal) {
      recommendation = 'This is a great deal! The current price is at or near the lowest we\'ve seen.';
    } else if (priceDropPercentage > 0) {
      recommendation = `The price is ${priceDropPercentage.toFixed(1)}% below average, but we've seen better prices before.`;
    } else {
      recommendation = 'This is not a particularly good deal. We recommend waiting for a price drop.';
    }

    return {
      isRealDeal,
      lowestPriceEver,
      averagePrice,
      priceDropPercentage,
      recommendation
    };
  } catch (error) {
    console.error('Error analyzing deal:', error);
    return {
      isRealDeal: false,
      lowestPriceEver: 0,
      averagePrice: 0,
      priceDropPercentage: 0,
      recommendation: 'Unable to analyze this deal due to an error.'
    };
  }
}; 