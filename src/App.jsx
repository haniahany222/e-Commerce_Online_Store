import React, { useState } from 'react';
import './App.css';


const PRODUCT_DATA = [
  { id: 1, name: 'Laptop', price: 1200, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60' },
  { id: 2, name: 'iPhone', price: 900, image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60' },
  { id: 3, name: 'Smart Watch', price: 250, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60' },
  { id: 4, name: 'Headphones', price: 150, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('login'); 
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  
  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentPage('products');
  };

  
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const filteredProducts = PRODUCT_DATA.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (currentPage === 'login') {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="brand-header">
            <span className="cart-icon">🛒</span>
            <h2>ShopEase</h2>
          </div>
          <p className="subtitle">Welcome Back</p>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Enter Email" required className="form-input" />
            <input type="password" placeholder="Enter Password" required className="form-input" />
            <button type="submit" className="btn btn-primary login-btn">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">

      <aside className="sidebar">
        <h2 className="sidebar-brand">Shop</h2>
        <nav className="nav-menu">
          <button 
            className={`nav-link ${currentPage === 'products' ? 'active' : ''}`}
            onClick={() => setCurrentPage('products')}
          >
            Products
          </button>
          <button 
            className={`nav-link ${currentPage === 'cart' ? 'active' : ''}`}
            onClick={() => setCurrentPage('cart')}
          >
            Cart {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>
        </nav>
      </aside>


      <main className="main-content">
        {currentPage === 'products' ? (
          <div>

            <div className="top-bar">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="user-profile">
                <span className="user-icon">👤</span> User
              </div>
            </div>

            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-image" />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-price">${product.price}</p>
                    <button onClick={() => addToCart(product)} className="btn btn-primary w-100">
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && <p>No products match your search.</p>}
            </div>
          </div>
        ) : (
        
          <div className="cart-page">
            <h2 className="page-title">🛒 Shopping Cart</h2>
            <div className="cart-list">
              {cart.map((item, index) => (
                <div key={index} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                  </div>
                </div>
              ))}
              
              {cart.length === 0 ? (
                <p className="empty-message">Your cart is currently empty</p>
              ) : (
                <div className="cart-summary">
                  <h3>Total: ${cartTotal}</h3>
                  <button className="btn btn-checkout">Checkout</button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}