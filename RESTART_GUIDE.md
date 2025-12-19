# 🔄 Quick Restart Guide

## ⚠️ Products Not Loading After Changes?

This usually happens when the development server needs to be restarted after making changes.

---

## 🚀 Quick Fix (Windows)

### Step 1: Stop the Current Server
In your terminal where `npm start` is running:
1. Press `Ctrl + C`
2. If asked "Terminate batch job (Y/N)?", type `Y` and press Enter

### Step 2: Clear Cache (Optional but Recommended)
```bash
rmdir /s /q node_modules\.cache
```

### Step 3: Restart the Server
```bash
npm start
```

The browser should automatically open at `http://localhost:3000`

---

## 🔍 If Products Still Don't Load

### Check 1: Browser Console
1. Press `F12` to open DevTools
2. Go to **Console** tab
3. Look for any red error messages
4. Take a screenshot if you see errors

### Check 2: Network Tab
1. Press `F12` to open DevTools
2. Go to **Network** tab
3. Reload the page
4. Look for requests to `supabase.co`
5. Check if they're failing (red) or succeeding (green)

### Check 3: Hard Refresh
1. Press `Ctrl + Shift + R` (hard refresh)
2. Or `Ctrl + F5`
3. This clears browser cache

### Check 4: Incognito Mode
1. Open browser in Incognito/Private mode
2. Go to `http://localhost:3000`
3. Check if products load

---

## 🛠️ Complete Reset (If Nothing Works)

### Option 1: Full Clean Restart
```bash
# Stop the server (Ctrl+C)

# Remove cache
rmdir /s /q node_modules\.cache

# Remove build folder
rmdir /s /q build

# Restart
npm start
```

### Option 2: Nuclear Option (Last Resort)
```bash
# Stop the server (Ctrl+C)

# Remove node_modules (this will take time to reinstall)
rmdir /s /q node_modules

# Reinstall dependencies
npm install

# Start server
npm start
```

---

## 📊 What to Check in Console

### Good Signs ✅
```
Compiled successfully!
webpack compiled successfully
```

### Bad Signs ❌
```
Failed to compile
Module not found
Cannot find module
Syntax error
```

### Supabase Connection ✅
```
No errors about Supabase
Products array has data
```

### Supabase Connection ❌
```
Error loading products
Failed to fetch
Network error
CORS error
```

---

## 🎯 Common Issues & Solutions

### Issue 1: "Loading products..." Never Stops

**Solution:**
1. Check browser console for errors
2. Verify `.env` file has Supabase credentials
3. Check internet connection
4. Restart dev server

### Issue 2: Blank Page

**Solution:**
1. Hard refresh (`Ctrl + Shift + R`)
2. Check console for JavaScript errors
3. Restart dev server

### Issue 3: Old Version Showing

**Solution:**
1. Hard refresh (`Ctrl + Shift + R`)
2. Clear browser cache
3. Try incognito mode

### Issue 4: Spinner Shows Forever

**Solution:**
1. Open console - look for Supabase errors
2. Check `.env` file exists
3. Verify Supabase project is active
4. Check network tab for failed requests

---

## 🔧 Quick Commands Reference

### Start Development Server
```bash
npm start
```

### Build for Production
```bash
npm run build
```

### Clear Cache
```bash
rmdir /s /q node_modules\.cache
```

### Full Clean
```bash
rmdir /s /q node_modules\.cache build
npm start
```

---

## 📱 Testing After Restart

### Checklist
- [ ] Server starts without errors
- [ ] Browser opens automatically
- [ ] Home page loads
- [ ] Hero section appears
- [ ] Spinner shows briefly
- [ ] Products appear in slider
- [ ] No console errors
- [ ] Products page works
- [ ] Product detail page works

---

## 🆘 Still Not Working?

### Debug Steps
1. **Check Console**: Press F12, look for errors
2. **Check Network**: F12 → Network tab, look for failed requests
3. **Check .env**: Verify Supabase credentials exist
4. **Check Supabase**: Login to Supabase dashboard, verify project is active
5. **Check Database**: Verify products table has data

### Get Specific Error
1. Open browser console (F12)
2. Copy the exact error message
3. This will help diagnose the issue

---

## 💡 Pro Tips

### Tip 1: Keep Console Open
Always keep DevTools console open while developing to catch errors immediately.

### Tip 2: Use Incognito for Testing
Test in incognito mode to avoid cache issues.

### Tip 3: Check Network First
If data isn't loading, check Network tab before anything else.

### Tip 4: Restart Often
After making changes to:
- `.env` file
- `package.json`
- Configuration files
Always restart the dev server.

---

## ✅ Expected Behavior

### Home Page
1. Hero section loads immediately
2. Spinner shows for 1-3 seconds
3. Products appear in slider
4. Slider arrows work
5. All sections visible

### Products Page
1. Page header loads immediately
2. Spinner shows for 1-3 seconds
3. Products grid appears
4. All products visible
5. "View Details" buttons work

---

**Last Updated**: December 20, 2024
**Status**: Ready to use
