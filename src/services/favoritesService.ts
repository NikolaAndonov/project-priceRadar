import supabase from './supabase';
import { Product } from './productService';

// Get user's favorites
export const getFavorites = async (): Promise<Product[]> => {
  try {
    // Get the current user
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      throw new Error('User not authenticated');
    }

    // Get favorites
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        product_id,
        products (
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
        )
      `)
      .eq('user_id', userData.user.id);

    if (error) {
      throw error;
    }

    // Format products
    return data?.map(item => {
      const product = item.products;
      // Get the best price from all available stores
      const prices = product.prices || [];
      const bestPrice = prices.length > 0 ? prices.reduce((best: any, current: any) => {
        return (current.current_price < best.current_price) ? current : best;
      }, prices[0]) : null;

      return {
        id: product.id,
        name: product.name,
        brand: product.brand,
        image: product.image_url,
        description: product.description,
        category: product.category_id,
        unit: product.unit,
        currentPrice: bestPrice?.current_price || 0,
        originalPrice: bestPrice?.original_price || 0,
        discount: bestPrice?.discount_percentage || 0,
        store: bestPrice?.stores?.name || 'Unknown',
        isRealDeal: false // We'll determine this later
      };
    }) || [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

// Add product to favorites
export const addToFavorites = async (product: Product): Promise<boolean> => {
  try {
    // Get the current user
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      throw new Error('User not authenticated');
    }

    // Add to favorites
    const { error } = await supabase.from('favorites').insert({
      user_id: userData.user.id,
      product_id: product.id,
      created_at: new Date().toISOString()
    });

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
};

// Remove product from favorites
export const removeFromFavorites = async (productId: string): Promise<boolean> => {
  try {
    // Get the current user
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      throw new Error('User not authenticated');
    }

    // Remove from favorites
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userData.user.id)
      .eq('product_id', productId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
};

// Check if a product is in favorites
export const checkIsFavorite = async (productId: string): Promise<boolean> => {
  try {
    // Get the current user
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      return false;
    }

    // Check favorites
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userData.user.id)
      .eq('product_id', productId)
      .single();

    if (error) {
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
}; 