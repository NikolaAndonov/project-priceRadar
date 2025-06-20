import React, { createContext, useState } from 'react';

// Define Product type
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

// Define the context type
interface ProductContextType {
  products: Product[];
  featuredProducts: Product[];
  topDeals: Product[];
  isLoading: boolean;
  error: string | null;
}

// Create context with default values
export const ProductContext = createContext<ProductContextType>({
  products: [],
  featuredProducts: [],
  topDeals: [],
  isLoading: false,
  error: null
});

// Mock data for testing
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Olive Oil Extra Virgin',
    brand: 'Borges',
    image: '/images/placeholder.svg',
    description: 'Premium quality olive oil',
    category: 'groceries',
    unit: '750ml',
    currentPrice: 9.99,
    originalPrice: 15.99,
    discount: 38,
    store: 'Kaufland',
    isRealDeal: true
  },
  {
    id: '2',
    name: 'Ground Coffee Classic',
    brand: 'Lavazza',
    image: '/images/placeholder.svg',
    description: 'Rich aromatic coffee',
    category: 'beverages',
    unit: '250g',
    currentPrice: 8.49,
    originalPrice: 12.99,
    discount: 35,
    store: 'Lidl',
    isRealDeal: true
  },
  {
    id: '3',
    name: 'Greek Yogurt',
    brand: 'Danone',
    image: '/images/placeholder.svg',
    description: 'Creamy Greek yogurt',
    category: 'dairy',
    unit: '400g',
    currentPrice: 1.99,
    originalPrice: 2.79,
    discount: 29,
    store: 'Billa',
    isRealDeal: true
  },
  {
    id: '4',
    name: 'Toilet Paper 3-Ply',
    brand: 'Zewa',
    image: '/images/placeholder.svg',
    description: 'Soft and strong toilet paper',
    category: 'household',
    unit: '8 rolls',
    currentPrice: 7.49,
    originalPrice: 10.99,
    discount: 32,
    store: 'Fantastico',
    isRealDeal: false
  }
];

// Provider component
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(mockProducts);
  const [featuredProducts] = useState<Product[]>(mockProducts);
  const [topDeals] = useState<Product[]>(mockProducts);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  return (
    <ProductContext.Provider
      value={{
        products,
        featuredProducts,
        topDeals,
        isLoading,
        error
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext; 