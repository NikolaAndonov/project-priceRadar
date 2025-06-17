import React from 'react';
import { Link } from 'react-router-dom';

const CategoryGrid = () => {
  const categories = [
    { id: 'groceries', name: 'Groceries', icon: '🥫' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' },
    { id: 'dairy', name: 'Dairy', icon: '🥛' },
    { id: 'meat', name: 'Meat & Fish', icon: '🥩' },
    { id: 'bakery', name: 'Bakery', icon: '🍞' },
    { id: 'fruits', name: 'Fruits & Vegetables', icon: '🍎' },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹' },
    { id: 'personal-care', name: 'Personal Care', icon: '🧴' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/category/${category.id}`}
          className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-primary-500 hover:shadow-md transition-all"
        >
          <span className="text-3xl mb-2">{category.icon}</span>
          <span className="font-medium text-gray-900">{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid; 