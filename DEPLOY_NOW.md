# 🚀 Deploy to Netlify - Quick Start

## ⚡ 5-Minute Deployment

### Step 1: Go to Netlify (2 min)

1. Visit: https://app.netlify.com
2. Click "Sign up" (use GitHub)
3. Authorize Netlify

### Step 2: Drag & Drop Deploy (3 min)

**Option A: Drag & Drop (Easiest - No Git Required)**

1. Build your app:
   ```bash
   cd eleora-react
   npm run build
   ```

2. Go to: https://app.netlify.com/drop
3. Drag the `build` folder onto the page
4. Wait 30 seconds
5. Your site is live! 🎉

**Option B: Connect GitHub**

1. Click "Add new site" → "Import an existing project"
2. Click "Deploy with GitHub"
3. Select your repository
4. Configure:
   - Base directory: `eleora-react`
   - Build command: `npm run build`
   - Publish directory: `eleora-react/build`
5. Add environment variables (see below)
6. Click "Deploy site"

### Step 3: Add Environment Variables

After deployment, add these:

1. Go to Site settings → Environment variables
2. Add:
   ```
   REACT_APP_SUPABASE_URL
   Value: https://edypwfdbxbsxfgpmwyio.supabase.co

   REACT_APP_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkeXB3ZmRieGJzeGZncG13eWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxMzE3MDksImV4cCI6MjA4MTcwNzcwOX0.jdCdHtfucvVn3NIOo_cyuEZhZVwu6Kb7N1h-FIlcwXc

   REACT_APP_STRIPE_PUBLISHABLE_KEY
   Value: pk_test_51SgAbyLmmjMJbGd0JzXoQG8gB7L0k3s2MW0kNIQL65vqWQTccQCVTSuE26Aks84MeW7C7raIxVsk1L0KS0pQ0nzD006idDKBYI
   ```

3. Click "Redeploy" to apply changes

---

## ✅ That's It!

Your site is now live at:
```
https://your-site-name.netlify.app
```

You can change the site name in settings!

---

## 📝 Files Already Created

✅ `netlify.toml` - Build configuration
✅ `public/_redirects` - React Router support
✅ `.gitignore` - Protects sensitive files

---

## 🎯 Next Steps

1. **Test your site** - Visit the Netlify URL
2. **Add custom domain** (optional)
3. **Deploy Stripe backend** separately
4. **Share your site!**

---

**Need detailed instructions? See `NETLIFY_DEPLOYMENT.md`**
