-- Add support for different images per size

-- Add new column for size-specific images
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS size_images JSONB DEFAULT '{}';

-- Example structure:
-- size_images = {
--   "50g": "images/product-50g.jpg",
--   "100g": "images/product-100g.jpg",
--   "200g": "images/product-200g.jpg",
--   "500g": "images/product-500g.jpg"
-- }

-- Update existing products to use main image for all sizes (optional)
UPDATE products 
SET size_images = jsonb_build_object(
  '50g', image_url,
  '100g', image_url,
  '200g', image_url,
  '500g', image_url
)
WHERE size_images = '{}' OR size_images IS NULL;

-- Example: Update a specific product with different images
-- UPDATE products 
-- SET size_images = '{
--   "50g": "images/biryani-50g.jpg",
--   "100g": "images/biryani-100g.jpg",
--   "200g": "images/biryani-200g.jpg",
--   "500g": "images/biryani-500g.jpg"
-- }'::jsonb
-- WHERE id = 1;
