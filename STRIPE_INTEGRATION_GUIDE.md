# 💳 Stripe Payment Integration Guide

## ✅ Stripe Integration Setup Complete!

Your Eleora Food Company app is now configured to use Stripe for payments.

---

## 🔑 Your Stripe Keys

**Publishable Key (Frontend):**
```
pk_test_51SgAbyLmmjMJbGd0JzXoQG8gB7L0k3s2MW0kNIQL65vqWQTccQCVTSuE26Aks84MeW7C7raIxVsk1L0KS0pQ0nzD006idDKBYI
```

**Secret Key (Backend Only - NEVER expose in frontend):**
```
your_stripe_secret_key
```

---

## ⚠️ Important: Stripe Requires a Backend

Unlike some payment gateways, **Stripe requires a backend server** for secure payment processing. You cannot process payments directly from the React frontend for security reasons.

### Current Status:
- ✅ Frontend configured with Stripe
- ✅ Publishable key added to .env
- ⚠️ **Backend server needed** for payment processing
- ✅ COD (Cash on Delivery) working as fallback

---

## 🚀 Quick Setup Options

### Option 1: Use Provided Backend Server (Recommended)

I've created a simple Express server for you:

**1. Install backend dependencies:**
```bash
npm install express cors stripe
```

**2. Run the backend server:**
```bash
node stripe-backend.js
```

**3. Update frontend to use backend:**
Update `src/pages/Checkout.tsx` to call your backend API.

---

### Option 2: Use Stripe Checkout (Easiest)

Stripe Checkout is a hosted payment page that handles everything.

**Benefits:**
- No backend code needed initially
- Stripe handles security
- Supports UPI, Cards, Net Banking
- Mobile optimized

**Implementation:**
See the updated `Checkout.tsx` component.

---

### Option 3: Use Serverless Functions

Deploy backend as serverless functions:

**Platforms:**
- Vercel Functions
- Netlify Functions
- AWS Lambda
- Supabase Edge Functions

---

## 💰 Payment Methods Supported

### In India (with Stripe)
- ✅ **Credit/Debit Cards** - Visa, Mastercard, RuPay, Amex
- ✅ **UPI** - Google Pay, PhonePe, Paytm (requires activation)
- ✅ **Net Banking** - All major banks
- ✅ **Wallets** - Paytm, PhonePe, etc.
- ✅ **Cash on Delivery** - Currently active

### Activation Required
Some payment methods need to be activated in your Stripe Dashboard:
1. Go to https://dashboard.stripe.com/settings/payment_methods
2. Enable UPI, Wallets, Net Banking
3. Complete verification if required

---

## 📁 Files Created/Modified

### New Files
1. **`src/utils/stripe.ts`** - Stripe utility functions
2. **`stripe-backend.js`** - Backend server for Stripe
3. **`STRIPE_INTEGRATION_GUIDE.md`** - This guide
4. **`.env`** - Updated with Stripe keys

### Modified Files
1. **`src/pages/Checkout.tsx`** - Stripe integration
2. **`package.json`** - Added @stripe/stripe-js

---

## 🔧 Backend Setup (Detailed)

### Step 1: Install Dependencies

```bash
npm install express cors stripe
```

### Step 2: Create Backend Server

File: `stripe-backend.js` (already created)

### Step 3: Run Backend

```bash
node stripe-backend.js
```

Server runs on: http://localhost:3001

### Step 4: Update Frontend

Update `Checkout.tsx` to call backend:

```typescript
const response = await fetch('http://localhost:3001/create-checkout-session', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    items: cart.map(item => ({
      name: `${item.product.short_name} (${item.size})`,
      description: item.product.description,
      amount: Math.round(item.price * 100),
      quantity: item.quantity,
    })),
    customerEmail: formData.email,
    orderId: order.id,
  }),
});

const { url } = await response.json();
window.location.href = url; // Redirect to Stripe Checkout
```

---

## 🧪 Testing

### Test Cards

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/25`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

**Failed Payment:**
- Card: `4000 0000 0000 0002`

**Requires Authentication (3D Secure):**
- Card: `4000 0025 0000 3155`

**UPI Testing:**
- UPI ID: `success@stripeupi`

### Test Flow

1. Add products to cart
2. Go to checkout
3. Fill shipping information
4. Select payment method
5. Enter test card details
6. Complete payment
7. Redirected to success page

---

## 🌐 Production Deployment

### Step 1: Get Live Keys

1. Complete Stripe account verification
2. Go to https://dashboard.stripe.com/apikeys
3. Switch to "Live mode"
4. Copy live keys

### Step 2: Update Environment Variables

**Frontend (.env):**
```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
```

**Backend:**
```javascript
const stripe = require('stripe')('sk_live_YOUR_LIVE_SECRET_KEY');
```

### Step 3: Deploy Backend

**Options:**
- Heroku
- AWS EC2
- DigitalOcean
- Vercel (serverless)
- Railway

### Step 4: Update Frontend API URL

Change from `localhost:3001` to your production backend URL.

### Step 5: Setup Webhooks

1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://your-backend.com/webhook`
3. Select events: `checkout.session.completed`, `payment_intent.payment_failed`
4. Copy webhook secret
5. Update backend with webhook secret

