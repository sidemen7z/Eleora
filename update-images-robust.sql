-- ============================================
-- ROBUST IMAGE UPDATE SCRIPT
-- This script uses flexible matching to update images
-- Run this after checking diagnose-products.sql
-- ============================================

-- 1️⃣ MALVANI MASALA (matches any variation of the name)
UPDATE products
SET 
  image_url = '/images/malvani masalapng.png',
  size_images = '{"50g": "/images/malvani masalapng.png", "100g": "/images/malvani masalapng.png", "200g": "/images/goldmalvanimasala.png", "500g": "/images/goldmalvanimasala.png"}'::jsonb
WHERE name ILIKE '%malvani%masala%';

-- 2️⃣ EVERYDAY MASALA
UPDATE products
SET 
  image_url = '/images/everydaymasala.png',
  size_images = '{"50g": "/images/everydaymasala.png", "100g": "/images/everydaymasala.png", "200g": "/images/goldtheeverydaymasala.png", "500g": "/images/goldtheeverydaymasala.png"}'::jsonb
WHERE name ILIKE '%everyday%masala%';

-- 3️⃣ GODA MASALA
UPDATE products
SET 
  image_url = '/images/goda-masala.png',
  size_images = '{"50g": "/images/goda-masala.png", "100g": "/images/goda-masala.png", "200g": "/images/GoldGodamasala.png", "500g": "/images/GoldGodamasala.png"}'::jsonb
WHERE name ILIKE '%goda%masala%';

-- 4️⃣ BIRYANI MASALA
UPDATE products
SET 
  image_url = '/images/biryanimasala.png',
  size_images = '{"50g": "/images/biryanimasala.png", "100g": "/images/biryanimasala.png", "200g": "/images/goldbirynanimasala.png", "500g": "/images/goldbirynanimasala.png"}'::jsonb
WHERE name ILIKE '%biryani%masala%';

-- 5️⃣ CHICKEN / MUTTON MASALA
UPDATE products
SET 
  image_url = '/images/mutton masala.png',
  size_images = '{"50g": "/images/mutton masala.png", "100g": "/images/mutton masala.png", "200g": "/images/goldmuttonmasala.png", "500g": "/images/goldmuttonmasala.png"}'::jsonb
WHERE name ILIKE '%chicken%' OR name ILIKE '%mutton%';

-- 6️⃣ PEANUT CHUTNEY
UPDATE products
SET 
  image_url = '/images/peanut chutney.png',
  size_images = '{"50g": "/images/peanut chutney.png", "100g": "/images/peanut chutney.png", "200g": "/images/goldpeanutchutney (2).png", "500g": "/images/goldpeanutchutney (2).png"}'::jsonb
WHERE name ILIKE '%peanut%chutney%';

-- 7️⃣ FLAXSEED CHUTNEY
UPDATE products
SET 
  image_url = '/images/flaxseedschutney.png',
  size_images = '{"50g": "/images/flaxseedschutney.png", "100g": "/images/flaxseedschutney.png", "200g": "/images/goldflaxseedschutney.png", "500g": "/images/goldflaxseedschutney.png"}'::jsonb
WHERE name ILIKE '%flaxseed%chutney%';

-- 8️⃣ COCONUT GARLIC CHUTNEY
UPDATE products
SET 
  image_url = '/images/coconutgarlic.png',
  size_images = '{"50g": "/images/coconutgarlic.png", "100g": "/images/coconutgarlic.png", "200g": "/images/goldgarlicchutney.png", "500g": "/images/goldgarlicchutney.png"}'::jsonb
WHERE name ILIKE '%coconut%garlic%chutney%';

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
