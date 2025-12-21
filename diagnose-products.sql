-- ============================================
-- DIAGNOSTIC: Check Current Product Data
-- Run this FIRST to see your actual product IDs and names
-- ============================================

SELECT 
  id,
  name,
  image_url,
  size_images
FROM products
ORDER BY id;

-- This will show you:
-- 1. The actual product IDs in your database
-- 2. The exact product names (check for spelling/spacing differences)
-- 3. Current image URLs
-- 4. Current size_images structure
