import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as favoritesService from '../services/favoritesService';
import { Product } from '../services/productService';
import { useAuth } from '../hooks/useAuth';

interface FavoritesContextType {
  favorites: Product[];
  isLoading: boolean;
  error: string | null;
  addToFavorites: (product: Product) => Promise<void>;
  removeFromFavorites: (productId: string) => Promise<void>;
  toggleFavorite: (product: Product) => Promise<boolean>;
  isFavorite: (productId: string) => boolean;
  refreshFavorites: () => Promise<void>;
  clearError: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load favorites on mount and when user changes
  useEffect(() => {
    refreshFavorites();
  }, [user?.id]);

  // Fetch all favorites
  const refreshFavorites = async () => {
    setIsLoading(true);
    try {
      const favoritesData = await favoritesService.getFavorites();
      setFavorites(favoritesData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch favorites');
      console.error('Error fetching favorites:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add product to favorites
  const addToFavorites = async (product: Product) => {
    setIsLoading(true);
    setError(null);
    try {
      await favoritesService.addToFavorites(product);
      setFavorites(prev => {
        // Check if product is already in favorites
        if (prev.some(fav => fav.id === product.id)) {
          return prev;
        }
        return [...prev, product];
      });
    } catch (err: any) {
      setError(err.message || 'Failed to add to favorites');
      console.error('Error adding to favorites:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove product from favorites
  const removeFromFavorites = async (productId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await favoritesService.removeFromFavorites(productId);
      setFavorites(prev => prev.filter(product => product.id !== productId));
    } catch (err: any) {
      setError(err.message || 'Failed to remove from favorites');
      console.error('Error removing from favorites:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle favorite status
  const toggleFavorite = async (product: Product) => {
    setIsLoading(true);
    setError(null);
    try {
      const isFav = await favoritesService.checkIsFavorite(product.id);
      
      if (isFav) {
        await favoritesService.removeFromFavorites(product.id);
        setFavorites(prev => prev.filter(fav => fav.id !== product.id));
        return false;
      } else {
        await favoritesService.addToFavorites(product);
        setFavorites(prev => {
          if (prev.some(fav => fav.id === product.id)) {
            return prev;
          }
          return [...prev, product];
        });
        return true;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update favorites');
      console.error('Error toggling favorite:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if product is in favorites
  const isFavorite = (productId: string) => {
    return favorites.some(product => product.id === productId);
  };

  // Clear error
  const clearError = () => setError(null);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoading,
        error,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        refreshFavorites,
        clearError
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export default FavoritesContext; 