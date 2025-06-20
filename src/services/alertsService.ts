import supabase, { PriceAlert } from './supabase';
import { getCurrentUser, isAuthenticated } from './authService';
import { getItem, setItem } from '../utils/storage';

// Local storage key for guest alerts
const ALERTS_STORAGE_KEY = 'priceRadar_alerts';

// Interface for price alert creation
export interface CreateAlertData {
  productId: string;
  targetPrice: number;
  notificationMethod: 'email' | 'push' | 'both';
}

// Interface for price alert with product details
export interface PriceAlertWithProduct {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  currentPrice: number;
  targetPrice: number;
  isActive: boolean;
  notificationMethod: 'email' | 'push' | 'both';
  createdAt: string;
}

/**
 * Get all price alerts for the current user
 */
export const getAlerts = async (): Promise<PriceAlertWithProduct[]> => {
  // For authenticated users, get alerts from Supabase
  if (isAuthenticated()) {
    try {
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        return [];
      }
      
      // Get user's alerts with product details
      const { data, error } = await supabase
        .from('price_alerts')
        .select(`
          id,
          product_id,
          target_price,
          is_active,
          notification_method,
          created_at,
          products (
            name,
            image_url,
            prices (
              current_price
            )
          )
        `)
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });
      
      if (error || !data) {
        console.error('Error fetching price alerts:', error);
        return [];
      }
      
      // Format the alerts
             return data.map(alert => {
        // Get the current price from the product's prices
        const product = alert.products as any; // Type assertion for nested JSON
        const prices = product?.prices || [];
        const currentPrice = prices.length > 0 
          ? prices[0].current_price 
          : 0;
        
        return {
          id: alert.id,
          productId: alert.product_id,
          productName: product?.name || 'Unknown Product',
          productImage: product?.image_url || '',
          currentPrice,
          targetPrice: alert.target_price,
          isActive: alert.is_active,
          notificationMethod: alert.notification_method,
          createdAt: alert.created_at
        };
      });
    } catch (error) {
      console.error('Error fetching alerts from Supabase:', error);
      return [];
    }
  } 
  
  // For guests, get alerts from local storage
  else {
    try {
      return getItem<PriceAlertWithProduct[]>(ALERTS_STORAGE_KEY) || [];
    } catch (error) {
      console.error('Error retrieving alerts from localStorage:', error);
      return [];
    }
  }
};

/**
 * Create a new price alert
 */
export const createAlert = async (data: CreateAlertData): Promise<PriceAlertWithProduct> => {
  // For authenticated users, create alert in Supabase
  if (isAuthenticated()) {
    try {
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      // Create the alert
      const { data: alertData, error } = await supabase
        .from('price_alerts')
        .insert([
          {
            user_id: currentUser.id,
            product_id: data.productId,
            target_price: data.targetPrice,
            is_active: true,
            notification_method: data.notificationMethod
          }
        ])
        .select('*')
        .single();
      
      if (error || !alertData) {
        throw new Error(error?.message || 'Failed to create price alert');
      }
      
      // Get product details
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select(`
          name,
          image_url,
          prices (
            current_price
          )
        `)
        .eq('id', data.productId)
        .single();
      
      if (productError || !productData) {
        throw new Error(productError?.message || 'Failed to get product details');
      }
      
      // Get current price
      const prices = productData.prices || [];
      const currentPrice = prices.length > 0 ? prices[0].current_price : 0;
      
      // Return the alert with product details
      return {
        id: alertData.id,
        productId: alertData.product_id,
        productName: productData.name,
        productImage: productData.image_url,
        currentPrice,
        targetPrice: alertData.target_price,
        isActive: alertData.is_active,
        notificationMethod: alertData.notification_method,
        createdAt: alertData.created_at
      };
    } catch (error: any) {
      console.error('Error creating price alert:', error);
      throw new Error(error.message || 'Failed to create price alert');
    }
  } 
  
  // For guests, store alert in local storage
  else {
    try {
      // Get product details (in a real app, you'd fetch this from an API)
      // For now, we'll use mock data
      const mockProduct = {
        name: 'Product Name', // This would be fetched from your product service
        image: 'https://example.com/image.jpg'
      };
      
      // Create the alert
      const newAlert: PriceAlertWithProduct = {
        id: `local-${Date.now()}`,
        productId: data.productId,
        productName: mockProduct.name,
        productImage: mockProduct.image,
        currentPrice: 0, // This would be fetched from your product service
        targetPrice: data.targetPrice,
        isActive: true,
        notificationMethod: data.notificationMethod,
        createdAt: new Date().toISOString()
      };
      
      // Add to local storage
      const alerts = getItem<PriceAlertWithProduct[]>(ALERTS_STORAGE_KEY) || [];
      const updatedAlerts = [newAlert, ...alerts];
      setItem(ALERTS_STORAGE_KEY, updatedAlerts);
      
      return newAlert;
    } catch (error: any) {
      console.error('Error creating local price alert:', error);
      throw new Error(error.message || 'Failed to create price alert');
    }
  }
};

