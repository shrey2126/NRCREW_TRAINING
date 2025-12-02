import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [currentPage, setCurrentPage] = useState('products');

  return (
    <CartProvider>
      <div className="min-h-screen">
        <Header 
          onCartClick={() => setShowCart(true)} 
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
        
        <main>
          {currentPage === 'products' && <ProductList />}
        </main>

        {showCart && <Cart onClose={() => setShowCart(false)} />}

        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">© 2024 ShopHub. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
