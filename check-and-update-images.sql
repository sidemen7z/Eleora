-- First, let's see what products exist
SELECT id, name, image_url FROM products ORDER BY id;

-- If the above shows your products, run these updates one by one:

-- Update product ID 1 (Malvani Masala)
UPDATE products
SET 
  image_url = '/images/malvani masalapng.png',
  size_images = '{"50g": "/images/malvani masalapng.png", "100g": "/images/malvani masalapng.png", "200g": "/images/goldmalvanimasala.png", "500g": "/images/goldmalvanimasala.png"}'::jsonb
WHERE id = 1;

-- Update product ID 2 (Everyday Masala)
UPDATE products
SET 
  image_url = '/images/everydaymasala.png',
  size_images = '{"50g": "/images/everydaymasala.png", "100g": "/images/everydaymasala.png", "200g": "/images/goldtheeverydaymasala.png", "500g": "/images/goldtheeverydaymasala.png"}'::jsonb
WHERE id = 2;

-- Update product ID 3 (Goda Masala)
UPDATE products
SET 
  image_url = '/images/goda-masala.png',
  size_images = '{"50g": "/images/goda-masala.png", "100g": "/images/goda-masala.png", "200g": "/images/GoldGodamasala.png", "500g": "/images/GoldGodamasala.png"}'::jsonb
WHERE id = 3;

-- Update product ID 4 (Biryani Masala)
UPDATE products
SET 
  image_url = '/images/biryanimasala.png',
  size_images = '{"50g": "/images/biryanimasala.png", "100g": "/images/biryanimasala.png", "200g": "/images/goldbirynanimasala.png", "500g": "/images/goldbirynanimasala.png"}'::jsonb
WHERE id = 4;

-- Update product ID 5 (Chicken/Mutton Masala)
UPDATE products
SET 
  image_url = '/images/mutton masala.png',
  size_images = '{"50g": "/images/mutton masala.png", "100g": "/images/mutton masala.png", "200g": "/images/goldmuttonmasala.png", "500g": "/images/goldmuttonmasala.png"}'::jsonb
WHERE id = 5;

-- Update product ID 6 (Peanut Chutney)
UPDATE products
SET 
  image_url = '/images/peanut chutney.png',
  size_images = '{"50g": "/images/peanut chutney.png", "100g": "/images/peanut chutney.png", "200g": "/images/goldpeanutchutney (2).png", "500g": "/images/goldpeanutchutney (2).png"}'::jsonb
WHERE id = 6;

-- Update product ID 7 (Flaxseed Chutney)
UPDATE products
SET 
  image_url = '/images/flaxseedschutney.png',
  size_images = '{"50g": "/images/flaxseedschutney.png", "100g": "/images/flaxseedschutney.png", "200g": "/images/goldflaxseedschutney.png", "500g": "/images/goldflaxseedschutney.png"}'::jsonb
WHERE id = 7;

-- Update product ID 8 (Coconut Garlic Chutney)
UPDATE products
SET 
  image_url = '/images/coconutgarlic.png',
  size_images = '{"50g": "/images/coconutgarlic.png", "100g": "/images/coconutgarlic.png", "200g": "/images/goldgarlicchutney.png", "500g": "/images/goldgarlicchutney.png"}'::jsonb
WHERE id = 8;

-- Verify the updates
SELECT id, name, image_url, size_images FROM products ORDER BY id;
