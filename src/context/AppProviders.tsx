import React from 'react';
import { ProductProvider } from './ProductContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ProductProvider>
      {children}
    </ProductProvider>
  );
};

export default AppProviders; 