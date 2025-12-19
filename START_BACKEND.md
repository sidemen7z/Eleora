# 🚀 Start Stripe Backend Server

## Quick Start

### Step 1: Install Dependencies (One Time Only)

Open a **new terminal** and run:

```bash
npm install express cors stripe
```

### Step 2: Start Backend Server

In the **same terminal**, run:

```bash
node stripe-backend.js
```

You should see:
```
Stripe backend server running on port 3001
Create checkout session: POST http://localhost:3001/create-checkout-session
```

### Step 3: Keep It Running

**Important:** Keep this terminal window open while testing payments!

### Step 4: Test Payment

1. Go to your React app: http://localhost:3000
2. Add products to cart
3. Go to checkout
4. Select "Online Payment (Stripe)"
5. Fill form and click "Proceed to Payment"
6. You'll be redirected to Stripe Checkout
7. Use test card: `4242 4242 4242 4242`
8. Complete payment

---

## 🧪 Test Cards

**Success:**
- Card: `4242 4242 4242 4242`
- Expiry: `12/25`
- CVC: `123`

**Decline:**
- Card: `4000 0000 0000 0002`

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'express'"

**Solution:**
```bash
npm install express cors stripe
```

### Error: "Port 3001 already in use"

**Solution:**
1. Stop other processes using port 3001
2. Or change port in `stripe-backend.js`

### Error: "Backend server not running"

**Solution:**
1. Make sure you ran `node stripe-backend.js`
2. Check terminal for errors
3. Verify it says "running on port 3001"

---

## ✅ What You Need Running

**Terminal 1:** React app
```bash
cd eleora-react
npm start
```

**Terminal 2:** Stripe backend
```bash
node stripe-backend.js
```

Both must be running for online payments to work!

---

## 💡 For Production

Deploy the backend to:
- Heroku
- Vercel
- Railway
- AWS
- DigitalOcean

Then update the API URL in `Checkout.tsx` from `localhost:3001` to your production URL.

---

**Ready to test! Start the backend and try a payment!** 🎉
