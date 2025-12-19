# 📦 Size-Specific Images Feature

## ✅ Feature Added!

Now you can add **different images for each size** (50g, 100g, 200g, 500g). When customers click on a size, the product image will change to show that specific package!

---

## 🎯 How It Works

### Customer Experience:
1. Customer views product detail page
2. Sees default image (100g)
3. Clicks on "50g" button
4. **Image changes** to show 50g package
5. Clicks on "500g" button
6. **Image changes** to show 500g package

---

## 🔧 Setup Required

### Step 1: Run Database Update

Run this SQL in **Supabase SQL Editor**:

```sql
-- Add support for size-specific images
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS size_images JSONB DEFAULT '{}';

-- Update existing products to use main image for all sizes
UPDATE products 
SET size_images = jsonb_build_object(
  '50g', image_url,
  '100g', image_url,
  '200g', image_url,
  '500g', image_url
)
WHERE size_images = '{}' OR size_images IS NULL;
```

Or use the file: `database-size-images.sql`

---

## 📝 How to Add Size Images

### Option 1: Through Admin Panel

1. **Login to Admin Panel**: http://localhost:3000/admin
2. **Go to Products** section
3. **Click Edit** on any product (or Add New)
4. **Scroll down** to "Size-Specific Images" section
5. **Add image URLs** for each size:
   - 50g Image URL: `images/biryani-50g.jpg`
   - 100g Image URL: `images/biryani-100g.jpg`
   - 200g Image URL: `images/biryani-200g.jpg`
   - 500g Image URL: `images/biryani-500g.jpg`
6. **Save** the product

**Note:** If you leave a size image blank, it will use the main image.

---

### Option 2: Directly in Database

```sql
UPDATE products 
SET size_images = '{
  "50g": "images/biryani-50g.jpg",
  "100g": "images/biryani-100g.jpg",
  "200g": "images/biryani-200g.jpg",
  "500g": "images/biryani-500g.jpg"
}'::jsonb
WHERE id = 1;
```

---

## 📁 Image Organization

### Recommended Structure:

```
public/images/
├── biryani-50g.jpg
├── biryani-100g.jpg
├── biryani-200g.jpg
├── biryani-500g.jpg
├── malvani-50g.jpg
├── malvani-100g.jpg
├── malvani-200g.jpg
└── malvani-500g.jpg
```

### Image URLs in Admin:
- 50g: `images/biryani-50g.jpg`
- 100g: `images/biryani-100g.jpg`
- 200g: `images/biryani-200g.jpg`
- 500g: `images/biryani-500g.jpg`

---

## 🎨 Example Product Setup

### Product: Biryani Masala

**Main Image:** `images/biryani.jpg`

**Size-Specific Images:**
- **50g:** `images/biryani-50g.jpg` (small packet)
- **100g:** `images/biryani-100g.jpg` (medium packet)
- **200g:** `images/biryani-200g.jpg` (large packet)
- **500g:** `images/biryani-500g.jpg` (family pack)

**Result:** When customer clicks different sizes, they see the actual package size!

---

## 💡 Tips

### Image Guidelines:
- **Same dimensions** for all size images (e.g., 800x800px)
- **Same background** for consistency
- **Clear labels** showing the size on package
- **High quality** images (at least 800px)
- **Optimized** file size (under 200KB)

### Naming Convention:
```
productname-size.jpg
Examples:
- biryani-50g.jpg
- biryani-100g.jpg
- malvani-50g.jpg
- malvani-100g.jpg
```

---

## 🧪 Testing

### Test the Feature:

1. **Add size images** to a product via admin panel
2. **Go to product detail page**
3. **Click different size buttons**
4. **Watch image change** for each size
5. **Verify** correct image shows for each size

---

## 📊 Database Structure

### size_images Column (JSONB):

```json
{
  "50g": "images/product-50g.jpg",
  "100g": "images/product-100g.jpg",
  "200g": "images/product-200g.jpg",
  "500g": "images/product-500g.jpg"
}
```

### Fallback Behavior:
- If size image not provided → Uses main `image_url`
- If size_images is empty → Uses main `image_url`
- Always has an image to display

---

## ✅ What's Updated

### Files Modified:
1. ✅ `src/types/index.ts` - Added size_images to Product type
2. ✅ `src/pages/ProductDetail.tsx` - Image changes on size selection
3. ✅ `src/pages/admin/AdminProducts.tsx` - Admin form with size image fields
4. ✅ `database-size-images.sql` - Database migration

### Features Added:
- ✅ Size-specific image storage
- ✅ Dynamic image switching
- ✅ Admin panel fields for each size
- ✅ Fallback to main image
- ✅ Visual indicator when size images available

---

## 🎯 Usage Example

### Admin Panel:

**Adding Product:**
1. Product Name: `Biryani Masala`
2. Main Image: `images/biryani.jpg`
3. **Size Images:**
   - 50g: `images/biryani-50g.jpg`
   - 100g: `images/biryani-100g.jpg`
   - 200g: `images/biryani-200g.jpg`
   - 500g: `images/biryani-500g.jpg`
4. Save

**Customer View:**
- Lands on product page → Sees 100g image
- Clicks "50g" → Image changes to 50g package
- Clicks "500g" → Image changes to 500g package
- Adds to cart with selected size

---

## 🔄 Migration for Existing Products

### Update All Products:

```sql
-- Set all sizes to use main image initially
UPDATE products 
SET size_images = jsonb_build_object(
  '50g', image_url,
  '100g', image_url,
  '200g', image_url,
  '500g', image_url
);
```

Then update individual products with specific size images through admin panel.

---

## 📝 Summary

**Feature:** Different images for different sizes  
**Status:** ✅ Complete and ready to use  
**Setup:** Run database migration SQL  
**Usage:** Add images through admin panel  
**Result:** Images change when size is selected  

---

**Now you can show customers exactly what package size they're buying!** 📦✨
