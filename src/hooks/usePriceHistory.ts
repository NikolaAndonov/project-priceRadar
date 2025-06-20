import { useState, useEffect } from 'react';
import { getPriceHistory, PriceHistory } from '../services/productService';

export const usePriceHistory = (productId: string) => {
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPriceHistory = async () => {
      if (!productId) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await getPriceHistory(productId);
        setPriceHistory(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch price history');
        console.error('Error fetching price history:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPriceHistory();
  }, [productId]);

  return { priceHistory, isLoading, error };
}; 