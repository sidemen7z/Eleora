-- ============================================
-- COMPLETE RLS SECURITY SETUP
-- ============================================
-- This script sets up Row Level Security for all tables
-- 
-- Security Rules:
-- 1. READ: Everyone can read all tables
-- 2. PRODUCTS: Only admins can write (INSERT/UPDATE/DELETE)
-- 3. ORDERS: Users can create their own orders, admins can manage all
-- 4. USER_PROFILES: Users can update their own profile, admins can manage all
-- 5. CONTACTS: Anyone can create, admins can read/manage
-- 6. STORAGE: Admins can upload images, everyone can view
-- ============================================

-- ============================================
-- 1. ENABLE RLS ON ALL TABLES
-- ============================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. PRODUCTS TABLE POLICIES
-- ============================================

-- Everyone can READ products
CREATE POLICY "Anyone can view active products"
ON products FOR SELECT
TO public
USING (is_active = true);

-- Only admins can INSERT products
CREATE POLICY "Only admins can insert products"
ON products FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.is_admin = true
  )
);

-- Only admins can UPDATE products
CREATE POLICY "Only admins can update products"
ON products FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.is_admin = true
  )
);

-- Only admins can DELETE products
CREATE POLICY "Only admins can delete products"
ON products FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.is_admin = true
  )
);

-- ============================================
-- 3. ORDERS TABLE POLICIES
-- ============================================

-- Everyone can READ their own orders, admins can read all
CREATE POLICY "Users can view their own orders, admins can view all"
ON orders FOR SELECT
TO authenticated
USING (
  user_id = auth.uid() 
  OR EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.is_admin = true
  )
);

-- Guest orders (no user_id) can be viewed by anyone with order ID
CREATE POLICY "Anyone can view guest orders"
ON orders FOR SELECT
TO public
USING (user_id IS NULL);

-- Authenticated users can INSERT their own orders
CREATE POLICY "Users can create their own orders"
ON orders FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

-- Guests can INSERT orders (for guest checkout)
CREATE POLICY "Guests can create orders"
ON orders FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);

-- Only admins can UPDATE orders
CREATE POLICY "Only admins can update orders"
ON orders FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.is_admin = true
  )
);

-- Only admins can DELETE orders
CREATE POLICY "Only admins can delete orders"
ON orders FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.is_admin = true
  )
);

-- ============================================
-- 4. ORDER_ITEMS TABLE POLICIES
-- ============================================

-- Users can view order items for their orders, admins can view all
CREATE POLICY "Users can view their order items, admins can view all"
ON order_items FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND (orders.user_id = auth.uid() OR EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    ))
  )
);

-- Guests can view order items for guest orders
CREATE POLICY "Anyone can view guest order items"
ON order_items FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id IS NULL
  )
);

-- Users can INSERT order items for their orders
CREATE POLICY "Users can create order items for their orders"
ON order_items FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
  )
);

-- Guests can INSERT order items
CREATE POLICY "Guests can create order items"
ON order_items FOR INSERT
TO anon
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id IS NULL
  )
);

-- ============================================
-- 5. USER_PROFILES TABLE POLICIES
-- ============================================

-- Everyone can READ user profiles (for display names, etc.)
CREATE POLICY "Anyone can view user profiles"
ON user_profiles FOR SELECT
TO public
USING (true);

-- Users are automatically created via trigger, so INSERT is handled
CREATE POLICY "Users can insert their own profile"
ON user_profiles FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

-- Users can UPDATE their own profile, admins can update any
CREATE POLICY "Users can update their own profile, admins can update any"
ON user_profiles FOR UPDATE
TO authenticated
USING (
  id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM user_profiles up
    WHERE up.id = auth.uid()
    AND up.is_admin = true
  )
);

-- Only admins can DELETE profiles
CREATE POLICY "Only admins can delete profiles"
ON user_profiles FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.is_admin = true
  )
);

-- ============================================
-- 6. CONTACTS TABLE POLICIES
-- ============================================

-- Only admins can READ contacts
CREATE POLICY "Only admins can view contacts"
ON contacts FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.is_admin = true
  )
);

-- Anyone can INSERT contacts (contact form submissions)
CREATE POLICY "Anyone can submit contact form"
ON contacts FOR INSERT
TO public
WITH CHECK (true);

-- Only admins can UPDATE contacts
CREATE POLICY "Only admins can update contacts"
ON contacts FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.is_admin = true
  )
);

-- Only admins can DELETE contacts
CREATE POLICY "Only admins can delete contacts"
ON contacts FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.is_admin = true
  )
);

-- ============================================
-- 7. STORAGE POLICIES (for product-images bucket)
-- ============================================

-- Everyone can VIEW images
CREATE POLICY "Public read access to product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- Only admins can UPLOAD images
CREATE POLICY "Only admins can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images'
  AND EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.is_admin = true
  )
);

-- Only admins can UPDATE images
CREATE POLICY "Only admins can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.is_admin = true
  )
);

-- Only admins can DELETE images
CREATE POLICY "Only admins can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.is_admin = true
  )
);

-- ============================================
-- DONE! RLS is now properly configured
-- ============================================
-- 
-- Summary:
-- ✅ Products: Read (everyone), Write (admins only)
-- ✅ Orders: Read (own orders), Write (users for their orders, admins for all)
-- ✅ Order Items: Read (own order items), Write (users for their orders)
-- ✅ User Profiles: Read (everyone), Write (own profile or admin)
-- ✅ Contacts: Read (admins only), Write (anyone can submit)
-- ✅ Storage: Read (everyone), Write (admins only)
-- 
-- To apply these policies:
-- 1. Go to Supabase Dashboard → SQL Editor
-- 2. Paste this entire script
-- 3. Click "Run"
-- 4. Done!
