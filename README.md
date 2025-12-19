# Eleora Food Company - React + Supabase

A modern e-commerce platform for authentic Maharashtrian masalas and chutneys, built with React and Supabase.

## Features

- 🛍️ Product catalog with detailed views
- 🛒 Shopping cart functionality
- 👤 User authentication with Supabase
- 💳 Checkout process
- 📱 Fully responsive design
- 🎨 Same elegant dark theme as original
- ⚡ Fast and modern React architecture

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Supabase (PostgreSQL database, Authentication, Real-time)
- **Routing**: React Router v6
- **Styling**: CSS3 with CSS Variables
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account and project

### Installation

1. Clone the repository
```bash
cd eleora-react
```

2. Install dependencies
```bash
npm install
```

3. Update Supabase credentials in `src/config/supabase.ts`

4. Start the development server
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/       # Reusable components (Header, Footer, ProductCard)
├── pages/           # Page components (Home, Products, Cart, etc.)
├── context/         # React Context providers (Auth, Cart)
├── config/          # Configuration files (Supabase)
├── types/           # TypeScript type definitions
├── App.tsx          # Main app component with routing
└── index.tsx        # App entry point
```

## Database Schema

The app uses the same Supabase schema as the original project:
- `products` - Product catalog
- `user_profiles` - User information
- `orders` - Order records
- `order_items` - Order line items
- `contact_messages` - Contact form submissions

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `build/` folder to Netlify

## Features Comparison

All features from the original HTML/CSS/JS version have been converted:

✅ Product listing and details
✅ Shopping cart with local storage
✅ User authentication
✅ Checkout process
✅ Contact form
✅ About page
✅ Responsive design
✅ Same visual theme and styling
✅ WhatsApp integration
✅ Supabase integration

## License

MIT License - feel free to use this project for your own purposes.

## Support

For support, email info@eleorafood.com or message us on WhatsApp at +91 98765 43210.