/**
 * Delete a price alert
 */
export const deleteAlert = async (alertId: string): Promise<void> => {
  // For authenticated users, delete from Supabase
  if (isAuthenticated()) {
    try {
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      // Delete the alert
      const { error } = await supabase
        .from('price_alerts')
        .delete()
        .eq('id', alertId)
        .eq('user_id', currentUser.id);
      
      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      console.error('Error deleting price alert:', error);
      throw new Error(error.message || 'Failed to delete price alert');
    }
  } 
  
  // For guests, remove from local storage
  else {
    try {
      const alerts = getItem<PriceAlertWithProduct[]>(ALERTS_STORAGE_KEY) || [];
      const updatedAlerts = alerts.filter(alert => alert.id !== alertId);
      setItem(ALERTS_STORAGE_KEY, updatedAlerts);
    } catch (error: any) {
      console.error('Error deleting local price alert:', error);
      throw new Error(error.message || 'Failed to delete price alert');
    }
  }
};

/**
 * Toggle a price alert's active status
 */
export const toggleAlertStatus = async (alertId: string): Promise<boolean> => {
  // For authenticated users, update in Supabase
  if (isAuthenticated()) {
    try {
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      // Get current status
      const { data: alertData, error: fetchError } = await supabase
        .from('price_alerts')
        .select('is_active')
        .eq('id', alertId)
        .eq('user_id', currentUser.id)
        .single();
      
      if (fetchError || !alertData) {
        throw new Error(fetchError?.message || 'Failed to fetch alert status');
      }
      
      const newStatus = !alertData.is_active;
      
      // Update the alert
      const { error: updateError } = await supabase
        .from('price_alerts')
        .update({ is_active: newStatus })
        .eq('id', alertId)
        .eq('user_id', currentUser.id);
      
      if (updateError) {
        throw new Error(updateError.message);
      }
      
      return newStatus;
    } catch (error: any) {
      console.error('Error toggling price alert status:', error);
      throw new Error(error.message || 'Failed to toggle alert status');
    }
  } 
  
  // For guests, update in local storage
  else {
    try {
      const alerts = getItem<PriceAlertWithProduct[]>(ALERTS_STORAGE_KEY) || [];
      const updatedAlerts = alerts.map(alert => {
        if (alert.id === alertId) {
          return { ...alert, isActive: !alert.isActive };
        }
        return alert;
      });
      
      setItem(ALERTS_STORAGE_KEY, updatedAlerts);
      
      // Return the new status
      const updatedAlert = updatedAlerts.find(alert => alert.id === alertId);
      return updatedAlert ? updatedAlert.isActive : false;
    } catch (error: any) {
      console.error('Error toggling local price alert status:', error);
      throw new Error(error.message || 'Failed to toggle alert status');
    }
  }
};

/**
 * Update a price alert's target price
 */
export const updateAlertPrice = async (alertId: string, newPrice: number): Promise<void> => {
  if (newPrice <= 0) {
    throw new Error('Target price must be greater than zero');
  }
  
  // For authenticated users, update in Supabase
  if (isAuthenticated()) {
    try {
      const currentUser = getCurrentUser();
      
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      
      // Update the alert
      const { error } = await supabase
        .from('price_alerts')
        .update({ target_price: newPrice })
        .eq('id', alertId)
        .eq('user_id', currentUser.id);
      
      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      console.error('Error updating price alert:', error);
      throw new Error(error.message || 'Failed to update price alert');
    }
  } 
  
  // For guests, update in local storage
  else {
    try {
      const alerts = getItem<PriceAlertWithProduct[]>(ALERTS_STORAGE_KEY) || [];
      const updatedAlerts = alerts.map(alert => {
        if (alert.id === alertId) {
          return { ...alert, targetPrice: newPrice };
        }
        return alert;
      });
      
      setItem(ALERTS_STORAGE_KEY, updatedAlerts);
    } catch (error: any) {
      console.error('Error updating local price alert:', error);
      throw new Error(error.message || 'Failed to update price alert');
    }
  }
};

/**
 * Sync local alerts with server after login
 */
export const syncAlertsAfterLogin = async (): Promise<void> => {
  try {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      return;
    }
    
    // Get local alerts
    const localAlerts = getItem<PriceAlertWithProduct[]>(ALERTS_STORAGE_KEY);
    
    if (localAlerts && localAlerts.length > 0) {
      // For each local alert, create a server alert
      for (const alert of localAlerts) {
        await supabase.from('price_alerts').insert([
          {
            user_id: currentUser.id,
            product_id: alert.productId,
            target_price: alert.targetPrice,
            is_active: alert.isActive,
            notification_method: alert.notificationMethod
          }
        ]);
      }
      
      // Clear local storage after sync
      setItem(ALERTS_STORAGE_KEY, []);
    }
  } catch (error) {
    console.error('Error syncing alerts after login:', error);
  }
}; 