import React from 'react';

const StoreLogos = () => {
  const stores = [
    { id: 'lidl', name: 'Lidl' },
    { id: 'kaufland', name: 'Kaufland' },
    { id: 'billa', name: 'Billa' },
    { id: 'fantastico', name: 'Fantastico' },
    { id: 'tmarket', name: 'T-Market' },
    { id: 'metro', name: 'Metro' },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
      {stores.map((store) => (
        <div key={store.id} className="flex items-center justify-center">
          <div className="h-12 w-24 bg-gray-100 rounded-md flex items-center justify-center text-gray-700 font-medium">
            {store.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreLogos; 