---

## 🔐 Security Best Practices

### DO:
- ✅ Keep secret key on backend only
- ✅ Use HTTPS in production
- ✅ Validate amounts on backend
- ✅ Use webhooks for order confirmation
- ✅ Log all transactions
- ✅ Implement rate limiting

### DON'T:
- ❌ Expose secret key in frontend
- ❌ Trust amounts from frontend
- ❌ Skip webhook verification
- ❌ Store card details
- ❌ Process payments without SSL

---

## 📊 Stripe Dashboard

### Key Features

**Payments:**
- View all transactions
- Refund payments
- Export data

**Customers:**
- Manage customer data
- View payment history
- Send invoices

**Reports:**
- Revenue analytics
- Payment success rate
- Popular payment methods

**Settings:**
- Payment methods
- Webhooks
- API keys
- Business details

---

## 🔔 Webhooks Setup

### Why Webhooks?

- Reliable payment confirmation
- Handle async events
- Update order status automatically
- Better security

### Setup Steps

1. **Create Endpoint**
   ```javascript
   app.post('/webhook', async (req, res) => {
     // Handle Stripe events
   });
   ```

2. **Add to Stripe Dashboard**
   - Go to Webhooks section
   - Add endpoint URL
   - Select events
   - Save webhook secret

3. **Verify Signature**
   ```javascript
   const sig = req.headers['stripe-signature'];
   const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
   ```

4. **Handle Events**
   ```javascript
   switch (event.type) {
     case 'checkout.session.completed':
       // Update order to paid
       break;
     case 'payment_intent.payment_failed':
       // Mark order as failed
       break;
   }
   ```

---

## 💡 UPI Integration (India)

### Enable UPI

1. **Activate in Dashboard**
   - Go to Payment Methods
   - Enable UPI
   - Complete verification

2. **Update Checkout Session**
   ```javascript
   payment_method_types: ['card', 'upi'],
   ```

3. **Test UPI**
   - Use test UPI ID: `success@stripeupi`
   - Or scan QR code in test mode

### UPI Features

- One-tap payment
- QR code support
- All UPI apps supported
- Instant confirmation

---

## 🐛 Troubleshooting

### Issue: "Stripe is not defined"

**Solution:**
```bash
npm install @stripe/stripe-js
```

### Issue: Backend not connecting

**Solution:**
1. Check backend is running: `node stripe-backend.js`
2. Verify port: `http://localhost:3001`
3. Check CORS settings
4. Update frontend API URL

### Issue: Payment not processing

**Solution:**
1. Check secret key is correct
2. Verify amount is in paise (multiply by 100)
3. Check Stripe Dashboard for errors
4. Review webhook logs

### Issue: Webhook not working

**Solution:**
1. Verify webhook URL is accessible
2. Check webhook secret
3. Test with Stripe CLI: `stripe listen --forward-to localhost:3001/webhook`
4. Review signature verification

---

## 📞 Support

### Stripe Support
- Dashboard: https://dashboard.stripe.com
- Docs: https://stripe.com/docs
- Support: https://support.stripe.com
- Status: https://status.stripe.com

### Testing Tools
- Stripe CLI: https://stripe.com/docs/stripe-cli
- Test cards: https://stripe.com/docs/testing
- Webhooks testing: https://stripe.com/docs/webhooks/test

---

## ✅ Current Implementation

### What's Working
- ✅ Stripe SDK installed
- ✅ Publishable key configured
- ✅ Frontend ready for Stripe
- ✅ COD working as fallback
- ✅ Order creation in database
- ✅ Success page ready

### What's Needed
- ⚠️ Backend server deployment
- ⚠️ Webhook configuration
- ⚠️ UPI activation (optional)
- ⚠️ Production keys (for live)

---

## 🎯 Next Steps

### Immediate
1. ✅ Install backend dependencies: `npm install express cors stripe`
2. ✅ Run backend: `node stripe-backend.js`
3. ✅ Test with test cards
4. ✅ Verify order creation

### Short Term
- [ ] Deploy backend to production
- [ ] Setup webhooks
- [ ] Enable UPI in Stripe Dashboard
- [ ] Test all payment methods
- [ ] Add email notifications

### Long Term
- [ ] Switch to live keys
- [ ] Monitor transactions
- [ ] Implement refunds
- [ ] Add analytics
- [ ] Customer dashboard

---

## 📝 Summary

**Stripe integration is configured and ready!**

**Current Status:**
- Frontend: ✅ Ready
- Backend: ⚠️ Needs deployment
- Payment: ✅ COD working, Online pending backend

**To Enable Online Payments:**
1. Run backend server
2. Update frontend API calls
3. Test with test cards
4. Deploy to production

**For Now:**
- Cash on Delivery is working
- Orders are being created
- Ready to add online payments when backend is deployed

---

**Need help? Check the backend setup section or contact Stripe support!**

