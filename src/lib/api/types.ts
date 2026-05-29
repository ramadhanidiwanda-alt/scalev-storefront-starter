// Scalev Storefront API v3 Types

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: string;
  compare_at_price?: string;
  images: ProductImage[];
  is_available: boolean;
  variants?: ProductVariant[];
  options?: ProductOption[];
  category?: Category;
}

export interface ProductImage {
  id: number;
  url: string;
  alt?: string;
  position: number;
}

export interface ProductVariant {
  id: number;
  name: string;
  price: string;
  compare_at_price?: string;
  is_available: boolean;
  sku?: string;
  option_values: OptionValue[];
}

export interface ProductOption {
  id: number;
  name: string;
  values: OptionValue[];
}

export interface OptionValue {
  id: number;
  name: string;
  option_id: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: string;
  total: string;
  item_count: number;
}

export interface CartItem {
  id: string;
  product_id: number;
  variant_id?: number;
  quantity: number;
  price: string;
  subtotal: string;
  product: {
    name: string;
    slug: string;
    image?: string;
  };
  variant?: {
    name: string;
  };
}

export interface AddToCartPayload {
  product_id: number;
  variant_id?: number;
  quantity: number;
}

export interface UpdateCartItemPayload {
  quantity: number;
}

export interface CheckoutPayload {
  shipping_address: ShippingAddress;
  shipping_method_id: number;
  payment_method: string;
  notes?: string;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  email: string;
  address: string;
  province_id: number;
  city_id: number;
  subdistrict_id: number;
  postal_code: string;
}

export interface Province {
  id: number;
  name: string;
}

export interface City {
  id: number;
  province_id: number;
  name: string;
  type: string;
}

export interface Subdistrict {
  id: number;
  city_id: number;
  name: string;
}

export interface ShippingMethod {
  id: number;
  name: string;
  description?: string;
  cost: string;
  estimated_days?: string;
}

export interface PaymentMethod {
  code: string;
  name: string;
  description?: string;
  icon?: string;
  fee?: string;
}

export interface Order {
  id: number;
  order_number: string;
  secret_slug: string;
  status: string;
  payment_status: string;
  items: OrderItem[];
  subtotal: string;
  shipping_cost: string;
  total: string;
  shipping_address: ShippingAddress;
  payment_method: string;
  payment_instructions?: PaymentInstructions;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  product_name: string;
  variant_name?: string;
  quantity: number;
  price: string;
  subtotal: string;
  image?: string;
}

export interface PaymentInstructions {
  type: string;
  bank_name?: string;
  account_number?: string;
  account_name?: string;
  amount: string;
  qr_code?: string;
  va_number?: string;
  payment_code?: string;
  expired_at?: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
