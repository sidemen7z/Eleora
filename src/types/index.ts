export interface Product {
  id: number;
  name: string;
  short_name: string;
  description: string;
  use_case: string;
  image_url: string;
  prices: {
    '50g': number;
    '100g': number;
    '200g': number;
    '500g': number;
  };
  size_images?: {
    '50g'?: string;
    '100g'?: string;
    '200g'?: string;
    '500g'?: string;
  };
  highlights: string[] | string;
  is_active: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  size: '50g' | '100g' | '200g' | '500g';
  quantity: number;
  price: number;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  is_admin: boolean;
}

export interface Order {
  id: number;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: string;
  created_at: string;
}
