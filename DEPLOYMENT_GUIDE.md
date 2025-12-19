# 🚀 Deployment Guide - Eleora React App

## Pre-Deployment Checklist

✅ All features tested and working
✅ Production build successful (124KB gzipped)
✅ Supabase integration ready
✅ Images copied to public folder
✅ All bugs fixed

## Quick Deploy Options

### Option 1: Vercel (Recommended) ⭐

**Why Vercel?**
- Zero configuration
- Automatic HTTPS
- Global CDN
- Free tier available
- Perfect for React apps

**Steps:**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd eleora-react
vercel
```

3. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? **Your account**
   - Link to existing project? **N**
   - Project name? **eleora-food-company**
   - Directory? **./build** (or leave default)
   - Override settings? **N**

4. Done! Your app is live at the provided URL.

**For Production:**
```bash
vercel --prod
```

### Option 2: Netlify

**Steps:**

1. Build the app:
```bash
npm run build
```

2. Deploy via Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy
```

3. Or drag & drop:
   - Go to https://app.netlify.com/drop
   - Drag the `build/` folder
   - Done!

**For Production:**
```bash
netlify deploy --prod
```

### Option 3: GitHub Pages

**Steps:**

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/eleora-food-company",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

### Option 4: Traditional Hosting (cPanel, etc.)

**Steps:**

1. Build the app:
```bash
npm run build
```

2. Upload contents of `build/` folder to your web server

3. Configure server:
   - Point domain to the uploaded folder
   - Set up URL rewriting (see below)

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Environment Variables

### For Development
Create `.env` file:
```
REACT_APP_SUPABASE_URL=https://edypwfdbxbsxfgpmwyio.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_key_here
```

### For Production

**Vercel:**
```bash
vercel env add REACT_APP_SUPABASE_URL
vercel env add REACT_APP_SUPABASE_ANON_KEY
```

**Netlify:**
- Go to Site Settings → Environment Variables
- Add variables

**GitHub Pages:**
- Use GitHub Secrets
- Add to workflow file

## Post-Deployment Steps

### 1. Update Supabase Settings

In Supabase Dashboard:
- Go to Authentication → URL Configuration
- Add your production URL to allowed URLs
- Update redirect URLs

### 2. Test Production Site

Check these features:
- [ ] Homepage loads
- [ ] Products display
- [ ] Product details work
- [ ] Cart functionality
- [ ] Checkout process
- [ ] Contact form
- [ ] Authentication
- [ ] All images load
- [ ] Mobile responsive

### 3. Set Up Custom Domain (Optional)

**Vercel:**
```bash
vercel domains add yourdomain.com
```

**Netlify:**
- Go to Domain Settings
- Add custom domain
- Follow DNS instructions

### 4. Enable Analytics (Optional)

**Google Analytics:**
Add to `public/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Performance Optimization

### Already Optimized ✅
- Production build minified
- Code splitting enabled
- Images optimized
- CSS minified
- Gzip compression

### Additional Optimizations

1. **Enable CDN** (Vercel/Netlify do this automatically)

2. **Add Service Worker** for PWA:
```bash
# In src/index.tsx
serviceWorkerRegistration.register();
```

3. **Lazy Load Routes**:
```typescript
const Products = lazy(() => import('./pages/Products'));
```

4. **Image Optimization**:
   - Use WebP format
   - Add lazy loading
   - Use responsive images

## Monitoring

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `src/App.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

### Error Tracking

**Sentry:**
```bash
npm install @sentry/react
```

## Troubleshooting

### Issue: 404 on Refresh
**Solution**: Configure URL rewriting (see above)

### Issue: Environment Variables Not Working
**Solution**: 
- Ensure variables start with `REACT_APP_`
- Rebuild after adding variables
- Restart dev server

### Issue: Images Not Loading
**Solution**:
- Check images are in `public/images/`
- Use `/images/filename.jpg` (not `./images/`)
- Verify image paths in Supabase

### Issue: Supabase Connection Failed
**Solution**:
- Check credentials in `src/config/supabase.ts`
- Verify Supabase project is active
- Check allowed URLs in Supabase settings

## Rollback Plan

If something goes wrong:

**Vercel:**
```bash
vercel rollback
```

**Netlify:**
- Go to Deploys
- Click on previous deploy
- Click "Publish deploy"

**Manual:**
- Keep backup of previous build
- Re-upload if needed

## Maintenance

### Regular Updates
```bash
# Update dependencies
npm update

# Check for security issues
npm audit

# Fix security issues
npm audit fix
```

### Monitoring
- Check error logs regularly
- Monitor performance metrics
- Review user feedback
- Update content as needed

## Support

### Resources
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- React Docs: https://react.dev
- Supabase Docs: https://supabase.com/docs

### Getting Help
- Check documentation files
- Review error logs
- Test in development first
- Contact hosting support

## Success Checklist

Before going live:
- [ ] Production build successful
- [ ] All features tested
- [ ] Supabase configured
- [ ] Environment variables set
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Analytics set up (optional)
- [ ] Error tracking configured (optional)
- [ ] Backup plan ready
- [ ] Team notified

## 🎉 You're Ready to Deploy!

Your Eleora Food Company React app is production-ready and optimized for deployment. Choose your preferred hosting option and follow the steps above.

**Recommended**: Start with Vercel for the easiest deployment experience.

---

**Good luck with your launch!** 🚀
