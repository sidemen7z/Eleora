# 🚀 Deploy to Netlify - Complete Guide

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ GitHub account (to push your code)
- ✅ Netlify account (free - sign up at netlify.com)
- ✅ Your app builds successfully (`npm run build`)

---

## 🎯 Method 1: Deploy via Netlify Dashboard (Easiest)

### Step 1: Push Code to GitHub

1. **Initialize Git** (if not already done):
```bash
cd eleora-react
git init
```

2. **Add all files**:
```bash
git add .
```

3. **Commit**:
```bash
git commit -m "Ready for deployment"
```

4. **Create GitHub Repository**:
   - Go to https://github.com
   - Click "New repository"
   - Name it: `eleora-food-company`
   - Don't initialize with README
   - Click "Create repository"

5. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/eleora-food-company.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Netlify

1. **Go to Netlify**:
   - Visit https://app.netlify.com
   - Click "Sign up" (use GitHub to sign in)

2. **Import Project**:
   - Click "Add new site" → "Import an existing project"
   - Click "Deploy with GitHub"
   - Authorize Netlify to access GitHub
   - Select your repository: `eleora-food-company`

3. **Configure Build Settings**:
   ```
   Base directory: eleora-react
   Build command: npm run build
   Publish directory: eleora-react/build
   ```

4. **Add Environment Variables**:
   - Click "Show advanced"
   - Click "New variable"
   - Add these:
   ```
   REACT_APP_SUPABASE_URL = https://edypwfdbxbsxfgpmwyio.supabase.co
   REACT_APP_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkeXB3ZmRieGJzeGZncG13eWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxMzE3MDksImV4cCI6MjA4MTcwNzcwOX0.jdCdHtfucvVn3NIOo_cyuEZhZVwu6Kb7N1h-FIlcwXc
   REACT_APP_STRIPE_PUBLISHABLE_KEY = pk_test_51SgAbyLmmjMJbGd0JzXoQG8gB7L0k3s2MW0kNIQL65vqWQTccQCVTSuE26Aks84MeW7C7raIxVsk1L0KS0pQ0nzD006idDKBYI
   ```

5. **Deploy**:
   - Click "Deploy site"
   - Wait 2-3 minutes for build to complete
   - Your site will be live! 🎉

---

## 🎯 Method 2: Deploy via Netlify CLI (Advanced)

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify

```bash
netlify login
```

This will open a browser window to authorize.

### Step 3: Initialize Netlify

```bash
cd eleora-react
netlify init
```

Follow the prompts:
- Create & configure a new site
- Choose your team
- Site name: `eleora-food-company` (or your choice)
- Build command: `npm run build`
- Publish directory: `build`

### Step 4: Deploy

```bash
netlify deploy --prod
```

---

## 📁 Required Files for Netlify

### 1. Create `netlify.toml` (Recommended)

Create this file in `eleora-react` folder:

