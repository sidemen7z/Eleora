-- ============================================
-- FINAL IMAGE UPDATE - EXACT IDs FROM YOUR DATABASE
-- Copy and paste this ENTIRE script into Supabase SQL Editor
-- ============================================

-- 1️⃣ MALVANI MASALA (ID: 1)
UPDATE products
SET 
  image_url = 'images/malvani masalapng.png',
  size_images = '{"50g": "images/malvani masalapng.png", "100g": "images/malvani masalapng.png", "200g": "images/goldmalvanimasala.png", "500g": "images/goldmalvanimasala.png"}'::jsonb
WHERE id = 1;

-- 2️⃣ THE EVERYDAY MASALA (ID: 2)
UPDATE products
SET 
  image_url = 'images/everydaymasala.png',
  size_images = '{"50g": "images/everydaymasala.png", "100g": "images/everydaymasala.png", "200g": "images/goldtheeverydaymasala.png", "500g": "images/goldtheeverydaymasala.png"}'::jsonb
WHERE id = 2;

-- 3️⃣ GODA MASALA (ID: 3)
UPDATE products
SET 
  image_url = 'images/goda-masala.png',
  size_images = '{"50g": "images/goda-masala.png", "100g": "images/goda-masala.png", "200g": "images/GoldGodamasala.png", "500g": "images/GoldGodamasala.png"}'::jsonb
WHERE id = 3;

-- 4️⃣ CHICKEN / MUTTON MASALA (ID: 4)
UPDATE products
SET 
  image_url = 'images/mutton masala.png',
  size_images = '{"50g": "images/mutton masala.png", "100g": "images/mutton masala.png", "200g": "images/goldmuttonmasala.png", "500g": "images/goldmuttonmasala.png"}'::jsonb
WHERE id = 4;

-- 5️⃣ BIRYANI MASALA (ID: 5)
UPDATE products
SET 
  image_url = 'images/biryanimasala.png',
  size_images = '{"50g": "images/biryanimasala.png", "100g": "images/biryanimasala.png", "200g": "images/goldbirynanimasala.png", "500g": "images/goldbirynanimasala.png"}'::jsonb
WHERE id = 5;

-- 6️⃣ PEANUT CHUTNEY (ID: 6)
UPDATE products
SET 
  image_url = 'images/peanut chutney.png',
  size_images = '{"50g": "images/peanut chutney.png", "100g": "images/peanut chutney.png", "200g": "images/goldpeanutchutney (2).png", "500g": "images/goldpeanutchutney (2).png"}'::jsonb
WHERE id = 6;

-- 7️⃣ FLAXSEED CHUTNEY (ID: 7) - Need to check if this exists
UPDATE products
SET 
  image_url = 'images/flaxseedschutney.png',
  size_images = '{"50g": "images/flaxseedschutney.png", "100g": "images/flaxseedschutney.png", "200g": "images/goldflaxseedschutney.png", "500g": "images/goldflaxseedschutney.png"}'::jsonb
WHERE id = 7;

-- 8️⃣ COCONUT GARLIC CHUTNEY (ID: 8) - Need to check if this exists
UPDATE products
SET 
  image_url = 'images/coconutgarlic.png',
  size_images = '{"50g": "images/coconutgarlic.png", "100g": "images/coconutgarlic.png", "200g": "images/goldgarlicchutney.png", "500g": "images/goldgarlicchutney.png"}'::jsonb
WHERE id = 8;

-- ============================================
-- VERIFY THE UPDATES
-- ============================================
SELECT 
  id,
  name,
  image_url,
  size_images
FROM products
ORDER BY id;
