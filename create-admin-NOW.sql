-- ============================================
-- CREATE ADMIN USER - RUN THIS IN SUPABASE
-- ============================================

-- STEP 1: First, create the user in Supabase Dashboard:
-- Go to Authentication → Users → Add user
-- Email: admin@eleorafood.com
-- Password: Admin@123456
-- ✅ Check "Auto Confirm User"
-- Then come back and run this SQL

-- STEP 2: Make the user an admin
UPDATE user_profiles 
SET is_admin = true 
WHERE email = 'admin@eleorafood.com';

-- STEP 3: Verify it worked
SELECT 
  id,
  email,
  full_name,
  is_admin,
  created_at
FROM user_profiles 
WHERE email = 'admin@eleorafood.com';

-- ============================================
-- EXPECTED RESULT:
-- You should see one row with:
-- - email: admin@eleorafood.com
-- - is_admin: true
-- ============================================

-- ============================================
-- IF NO RESULTS (user_profiles entry missing):
-- ============================================

-- First, get the user ID from auth.users:
-- SELECT id FROM auth.users WHERE email = 'admin@eleorafood.com';

-- Then create the profile manually (replace USER_ID with actual ID):
/*
INSERT INTO user_profiles (id, email, full_name, is_admin)
VALUES (
  'USER_ID_FROM_ABOVE_QUERY',
  'admin@eleorafood.com',
  'Admin User',
  true
);
*/

-- ============================================
-- VERIFY ADMIN ACCESS:
-- ============================================

-- Check all admin users:
SELECT * FROM user_profiles WHERE is_admin = true;

-- Check user in auth:
SELECT id, email, confirmed_at FROM auth.users WHERE email = 'admin@eleorafood.com';

-- ============================================
-- NOW YOU CAN LOGIN:
-- ============================================
-- URL: http://localhost:3000/admin/login
-- Email: admin@eleorafood.com
-- Password: Admin@123456
-- ============================================