```toml
[build]
  base = "."
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### 2. Create `_redirects` file

Create `eleora-react/public/_redirects`:

```
/*    /index.html   200
```

This ensures React Router works properly.

---

## 🔧 Build Configuration

### Update `package.json`

Make sure your `package.json` has:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### Test Build Locally

Before deploying, test the build:

```bash
npm run build
npm install -g serve
serve -s build
```

Visit `http://localhost:3000` to test the production build.

---

## 🌐 Custom Domain (Optional)

### Add Custom Domain

1. Go to Netlify Dashboard
2. Click your site
3. Go to "Domain settings"
4. Click "Add custom domain"
5. Enter your domain (e.g., `eleorafood.com`)
6. Follow DNS configuration instructions

### Free Netlify Domain

Your site gets a free domain like:
```
https://eleora-food-company.netlify.app
```

You can change the subdomain in settings.

---

## 🔐 Environment Variables on Netlify

### Add via Dashboard

1. Go to Site settings
2. Click "Environment variables"
3. Click "Add a variable"
4. Add each variable:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
   - `REACT_APP_STRIPE_PUBLISHABLE_KEY`

### Add via CLI

```bash
netlify env:set REACT_APP_SUPABASE_URL "https://edypwfdbxbsxfgpmwyio.supabase.co"
netlify env:set REACT_APP_SUPABASE_ANON_KEY "your-key-here"
netlify env:set REACT_APP_STRIPE_PUBLISHABLE_KEY "your-key-here"
```

---

## 🚨 Important Notes

### 1. Don't Commit `.env` File

Make sure `.env` is in `.gitignore`:

```
# .gitignore
.env
.env.local
.env.production
```

### 2. Stripe Backend

The Stripe backend (`stripe-backend.js`) needs separate hosting:
- Deploy to Heroku, Railway, or Render
- Update the backend URL in `Checkout.tsx`

### 3. Images

Make sure all images are in `public/images/` folder.

### 4. Supabase CORS

Ensure Supabase allows your Netlify domain:
- Go to Supabase Dashboard
- Project Settings → API
- Add your Netlify URL to allowed origins

---

## 🔄 Continuous Deployment

### Auto-Deploy on Git Push

Once connected to GitHub, Netlify automatically:
1. Detects new commits
2. Builds your app
3. Deploys updates
4. Takes 2-3 minutes

### Manual Deploy

```bash
netlify deploy --prod
```

---

## 📊 Deployment Checklist

Before deploying:

- [ ] App builds successfully (`npm run build`)
- [ ] All environment variables added
- [ ] `.env` file in `.gitignore`
- [ ] `_redirects` file created
- [ ] `netlify.toml` configured
- [ ] Images in `public/images/`
- [ ] Supabase credentials correct
- [ ] Code pushed to GitHub
- [ ] Netlify account created

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Command failed"**
- Check build logs in Netlify
- Ensure `package.json` has correct scripts
- Verify Node version (use 18)

**Error: "Module not found"**
- Run `npm install` locally
- Commit `package-lock.json`
- Push to GitHub

### Site Shows Blank Page

**Check:**
1. Browser console for errors
2. Environment variables are set
3. Supabase URL is correct
4. `_redirects` file exists

### React Router Not Working

**Fix:**
- Add `_redirects` file to `public/`
- Content: `/*    /index.html   200`

### Images Not Loading

**Fix:**
- Move images to `public/images/`
- Use `/images/filename.jpg` in code
- Not `./images/` or `../images/`

---

## 🎉 Success!

Once deployed, your site will be live at:
```
https://your-site-name.netlify.app
```

### Share Your Site:
- Copy the URL
- Share with customers
- Add to social media
- Update business cards

---

## 📈 Next Steps

### 1. Monitor Performance
- Check Netlify Analytics
- Monitor Supabase usage
- Track user activity

### 2. Set Up Stripe Backend
- Deploy backend separately
- Update checkout URL
- Test payments

### 3. Add Custom Domain
- Purchase domain
- Configure DNS
- Enable HTTPS (automatic)

### 4. Optimize
- Enable Netlify CDN
- Add caching headers
- Compress images

---

## 💡 Pro Tips

### Tip 1: Preview Deploys
Every branch gets a preview URL for testing.

### Tip 2: Rollback
Can rollback to previous deploy in one click.

### Tip 3: Split Testing
Test different versions with Netlify Split Testing.

### Tip 4: Forms
Use Netlify Forms for contact form (no backend needed).

---

## 🆘 Need Help?

### Resources:
- Netlify Docs: https://docs.netlify.com
- Netlify Support: https://answers.netlify.com
- React Deployment: https://create-react-app.dev/docs/deployment

### Common Issues:
- Build fails → Check Node version
- Blank page → Check environment variables
- 404 errors → Add `_redirects` file

---

**Ready to deploy? Follow Method 1 for the easiest deployment! 🚀**

**Estimated Time: 10-15 minutes**
