# 🔐 Admin Login Credentials - React App

## 🎯 How to Access Admin Panel

### Step 1: Create Admin Account

You need to create an admin user in Supabase. There are **2 ways** to do this:

---

## Method 1: Create Admin via Supabase Dashboard (Easiest)

### Step 1: Go to Supabase Dashboard
1. Open https://supabase.com
2. Login to your account
3. Select your project: `edypwfdbxbsxfgpmwyio`

### Step 2: Create User in Authentication
1. Click **Authentication** in left sidebar
2. Click **Users** tab
3. Click **Add user** button
4. Fill in:
   - **Email**: `admin@eleorafood.com`
   - **Password**: `Admin@123456`
   - **Auto Confirm User**: ✅ Check this box
5. Click **Create user**

### Step 3: Make User an Admin
1. Click **SQL Editor** in left sidebar
2. Click **New query**
3. Paste this SQL:

```sql
-- Make the user an admin
UPDATE user_profiles 
SET is_admin = true 
WHERE email = 'admin@eleorafood.com';

-- Verify it worked
SELECT id, email, full_name, is_admin 
FROM user_profiles 
WHERE is_admin = true;
```

4. Click **Run** button
5. You should see the admin user in results

### Step 4: Login to Admin Panel
1. Go to: `http://localhost:3000/admin/login`
2. Enter:
   - **Email**: `admin@eleorafood.com`
   - **Password**: `Admin@123456`
3. Click **Login**
4. You're in! 🎉

---

## Method 2: Create Admin via React App (Alternative)

### Step 1: Sign Up Through App
1. Go to: `http://localhost:3000/login`
2. Click **Create an account**
3. Fill in:
   - **Full Name**: `Admin User`
   - **Phone**: `9876543210` (optional)
   - **Email**: `admin@eleorafood.com`
   - **Password**: `Admin@123456`
4. Click **Create Account**
5. Check your email for verification link (if required)

### Step 2: Make User Admin in Supabase
1. Go to Supabase Dashboard
2. Click **SQL Editor**
3. Run this SQL:

```sql
UPDATE user_profiles 
SET is_admin = true 
WHERE email = 'admin@eleorafood.com';
```

### Step 3: Login to Admin Panel
1. Go to: `http://localhost:3000/admin/login`
2. Enter your credentials
3. You're in! 🎉

---

## 📋 Default Admin Credentials

### Recommended Admin Account
```
Email: admin@eleorafood.com
Password: Admin@123456
```

### Alternative Admin Account
```
Email: owner@eleorafood.com
Password: Owner@123456
```

**Note**: You can use any email/password you want. Just make sure to:
1. Create the user in Supabase Auth
2. Set `is_admin = true` in the database

---

## 🔍 Verify Admin Access

### Check if User is Admin
Run this SQL in Supabase:

```sql
SELECT 
  id,
  email,
  full_name,
  is_admin,
  created_at
FROM user_profiles
WHERE email = 'admin@eleorafood.com';
```

**Expected Result:**
- `is_admin` should be `true`

### Check User in Auth
1. Go to **Authentication** → **Users**
2. Find your admin email
3. Should show as confirmed

---

## 🚀 Admin Panel Access

### URLs
- **Admin Login**: `http://localhost:3000/admin/login`
- **Admin Dashboard**: `http://localhost:3000/admin`
- **Products Management**: `http://localhost:3000/admin/products`
- **Orders Management**: `http://localhost:3000/admin/orders`
- **Contact Messages**: `http://localhost:3000/admin/contacts`

### Navigation
1. Login at `/admin/login`
2. Redirects to `/admin` (dashboard)
3. Use sidebar to navigate sections

---

## 🛡️ Admin Features

### Dashboard
- Total products count
- Total orders count
- Total revenue
- Recent orders list
- Quick stats

### Products Management
- View all products
- Add new products
- Edit existing products
- Delete products
- Upload product images
- Set prices for different sizes (50g, 100g, 200g, 500g)
- Set size-specific images

### Orders Management
- View all orders
- Filter by status
- Update order status
- View order details
- See customer information
- Track payment method

### Contact Messages
- View all messages
- Mark as read/unread
- See customer details
- Respond to inquiries

---

## 🔧 Troubleshooting

