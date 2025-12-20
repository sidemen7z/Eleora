# Image Upload Setup Guide

## ✅ Feature Added: Upload Images from Local Computer

You can now upload JPG/PNG images directly from your computer in the admin panel instead of pasting URLs!

---

## 🔧 Setup Required (One-Time)

### Step 1: Create Supabase Storage Bucket

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Click on your project**
3. **Go to Storage** (in left sidebar)
4. **Click "New bucket"**
5. **Configure the bucket**:
   - **Name:** `product-images`
   - **Public bucket:** Toggle **ON** (important!)
   - Click **"Create bucket"**

### Step 2: Set Storage Policies (Optional but Recommended)

To allow only admins to upload:

1. Click on the `product-images` bucket
2. Go to **Policies** tab
3. Click **"New Policy"**
4. **For INSERT (Upload)**:
   ```sql
   CREATE POLICY "Allow authenticated uploads"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'product-images');
   ```
5. **For SELECT (View)**:
   ```sql
   CREATE POLICY "Public read access"
   ON storage.objects FOR SELECT
   TO public
   USING (bucket_id = 'product-images');
   ```

---

## 📤 How to Use

### In Admin Panel:

1. **Go to** `/admin/login`
2. **Login** with admin credentials
3. **Click "Products"** tab
4. **Click "Add New Product"** or **"Edit"** existing product
5. **Upload images**:
   - Click the **"📤 Upload"** button next to any image field
   - Select JPG/PNG file from your computer (Max 5MB)
   - Wait for upload to complete
   - The URL will automatically fill in the input field
6. **Click "Add Product"** or **"Update Product"**

### Features:

- ✅ Upload JPG, PNG, GIF, WebP images
- ✅ Max file size: 5MB
- ✅ Automatic unique filenames
- ✅ Images stored in Supabase Storage
- ✅ Public URLs generated automatically
- ✅ Can still paste URLs manually if preferred
- ✅ Upload button for main image and all size-specific images (50g, 100g, 200g, 500g)

---

## 🎯 Image URL Format

After upload, images will have URLs like:
```
https://edypwfdbxbsxfgpmwyio.supabase.co/storage/v1/object/public/product-images/products/1234567890-abc123.jpg
```

These URLs are permanent and can be used anywhere!

---

## 🔍 Troubleshooting

### "Upload failed: new row violates row-level security policy"
- Make sure the bucket is set to **Public**
- Or add the storage policies mentioned in Step 2

### "Upload failed: Bucket not found"
- Make sure you created the bucket named exactly `product-images`
- Check that it's in the correct Supabase project

### "Image size must be less than 5MB"
- Compress your image using tools like:
  - https://tinypng.com/
  - https://squoosh.app/
  - Or any image editor

### Upload button not working
- Check browser console for errors
- Make sure Supabase project is not paused
- Verify bucket exists and is public

---

## 💡 Tips

1. **Optimize images before upload** - Smaller files load faster
2. **Use descriptive filenames** - Easier to manage
3. **Keep aspect ratio consistent** - Better UI appearance
4. **Recommended image size**: 800x800px for product images
5. **You can still use external URLs** - Just paste them in the input field

---

## 🚀 Next Steps

After Netlify deploys (2-3 minutes), you can:
1. Create the Supabase storage bucket
2. Start uploading product images directly from admin panel
3. No more need to host images externally!

---

**Note:** The upload feature is only available in the admin panel for security reasons. Regular users cannot upload images.
