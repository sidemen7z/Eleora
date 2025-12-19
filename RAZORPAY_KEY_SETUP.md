# 🔑 Razorpay API Key Setup Guide

## ⚠️ Important: Get Your Correct Razorpay Key

The key you provided appears to be incorrect. Follow these steps to get your actual Razorpay Key ID:

---

## 📝 Steps to Get Razorpay Key ID

### 1. Login to Razorpay Dashboard
Go to: https://dashboard.razorpay.com/

### 2. Navigate to API Keys
- Click on **Settings** (gear icon) in the left sidebar
- Click on **API Keys** under "Website and app settings"

### 3. Generate Test Keys (if not already generated)
- You'll see a section for **Test Mode** keys
- If keys are not generated, click **Generate Test Keys**
- You'll get two keys:
  - **Key ID** (starts with `rzp_test_`)
  - **Key Secret** (keep this secret, never expose in frontend)

### 4. Copy the Key ID
- Copy only the **Key ID** (not the secret)
- It should look like: `rzp_test_XXXXXXXXXXXX`
- Example format: `rzp_test_1A2B3C4D5E6F7G8H`

---

## 🔧 Update Your .env File

Open `eleora-react/.env` and update:

```env
REACT_APP_RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_ID_HERE
```

**Example:**
```env
REACT_APP_RAZORPAY_KEY_ID=rzp_test_1A2B3C4D5E6F7G8H9I0J
```

---

## 🔄 Restart Development Server

After updating the .env file:

1. **Stop** the current dev server (Ctrl+C)
2. **Restart** it:
   ```bash
   cd eleora-react
   npm start
   ```

---

## ✅ Verify Key Format

### Correct Format
- Test Mode: `rzp_test_XXXXXXXXXXXX`
- Live Mode: `rzp_live_XXXXXXXXXXXX`

### Incorrect Formats (Don't Use)
- ❌ Stripe keys: `sk_test_...` or `pk_test_...`
- ❌ Key Secret: `XXXXXXXXXXXXXXXX` (without rzp_ prefix)
- ❌ Merchant ID: `mk_...`

---

## 🧪 Test Your Integration

### Test Credentials

Once you have the correct key, test with:

**Test UPI IDs:**
- `success@razorpay` - Successful payment
- `failure@razorpay` - Failed payment

**Test Cards:**
- Card Number: `4111 1111 1111 1111`
- CVV: `123`
- Expiry: Any future date (e.g., `12/25`)
- Name: Any name

**Test Net Banking:**
- Select any bank
- Use credentials provided on test page

---

## 🔍 Troubleshooting

### Error: 401 Unauthorized

**Cause:** Invalid or incorrect API key

**Solution:**
1. Verify key format starts with `rzp_test_`
2. Copy key directly from Razorpay dashboard
3. Ensure no extra spaces in .env file
4. Restart dev server after updating

### Error: Key not found

**Cause:** Environment variable not loaded

**Solution:**
1. Check .env file exists in `eleora-react/` folder
2. Verify variable name: `REACT_APP_RAZORPAY_KEY_ID`
3. Restart development server
4. Clear browser cache

### Razorpay modal not opening

**Cause:** Script not loaded or key invalid

**Solution:**
1. Check browser console for errors
2. Verify Razorpay script in `public/index.html`
3. Ensure key is correct
4. Check internet connection

---

## 📸 Screenshot Guide

### Where to Find API Keys

1. **Dashboard Home**
   ```
   Razorpay Dashboard → Settings (⚙️) → API Keys
   ```

2. **Test Mode Section**
   ```
   ┌─────────────────────────────────────┐
   │ Test Mode                           │
   ├─────────────────────────────────────┤
   │ Key ID:    rzp_test_XXXXXXXXXXXX   │
   │ Key Secret: ••••••••••••••••••••   │
   │                                     │
   │ [Regenerate Test Key]               │
   └─────────────────────────────────────┘
   ```

3. **Copy Key ID**
   - Click the copy icon next to Key ID
   - Paste in your .env file

---

## 🔐 Security Notes

### DO:
- ✅ Use Key ID in frontend (safe to expose)
- ✅ Keep Key Secret on backend only
- ✅ Use test keys for development
- ✅ Switch to live keys for production

### DON'T:
- ❌ Expose Key Secret in frontend code
- ❌ Commit .env file to git
- ❌ Share keys publicly
- ❌ Use live keys for testing

---

## 📞 Need Help?

### Razorpay Support
- Email: support@razorpay.com
- Phone: 1800-123-4567
- Docs: https://razorpay.com/docs/payments/

### Common Issues
- **Can't find API Keys**: Ensure you're logged into the correct account
- **Keys not working**: Verify you're in Test Mode
- **Account not activated**: Complete KYC for live mode

---

## ✅ Quick Checklist

- [ ] Login to Razorpay Dashboard
- [ ] Go to Settings → API Keys
- [ ] Copy Test Mode Key ID (starts with `rzp_test_`)
- [ ] Update `eleora-react/.env` file
- [ ] Restart development server
- [ ] Test payment with test credentials
- [ ] Verify order creation in database

---

## 🎯 Current Status

**Your current key in .env:**
```
REACT_APP_RAZORPAY_KEY_ID=rzp_test_1SgAnsLmmjMJbGd0NdMrMXu9
```

**Action Required:**
Replace this with your actual Razorpay Key ID from the dashboard.

---

## 📝 Example .env File

```env
# Supabase Configuration
REACT_APP_SUPABASE_URL=https://edypwfdbxbsxfgpmwyio.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Razorpay Configuration (Test Mode)
REACT_APP_RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_HERE
```

---

**Next Step:** Get your actual Razorpay Key ID and update the .env file!
