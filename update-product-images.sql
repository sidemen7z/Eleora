-- ============================================
-- UPDATE ALL PRODUCT IMAGES
-- Silver images for 50g & 100g
-- Gold images for 200g & 500g
-- ============================================

-- 1️⃣ MALVANI MASALA
UPDATE products
SET 
  image_url = '/images/malvani masalapng.png',
  size_images = jsonb_build_object(
    '50g', '/images/malvani masalapng.png',
    '100g', '/images/malvani masalapng.png',
    '200g', '/images/goldmalvanimasala.png',
    '500g', '/images/goldmalvanimasala.png'
  )
WHERE name = 'Malvani Masala';

-- 2️⃣ EVERYDAY MASALA
UPDATE products
SET 
  image_url = '/images/everydaymasala.png',
  size_images = jsonb_build_object(
    '50g', '/images/everydaymasala.png',
    '100g', '/images/everydaymasala.png',
    '200g', '/images/goldtheeverydaymasala.png',
    '500g', '/images/goldtheeverydaymasala.png'
  )
WHERE name = 'The Everyday Masala';

-- 3️⃣ GODA MASALA
UPDATE products
SET 
  image_url = '/images/goda-masala.png',
  size_images = jsonb_build_object(
    '50g', '/images/goda-masala.png',
    '100g', '/images/goda-masala.png',
    '200g', '/images/GoldGodamasala.png',
    '500g', '/images/GoldGodamasala.png'
  )
WHERE name = 'Goda Masala';

-- 4️⃣ BIRYANI MASALA
UPDATE products
SET 
  image_url = '/images/biryanimasala.png',
  size_images = jsonb_build_object(
    '50g', '/images/biryanimasala.png',
    '100g', '/images/biryanimasala.png',
    '200g', '/images/goldbirynanimasala.png',
    '500g', '/images/goldbirynanimasala.png'
  )
WHERE name = 'Biryani Masala';

-- 5️⃣ CHICKEN / MUTTON MASALA
UPDATE products
SET 
  image_url = '/images/mutton masala.png',
  size_images = jsonb_build_object(
    '50g', '/images/mutton masala.png',
    '100g', '/images/mutton masala.png',
    '200g', '/images/goldmuttonmasala.png',
    '500g', '/images/goldmuttonmasala.png'
  )
WHERE name = 'Chicken / Mutton Masala';

-- 6️⃣ PEANUT CHUTNEY
UPDATE products
SET 
  image_url = '/images/peanut chutney.png',
  size_images = jsonb_build_object(
    '50g', '/images/peanut chutney.png',
    '100g', '/images/peanut chutney.png',
    '200g', '/images/goldpeanutchutney (2).png',
    '500g', '/images/goldpeanutchutney (2).png'
  )
WHERE name = 'Peanut Chutney';

-- 7️⃣ FLAXSEED CHUTNEY
UPDATE products
SET 
  image_url = '/images/flaxseedschutney.png',
  size_images = jsonb_build_object(
    '50g', '/images/flaxseedschutney.png',
    '100g', '/images/flaxseedschutney.png',
    '200g', '/images/goldflaxseedschutney.png',
    '500g', '/images/goldflaxseedschutney.png'
  )
WHERE name = 'Flaxseed Chutney';

-- 8️⃣ COCONUT GARLIC CHUTNEY
UPDATE products
SET 
  image_url = '/images/coconutgarlic.png',
  size_images = jsonb_build_object(
    '50g', '/images/coconutgarlic.png',
    '100g', '/images/coconutgarlic.png',
    '200g', '/images/goldgarlicchutney.png',
    '500g', '/images/goldgarlicchutney.png'
  )
WHERE name = 'Coconut Garlic Chutney';

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
