import { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories: string[] = ['All', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Discover Our Products
        </h2>
        <p className="text-gray-600 mb-6">
          Browse through our curated collection of premium products
        </p>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-105'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400">No products found in this category</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
