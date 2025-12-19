# 🚀 Admin Setup - 3 Simple Steps

## ⚡ Quick Setup (5 Minutes)

### Step 1️⃣: Create User in Supabase (2 min)

1. Go to: https://supabase.com
2. Login → Select your project
3. Click **Authentication** (left sidebar)
4. Click **Users** tab
5. Click **Add user** button (green button, top right)
6. Fill in:
   ```
   Email: admin@eleorafood.com
   Password: Admin@123456
   ✅ Auto Confirm User (check this!)
   ```
7. Click **Create user**

✅ **Done!** User created.

---

### Step 2️⃣: Make User Admin (1 min)

1. Click **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy and paste:
   ```sql
   UPDATE user_profiles 
   SET is_admin = true 
   WHERE email = 'admin@eleorafood.com';
   
   SELECT * FROM user_profiles WHERE is_admin = true;
   ```
4. Click **Run** (or press Ctrl+Enter)
5. Check results - should show your admin user

✅ **Done!** User is now admin.

---

### Step 3️⃣: Login to Admin Panel (1 min)

1. Open your React app: `http://localhost:3000`
2. Go to: `http://localhost:3000/admin/login`
3. Enter:
   ```
   Email: admin@eleorafood.com
   Password: Admin@123456
   ```
4. Click **Login**

✅ **Done!** You're in the admin panel! 🎉

---

## 🎯 What You Can Do Now

### Admin Dashboard
- View total products, orders, revenue
- See recent orders
- Quick statistics

### Manage Products
- Add new products
- Edit existing products
- Delete products
- Upload images
- Set prices for different sizes

### Manage Orders
- View all orders
- Update order status
- See customer details
- Track payments

### View Messages
- Read contact form submissions
- Mark as read/unread
- Respond to customers

---

## 🔍 Verify It's Working

### Check 1: Can You Login?
- Go to `/admin/login`
- Enter credentials
- Should redirect to dashboard

### Check 2: Can You See Dashboard?
- Should see stats (products, orders, revenue)
- Should see recent orders
- Sidebar should show all sections

### Check 3: Can You Manage Products?
- Click "Products" in sidebar
- Should see product list
- Try clicking "Add Product"

---

## ❌ Troubleshooting

### Problem: "Invalid credentials"
**Solution:**
- Check email is correct
- Check password is correct
- Verify user exists in Supabase Auth

### Problem: "Access denied"
**Solution:**
- Run SQL again to set `is_admin = true`
- Verify with: `SELECT * FROM user_profiles WHERE email = 'admin@eleorafood.com'`

### Problem: User not in user_profiles
**Solution:**
1. Get user ID from Auth:
   ```sql
   SELECT id FROM auth.users WHERE email = 'admin@eleorafood.com';
   ```
2. Create profile manually:
   ```sql
   INSERT INTO user_profiles (id, email, full_name, is_admin)
   VALUES ('user-id-here', 'admin@eleorafood.com', 'Admin', true);
   ```

---

## 📝 Quick Reference

### Admin Credentials
```
Email: admin@eleorafood.com
Password: Admin@123456
```

### Admin URLs
```
Login:      http://localhost:3000/admin/login
Dashboard:  http://localhost:3000/admin
Products:   http://localhost:3000/admin/products
Orders:     http://localhost:3000/admin/orders
Contacts:   http://localhost:3000/admin/contacts
```

### SQL to Make Admin
```sql
UPDATE user_profiles 
SET is_admin = true 
WHERE email = 'admin@eleorafood.com';
```

### SQL to Check Admin
```sql
SELECT * FROM user_profiles WHERE is_admin = true;
```

---

## 💡 Pro Tips

1. **Use Strong Password in Production**
   - Development: `Admin@123456` is fine
   - Production: Use something like `Admin@Eleora2024!Secure#789`

2. **Create Multiple Admins**
   - Main admin: `admin@eleorafood.com`
   - Manager: `manager@eleorafood.com`
   - Support: `support@eleorafood.com`

3. **Test Regular User First**
   - Create a regular user account
   - Make sure login works
   - Then create admin

4. **Keep Credentials Safe**
   - Don't commit to Git
   - Use password manager
   - Change default passwords

---

## ✅ Success Checklist

- [ ] User created in Supabase Auth
- [ ] User confirmed (auto-confirm checked)
- [ ] SQL run to set is_admin = true
- [ ] Verified user is admin in database
- [ ] Can login at /admin/login
- [ ] Can see admin dashboard
- [ ] Can access all admin sections
- [ ] Can manage products
- [ ] Can view orders
- [ ] Can see contact messages

---

## 🎉 You're All Set!

Your admin account is ready. You can now:
- ✅ Manage products
- ✅ Process orders
- ✅ View customer messages
- ✅ Monitor sales
- ✅ Update inventory

**Happy managing! 🚀**

---

**Need Help?** Check `ADMIN_CREDENTIALS.md` for detailed troubleshooting.