### Issue 1: Can't Login to Admin Panel

**Possible Causes:**
- User doesn't exist in Supabase Auth
- `is_admin` is not set to `true`
- Wrong email/password

**Solutions:**
1. Check user exists in Supabase Auth
2. Run SQL to verify `is_admin = true`
3. Reset password if needed

### Issue 2: "Access Denied" After Login

**Cause:** User exists but `is_admin = false`

**Solution:**
```sql
UPDATE user_profiles 
SET is_admin = true 
WHERE email = 'your-email@example.com';
```

### Issue 3: User Not in user_profiles Table

**Cause:** Trigger didn't create profile

**Solution:**
```sql
-- Manually create profile
INSERT INTO user_profiles (id, email, full_name, is_admin)
VALUES (
  'user-uuid-from-auth',
  'admin@eleorafood.com',
  'Admin User',
  true
);
```

### Issue 4: Email Not Verified

**Solution:**
1. Go to Supabase Dashboard
2. Authentication → Users
3. Find user
4. Click "..." menu
5. Click "Confirm email"

---

## 📝 SQL Queries Reference

### Create Admin User
```sql
-- After user signs up, make them admin
UPDATE user_profiles 
SET is_admin = true 
WHERE email = 'admin@eleorafood.com';
```

### Check All Admins
```sql
SELECT id, email, full_name, is_admin, created_at
FROM user_profiles
WHERE is_admin = true;
```

### Remove Admin Access
```sql
UPDATE user_profiles 
SET is_admin = false 
WHERE email = 'user@example.com';
```

### Create Multiple Admins
```sql
UPDATE user_profiles 
SET is_admin = true 
WHERE email IN (
  'admin@eleorafood.com',
  'owner@eleorafood.com',
  'manager@eleorafood.com'
);
```

---

## 🎯 Quick Start Checklist

- [ ] Go to Supabase Dashboard
- [ ] Create user in Authentication
- [ ] Run SQL to set `is_admin = true`
- [ ] Verify user is admin
- [ ] Go to `http://localhost:3000/admin/login`
- [ ] Login with credentials
- [ ] Access admin dashboard
- [ ] Test all admin features

---

## 💡 Pro Tips

### Tip 1: Use Strong Passwords
For production, use strong passwords:
- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, symbols
- Example: `Admin@Eleora2024!Secure`

### Tip 2: Multiple Admin Accounts
Create multiple admin accounts for different team members:
- `admin@eleorafood.com` - Main admin
- `manager@eleorafood.com` - Store manager
- `support@eleorafood.com` - Customer support

### Tip 3: Test with Regular User First
1. Create a regular user account
2. Verify it works
3. Then create admin account
4. This ensures auth is working

### Tip 4: Keep Credentials Safe
- Don't commit credentials to Git
- Use environment variables for production
- Change default passwords
- Enable 2FA in Supabase

---

## 🔒 Security Best Practices

### For Development
- ✅ Use simple passwords for testing
- ✅ Keep credentials in secure notes
- ✅ Don't share credentials publicly

### For Production
- ✅ Use strong, unique passwords
- ✅ Enable 2FA in Supabase
- ✅ Use environment variables
- ✅ Implement password reset
- ✅ Add rate limiting
- ✅ Monitor admin access logs
- ✅ Regular security audits

---

## 📞 Need Help?

### Common Questions

**Q: Can I use any email?**
A: Yes! Just make sure to set `is_admin = true` in database.

**Q: How many admins can I have?**
A: Unlimited! Just set `is_admin = true` for each user.

**Q: Can I change the password?**
A: Yes, through Supabase Dashboard or password reset flow.

**Q: What if I forget the password?**
A: Reset it in Supabase Dashboard → Authentication → Users.

**Q: Can regular users access admin panel?**
A: No, only users with `is_admin = true` can access.

---

## ✅ Summary

### To Create Admin:
1. **Create user** in Supabase Auth
2. **Set is_admin = true** in database
3. **Login** at `/admin/login`

### Default Credentials:
```
Email: admin@eleorafood.com
Password: Admin@123456
```

### Admin Panel URL:
```
http://localhost:3000/admin/login
```

**That's it! You're ready to manage your store! 🎉**

---

**Last Updated**: December 20, 2024
**Status**: ✅ Complete Guide
