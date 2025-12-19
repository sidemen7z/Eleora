-- ===================================
-- QUICK ADMIN USER SETUP
-- ===================================
-- Run this in Supabase SQL Editor after creating user in Auth
-- ===================================

-- STEP 1: Make user an admin
-- Replace 'admin@eleorafood.com' with your actual admin email
UPDATE user_profiles 
SET is_admin = true 
WHERE email = 'admin@eleorafood.com';

-- STEP 2: Verify admin was created
SELECT 
  id,
  email,
  full_name,
  is_admin,
  created_at
FROM user_profiles 
WHERE is_admin = true;

-- ===================================
-- EXPECTED RESULT:
-- You should see your admin user with is_admin = true
-- ===================================

-- ===================================
-- ALTERNATIVE: Create multiple admins at once
-- ===================================
/*
UPDATE user_profiles 
SET is_admin = true 
WHERE email IN (
  'admin@eleorafood.com',
  'owner@eleorafood.com',
  'manager@eleorafood.com'
);
*/

-- ===================================
-- TROUBLESHOOTING: If user_profiles entry doesn't exist
-- ===================================
/*
-- First, get the user ID from auth.users
SELECT id, email FROM auth.users WHERE email = 'admin@eleorafood.com';

-- Then manually create the profile (replace 'user-id-here' with actual ID)
INSERT INTO user_profiles (id, email, full_name, is_admin)
VALUES (
  'user-id-here',
  'admin@eleorafood.com',
  'Admin User',
  true
);
*/

-- ===================================
-- REMOVE ADMIN ACCESS (if needed)
-- ===================================
/*
UPDATE user_profiles 
SET is_admin = false 
WHERE email = 'user@example.com';
*/
