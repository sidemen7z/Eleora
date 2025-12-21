# 🖼️ IMAGE UPDATE INSTRUCTIONS

## ⚠️ ISSUE
You ran the SQL script but "no changes happened" - images still showing old ones.

## 🔍 WHY THIS HAPPENS
1. **Product names don't match** - SQL uses `WHERE name = 'Product Name'` but actual names might be different
2. **Product IDs are different** - Database might have different IDs than expected (1-8)
3. **Browser cache** - Old images cached in browser
4. **Netlify cache** - Old images cached on CDN

## ✅ SOLUTION (3 STEPS)

### STEP 1: Diagnose Your Database
1. Go to Supabase Dashboard → SQL Editor
2. Open and run: `diagnose-products.sql`
3. This shows your actual product IDs and names
4. **Write down the IDs** - you'll need them for Step 2

### STEP 2: Update Images (Choose ONE method)

#### METHOD A: Use Robust Script (RECOMMENDED)
- Run: `update-images-robust.sql`
- This uses flexible name matching (ILIKE)
- Works even if product names have slight differences

#### METHOD B: Use ID-Based Script
- If Method A doesn't work, use: `check-and-update-images.sql`
- But first, edit the script to match your actual product IDs from Step 1
- Example: If "Malvani Masala" is ID 5 instead of ID 1, change `WHERE id = 1` to `WHERE id = 5`

### STEP 3: Clear All Caches
After running the SQL:

1. **Clear Browser Cache**
   - Press: `Ctrl + Shift + R` (Windows)
   - Or: `Ctrl + F5`
   - Or: Open DevTools (F12) → Right-click refresh → "Empty Cache and Hard Reload"

2. **Clear Netlify Cache**
   - Go to Netlify Dashboard
   - Click "Deploys" tab
   - Click "Trigger deploy" → "Clear cache and deploy site"

3. **Wait 2-3 minutes** for deployment to complete

4. **Test in Incognito/Private Window**
   - Open new incognito window
   - Visit your site
   - Check if images updated

## 📋 VERIFICATION CHECKLIST

After running SQL, verify in Supabase:
- [ ] Run the SELECT query at the end of the script
- [ ] Check that `image_url` shows new paths (e.g., `/images/malvani masalapng.png`)
- [ ] Check that `size_images` has all 4 sizes with correct paths
- [ ] All 8 products should show updated images

## 🚨 IF STILL NOT WORKING

If images still don't update after all steps:

1. **Check image files exist**
   - Go to: `eleora-react/public/images/`
   - Verify all 28 image files are there
   - Check exact filenames (case-sensitive, spaces, etc.)

2. **Check Netlify deployment**
   - Go to Netlify → Deploys → Latest deploy
   - Click "Deploy log"
   - Verify no errors
   - Check that images folder was included in build

3. **Manual verification**
   - Try accessing image directly: `https://your-site.netlify.app/images/malvani masalapng.png`
   - If 404 error, images weren't deployed
   - If image loads, it's a database issue

## 📝 QUICK REFERENCE

**Image Distribution Rule:**
- 50g & 100g → Silver images
- 200g & 500g → Gold images

**All 8 Products:**
1. Malvani Masala → `malvani masalapng.png` / `goldmalvanimasala.png`
2. Everyday Masala → `everydaymasala.png` / `goldtheeverydaymasala.png`
3. Goda Masala → `goda-masala.png` / `GoldGodamasala.png`
4. Biryani Masala → `biryanimasala.png` / `goldbirynanimasala.png`
5. Chicken/Mutton Masala → `mutton masala.png` / `goldmuttonmasala.png`
6. Peanut Chutney → `peanut chutney.png` / `goldpeanutchutney (2).png`
7. Flaxseed Chutney → `flaxseedschutney.png` / `goldflaxseedschutney.png`
8. Coconut Garlic Chutney → `coconutgarlic.png` / `goldgarlicchutney.png`
