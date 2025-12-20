import React, { useEffect, useState } from 'react';
import { supabase } from '../../config/supabase';
import { Product } from '../../types';
import { formatPrice } from '../../utils/formatters';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    short_name: '',
    description: '',
    use_case: '',
    image_url: '',
    price_50g: '',
    price_100g: '',
    price_200g: '',
    price_500g: '',
    image_50g: '',
    image_100g: '',
    image_200g: '',
    image_500g: '',
    highlights: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File, imageType: string): Promise<string | null> => {
    try {
      setUploading(true);
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('❌ Please upload an image file (JPG, PNG, etc.)');
        return null;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('❌ Image size must be less than 5MB');
        return null;
      }

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert('❌ Upload failed: ' + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, imageType: 'main' | '50g' | '100g' | '200g' | '500g') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file, imageType);
    if (url) {
      if (imageType === 'main') {
        setFormData({ ...formData, image_url: url });
      } else {
        setFormData({ ...formData, [`image_${imageType}`]: url });
      }
      alert('✅ Image uploaded successfully!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Add timeout to prevent infinite saving
    const timeoutId = setTimeout(() => {
      setSaving(false);
      alert('⏱️ Save timeout. Please check your connection and try again.');
    }, 15000); // 15 second timeout

    const productData = {
      name: formData.name,
      short_name: formData.short_name,
      description: formData.description,
      use_case: formData.use_case,
      image_url: formData.image_url,
      prices: {
        '50g': Number(formData.price_50g),
        '100g': Number(formData.price_100g),
        '200g': Number(formData.price_200g),
        '500g': Number(formData.price_500g)
      },
      size_images: {
        '50g': formData.image_50g || formData.image_url,
        '100g': formData.image_100g || formData.image_url,
        '200g': formData.image_200g || formData.image_url,
        '500g': formData.image_500g || formData.image_url
      },
      highlights: formData.highlights.split(',').map(h => h.trim()),
      is_active: true
    };

    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;
        clearTimeout(timeoutId);
        alert('✅ Product updated successfully!');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
        clearTimeout(timeoutId);
        alert('✅ Product added successfully!');
      }

      // Reload products first, then close modal
      await loadProducts();
      setShowModal(false);
      resetForm();
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error('Error saving product:', error);
      alert('❌ Error: ' + error.message);
    } finally {
      clearTimeout(timeoutId);
      setSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      short_name: product.short_name,
      description: product.description,
      use_case: product.use_case,
      image_url: product.image_url,
      price_50g: String(product.prices['50g']),
      price_100g: String(product.prices['100g']),
      price_200g: String(product.prices['200g']),
      price_500g: String(product.prices['500g']),
      image_50g: product.size_images?.['50g'] || '',
      image_100g: product.size_images?.['100g'] || '',
      image_200g: product.size_images?.['200g'] || '',
      image_500g: product.size_images?.['500g'] || '',
      highlights: Array.isArray(product.highlights) ? product.highlights.join(', ') : product.highlights
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
      alert('Product deleted successfully!');
      loadProducts();
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      short_name: '',
      description: '',
      use_case: '',
      image_url: '',
      price_50g: '',
      price_100g: '',
      price_200g: '',
      price_500g: '',
      image_50g: '',
      image_100g: '',
      image_200g: '',
      image_500g: '',
      highlights: ''
    });
    setEditingProduct(null);
  };

  if (loading) {
    return <div className="admin-loading">Loading products...</div>;
  }

  return (
    <div className="admin-products">
      <div className="section-header">
        <h1>📦 Products Management</h1>
        <button className="btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
          ➕ Add New Product
        </button>
      </div>

      <div className="products-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Short Name</th>
              <th>Prices</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img src={product.image_url} alt={product.name} className="product-thumb" />
                </td>
                <td>{product.name}</td>
                <td>{product.short_name}</td>
                <td>
                  <div className="price-list">
                    <span>50g: ₹{formatPrice(product.prices['50g'])}</span>
                    <span>100g: ₹{formatPrice(product.prices['100g'])}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${product.is_active ? 'status-active' : 'status-inactive'}`}>
                    {product.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-edit" onClick={() => handleEdit(product)}>✏️</button>
                    <button className="btn-delete" onClick={() => handleDelete(product.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Short Name *</label>
                <input
                  type="text"
                  value={formData.short_name}
                  onChange={(e) => setFormData({ ...formData, short_name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Use Case *</label>
                <input
                  type="text"
                  value={formData.use_case}
                  onChange={(e) => setFormData({ ...formData, use_case: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Main Image URL *</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    required
                    placeholder="Paste URL or upload image"
                    style={{ flex: 1 }}
                  />
                  <label className="btn-upload" style={{ margin: 0, cursor: 'pointer', padding: '0.75rem 1rem', backgroundColor: 'var(--color-gold)', color: 'var(--color-black)', borderRadius: '4px', fontWeight: '600', whiteSpace: 'nowrap' }}>
                    {uploading ? '⏳ Uploading...' : '📤 Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'main')}
                      style={{ display: 'none' }}
                      disabled={uploading}
                    />
                  </label>
                </div>
                <small style={{ color: 'var(--color-text-muted)', display: 'block', marginTop: '0.25rem' }}>
                  Default image for all sizes (JPG, PNG - Max 5MB)
                </small>
              </div>

              <h3 style={{ color: 'var(--color-gold)', margin: '1.5rem 0 1rem' }}>📦 Size-Specific Images (Optional)</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Add different images for each size. Leave blank to use main image.
              </p>

              <div className="form-row">
                <div className="form-group">
                  <label>50g Image URL</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={formData.image_50g}
                      onChange={(e) => setFormData({ ...formData, image_50g: e.target.value })}
                      placeholder="Paste URL or upload"
                      style={{ flex: 1 }}
                    />
                    <label className="btn-upload-small" style={{ margin: 0, cursor: 'pointer', padding: '0.5rem', backgroundColor: 'var(--color-gold)', color: 'var(--color-black)', borderRadius: '4px', fontSize: '0.9rem' }}>
                      📤
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, '50g')}
                        style={{ display: 'none' }}
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label>100g Image URL</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={formData.image_100g}
                      onChange={(e) => setFormData({ ...formData, image_100g: e.target.value })}
                      placeholder="Paste URL or upload"
                      style={{ flex: 1 }}
                    />
                    <label className="btn-upload-small" style={{ margin: 0, cursor: 'pointer', padding: '0.5rem', backgroundColor: 'var(--color-gold)', color: 'var(--color-black)', borderRadius: '4px', fontSize: '0.9rem' }}>
                      📤
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, '100g')}
                        style={{ display: 'none' }}
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>200g Image URL</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={formData.image_200g}
                      onChange={(e) => setFormData({ ...formData, image_200g: e.target.value })}
                      placeholder="Paste URL or upload"
                      style={{ flex: 1 }}
                    />
                    <label className="btn-upload-small" style={{ margin: 0, cursor: 'pointer', padding: '0.5rem', backgroundColor: 'var(--color-gold)', color: 'var(--color-black)', borderRadius: '4px', fontSize: '0.9rem' }}>
                      📤
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, '200g')}
                        style={{ display: 'none' }}
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label>500g Image URL</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={formData.image_500g}
                      onChange={(e) => setFormData({ ...formData, image_500g: e.target.value })}
                      placeholder="Paste URL or upload"
                      style={{ flex: 1 }}
                    />
                    <label className="btn-upload-small" style={{ margin: 0, cursor: 'pointer', padding: '0.5rem', backgroundColor: 'var(--color-gold)', color: 'var(--color-black)', borderRadius: '4px', fontSize: '0.9rem' }}>
                      📤
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, '500g')}
                        style={{ display: 'none' }}
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price 50g *</label>
                  <input
                    type="number"
                    value={formData.price_50g}
                    onChange={(e) => setFormData({ ...formData, price_50g: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price 100g *</label>
                  <input
                    type="number"
                    value={formData.price_100g}
                    onChange={(e) => setFormData({ ...formData, price_100g: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price 200g *</label>
                  <input
                    type="number"
                    value={formData.price_200g}
                    onChange={(e) => setFormData({ ...formData, price_200g: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price 500g *</label>
                  <input
                    type="number"
                    value={formData.price_500g}
                    onChange={(e) => setFormData({ ...formData, price_500g: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Highlights (comma separated) *</label>
                <textarea
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  required
                  rows={2}
                  placeholder="Premium quality, Hand-ground, Traditional recipe"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)} disabled={saving}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? '⏳ Saving...' : (editingProduct ? '✅ Update Product' : '➕ Add Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
