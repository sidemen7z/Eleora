# 🚀 Quick Reference Guide

## Start Development Server
```bash
cd eleora-react
npm start
```
Opens at: http://localhost:3000

---

## Access Admin Panel
1. Go to: http://localhost:3000/admin/login
2. Login with admin credentials
3. Dashboard: http://localhost:3000/admin

---

## Create Admin User
Run in Supabase SQL Editor:
```sql
UPDATE user_profiles 
SET is_admin = true 
WHERE email = 'your-email@example.com';
```

---

## Environment Variables
File: `eleora-react/.env`
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
```

---

## Build for Production
```bash
cd eleora-react
npm run build
```

---

## Project Structure
```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
│   └── admin/       # Admin panel pages
├── context/         # React Context (Auth, Cart)
├── config/          # Supabase config
├── types/           # TypeScript interfaces
├── utils/           # Helper functions
└── styles/          # CSS files
```

---

## Key Routes

### Public
- `/` - Home
- `/products` - Products
- `/product/:id` - Product Detail
- `/cart` - Cart
- `/checkout` - Checkout
- `/about` - About
- `/contact` - Contact

### Admin
- `/admin/login` - Login
- `/admin` - Dashboard
- `/admin/products` - Products Management
- `/admin/orders` - Orders Management
- `/admin/contacts` - Messages

---

## Price Structure (JSONB)
```typescript
prices: {
  '50g': 60,
  '100g': 105,
  '200g': 200,
  '500g': 475
}
```

Access: `product.prices['50g']`

---

## Utility Functions
```typescript
import { formatPrice, formatCurrency } from './utils/formatters';

formatPrice(100)      // "100"
formatCurrency(100)   // "₹100"
```

---

## Common Commands
```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## Status: ✅ READY TO USE
