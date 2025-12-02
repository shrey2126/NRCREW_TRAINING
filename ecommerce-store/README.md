# 🛒 ShopHub - E-Commerce Store

A modern, fully-functional e-commerce store built with React, Vite, Tailwind CSS, and Context API for global state management.

## ✨ Features

### Product Listing
- 📦 **12 Premium Products** - Curated collection across multiple categories
- 🏷️ **Category Filtering** - Filter by Electronics, Fashion, Home, Sports, Accessories
- ⭐ **Product Ratings** - Star ratings for each product
- 🖼️ **Beautiful Product Cards** - High-quality images with hover effects
- 💫 **Smooth Animations** - Fade-in, scale, and slide animations

### Shopping Cart
- 🛒 **Add to Cart** - One-click add with visual feedback
- ➕➖ **Quantity Control** - Increase/decrease item quantities
- 🗑️ **Remove Items** - Delete individual items from cart
- 💰 **Real-time Total** - Automatic price calculation
- 🔄 **Persistent Storage** - Cart saved to localStorage
- 🧹 **Clear Cart** - Remove all items at once

### State Management
- 🌐 **Context API** - Global cart state management
- 💾 **LocalStorage Integration** - Cart persists across sessions
- ⚡ **Real-time Updates** - Instant UI updates on cart changes

### UI/UX
- 🎨 **Modern Design** - Clean, professional interface
- 📱 **Fully Responsive** - Works on all device sizes
- ✨ **Smooth Animations** - Engaging user experience
- 🎯 **Intuitive Navigation** - Easy to use interface
- 🔔 **Cart Badge** - Shows item count in header
- 🎭 **Modal Cart** - Slide-in cart overlay

## 🚀 Getting Started

### Installation

```bash
cd ecommerce-store
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management
- **LocalStorage** - Data persistence

## 📁 Project Structure

```
ecommerce-store/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header with cart icon
│   │   ├── ProductList.jsx     # Product grid with filtering
│   │   ├── ProductCard.jsx     # Individual product card
│   │   └── Cart.jsx            # Shopping cart modal
│   ├── context/
│   │   └── CartContext.jsx     # Global cart state management
│   ├── data/
│   │   └── products.js         # Product data
│   ├── App.jsx                 # Main app component
│   └── index.css               # Global styles & animations
```

## 🎯 Key Features Breakdown

### Cart Context Functions
- `addToCart(product)` - Add product or increase quantity
- `removeFromCart(productId)` - Remove item from cart
- `updateQuantity(productId, quantity)` - Update item quantity
- `clearCart()` - Empty the entire cart
- `getCartTotal()` - Calculate total price
- `getCartCount()` - Get total item count

### Animations
- Fade-in on page load
- Scale-in for product cards
- Slide-in for cart modal
- Hover effects on buttons and cards
- Pulse animation on cart badge

## 🎨 Design Features

- Gradient backgrounds
- Glass morphism effects
- Custom scrollbar styling
- Smooth transitions
- Responsive grid layouts
- Professional color scheme

Happy Shopping! 🛍️
