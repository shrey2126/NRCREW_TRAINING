# ShopHub - E-Commerce Store (TypeScript)

A modern, fully-typed e-commerce store built with React, TypeScript, and Tailwind CSS.

## Features

- 🛍️ Browse products by category
- 🛒 Add/remove items from cart
- ➕➖ Update product quantities
- 💾 Persistent cart with localStorage
- 📱 Fully responsive design
- ✨ Smooth animations and transitions
- 🎨 Modern glassmorphic UI
- 🔒 Type-safe with TypeScript

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Context API** - State management

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production
```bash
npm run build
```

## Project Structure

```
ShopHub_typescript/
├── src/
│   ├── components/       # React components
│   │   ├── Cart.tsx
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   └── ProductList.tsx
│   ├── context/          # Context providers
│   │   └── CartContext.tsx
│   ├── data/             # Static data
│   │   └── products.ts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tsconfig.json
└── package.json
```

## TypeScript Types

The project includes comprehensive type definitions:

- `Product` - Product information
- `CartItem` - Cart item with quantity
- `CartContextType` - Cart context interface

## Features in Detail

### Product Catalog
- Filter products by category
- View product details, ratings, and prices
- Smooth animations on product cards

### Shopping Cart
- Add products with visual feedback
- Update quantities with +/- buttons
- Remove individual items
- Clear entire cart
- Real-time total calculation
- Persistent storage

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions

## License

MIT
