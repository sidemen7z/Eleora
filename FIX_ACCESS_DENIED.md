# 🔧 Fix "Access Denied" Error

## Problem
You're seeing "Access denied. Admin privileges required." when trying to login to admin panel.

## Solution
You need to create an admin user. Follow these exact steps:

---

## 📋 Step-by-Step Fix

### Step 1: Go to Supabase Dashboard
1. Open: https://supabase.com
2. Click **Sign in**
3. Login with your Supabase account
4. Select your project (the one with URL: `edypwfdbxbsxfgpmwyio`)

### Step 2: Create a User
1. In left sidebar, click **Authentication** (🔐 icon)
2. Click **Users** tab at the top
3. Click green **Add user** button (top right)
4. Fill in the form:
   - **Email**: `admin@eleorafood.com`
   - **Password**: `Admin@123456`
   - **✅ IMPORTANT**: Check the box "Auto Confirm User"
5. Click **Create user** button

✅ User created!

### Step 3: Make User an Admin
1. In left sidebar, click **SQL Editor** (📝 icon)
2. Click **+ New query** button
3. Copy and paste this SQL:

```sql
-- Make the user an admin
UPDATE user_profiles 
SET is_admin = true 
WHERE email = 'admin@eleorafood.com';

-- Check if it worked
SELECT id, email, full_name, is_admin 
FROM user_profiles 
WHERE email = 'admin@eleorafood.com';
```

4. Click **Run** button (or press Ctrl+Enter)
5. Look at the results below - you should see:
   - `email`: admin@eleorafood.com
   - `is_admin`: true ✅

✅ User is now admin!

### Step 4: Login to Admin Panel
1. Go back to your React app
2. Navigate to: `http://localhost:3000/admin/login`
3. Enter:
   - **Email**: `admin@eleorafood.com`
   - **Password**: `Admin@123456`
4. Click **Login**

✅ You should now be in the admin dashboard!

---

## 🎯 What If It Still Doesn't Work?

### Issue 1: SQL Returns No Results

**This means the user_profiles entry wasn't created automatically.**

**Fix:**
1. First, get the user ID from auth:
```sql
SELECT id, email FROM auth.users WHERE email = 'admin@eleorafood.com';
```

2. Copy the `id` value (it looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

3. Create the profile manually:
```sql
-- Replace 'USER_ID_HERE' with the actual ID from step 1
INSERT INTO user_profiles (id, email, full_name, is_admin)
VALUES (
  'USER_ID_HERE',
  'admin@eleorafood.com',
  'Admin User',
  true
);
```

4. Try logging in again

### Issue 2: "Invalid credentials"

**This means email or password is wrong.**

**Fix:**
1. Go to Supabase → Authentication → Users
2. Find your user
3. Click the "..." menu next to the user
4. Click "Reset password"
5. Set new password: `Admin@123456`
6. Try logging in again

### Issue 3: User Not Confirmed

**Fix:**
1. Go to Supabase → Authentication → Users
2. Find your user
3. If it says "Unconfirmed", click the "..." menu
4. Click "Confirm email"
5. Try logging in again

---

## 🔍 Verify Everything is Set Up

Run these SQL queries to check:

### Check 1: User Exists in Auth
```sql
SELECT id, email, confirmed_at 
FROM auth.users 
WHERE email = 'admin@eleorafood.com';
```
**Expected**: Should return 1 row with your email

### Check 2: User Profile Exists
```sql
SELECT id, email, full_name, is_admin 
FROM user_profiles 
WHERE email = 'admin@eleorafood.com';
```
**Expected**: Should return 1 row with `is_admin = true`

### Check 3: User is Admin
```sql
SELECT * FROM user_profiles WHERE is_admin = true;
```
**Expected**: Should show your admin user

---

## 📝 Quick Reference

### Admin Credentials
```
Email: admin@eleorafood.com
Password: Admin@123456
```

### Admin Login URL
```
http://localhost:3000/admin/login
```

### SQL to Make Admin
```sql
UPDATE user_profiles 
SET is_admin = true 
WHERE email = 'admin@eleorafood.com';
```

---

## 🎥 Visual Guide

### Where to Find Things in Supabase:

**Authentication Section:**
```
Supabase Dashboard
└── 🔐 Authentication (left sidebar)
    └── Users (top tab)
        └── Add user (green button, top right)
```

**SQL Editor:**
```
Supabase Dashboard
└── 📝 SQL Editor (left sidebar)
    └── + New query (button)
        └── Paste SQL → Run
```

---

## ✅ Success Checklist

Complete these in order:

- [ ] Logged into Supabase dashboard
- [ ] Found my project
- [ ] Clicked Authentication → Users
- [ ] Clicked "Add user"
- [ ] Entered email: admin@eleorafood.com
- [ ] Entered password: Admin@123456
- [ ] ✅ Checked "Auto Confirm User"
- [ ] Clicked "Create user"
- [ ] Clicked SQL Editor
- [ ] Clicked "New query"
- [ ] Pasted SQL to make admin
- [ ] Clicked "Run"
- [ ] Saw result with is_admin = true
- [ ] Went to http://localhost:3000/admin/login
- [ ] Entered credentials
- [ ] Successfully logged in!

---

## 🆘 Still Having Issues?

### Get Help:
1. Check browser console (F12) for errors
2. Check Supabase logs
3. Verify database schema is correct
4. Make sure RLS policies allow the query

### Common Mistakes:
- ❌ Forgot to check "Auto Confirm User"
- ❌ Typo in email address
- ❌ Didn't run the SQL to set is_admin
- ❌ User profile wasn't created by trigger

---

**Follow these steps exactly and you'll be able to login! 🚀**
