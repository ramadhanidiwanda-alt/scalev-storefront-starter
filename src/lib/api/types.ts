// Scalev Storefront API v3 Types
// Aligned with official OpenAPI spec: https://api-openapi.scalev.com/specs/v3/openapi.json

// ============================================================================
// Common
// ============================================================================

export interface PriceRange {
  min: string | number;
  max: string | number;
}

export interface StorefrontTaxonomy {
  // Open shape - taxonomy details vary
  [key: string]: unknown;
}

// ============================================================================
// Products / Items (catalog list)
// ============================================================================

export interface StorefrontProductCard {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  meta_thumbnail: string | null;
  entity_type: 'product';
  item_type: string;
  is_multiple: boolean | null;
  option1_name: string | null;
  option2_name: string | null;
  option3_name: string | null;
  in_stock: boolean;
  price_range: PriceRange;
  images: string[];
  taxonomy?: StorefrontTaxonomy | null;
  created_at: string | null;
  // Allow additional fields from API (additionalProperties: true)
  [key: string]: unknown;
}

export interface StorefrontBundlePriceOptionCard {
  id: number;
  bundle_price_option_id: number;
  bundle_id: number;
  slug: string;
  name: string;
  description: string | null;
  meta_thumbnail: string | null;
  entity_type: 'bundle_price_option';
  is_multiple: boolean | null;
  option1_name: string | null;
  option2_name: string | null;
  option3_name: string | null;
  in_stock: boolean;
  price_range: PriceRange;
  images: string[];
  taxonomy?: StorefrontTaxonomy | null;
  created_at: string | null;
  [key: string]: unknown;
}

// Discriminated union: product OR bundle_price_option
export type Product = StorefrontProductCard | StorefrontBundlePriceOptionCard;

// ============================================================================
// Product Detail
// ============================================================================

export interface StorefrontVariant {
  id: number;
  uuid: string | null;
  unique_id: string | null;
  sku: string | null;
  name: string | null;
  fullname: string | null;
  description: string | null;
  rich_description: string | null;
  option1_value: string | null;
  option2_value: string | null;
  option3_value: string | null;
  item_type: string;
  currency: string | null;
  price: string | number;
  pricing_type: string | null;
  interval: string | null;
  interval_count: number | null;
  images: string[];
  is_inventory: boolean | null;
  is_active: boolean | null;
  weight: number | null;
  metadata: Record<string, unknown> | null;
}

export interface StorefrontProductDetail extends StorefrontProductCard {
  rich_description: string | null;
  variants: StorefrontVariant[];
}

// ============================================================================
// List Response
// ============================================================================

export interface StorefrontItemListResponse {
  data: Product[];
  is_paginated: true;
  has_next?: boolean;
  has_previous?: boolean;
  next_cursor?: string | null;
  previous_cursor?: string | null;
  page_size?: number;
}

// ============================================================================
// Cart
// ============================================================================

export interface CartVariantItem {
  id: number;
  type: 'variant';
  variant_id: number;
  bundle_price_option_id: number | null;
  quantity: number;
  [key: string]: unknown;
}

export interface CartBundlePriceOptionItem {
  id: number;
  type: 'bundle_price_option';
  variant_id: number | null;
  bundle_price_option_id: number;
  bundle_price_option_slug?: string;
  bundle_price_option_unique_id?: string;
  quantity: number;
  [key: string]: unknown;
}

export type CartItem = CartVariantItem | CartBundlePriceOptionItem;

export interface Cart {
  id: number;
  item_count: number;
  total: string | number;
  items: CartItem[];
  [key: string]: unknown;
}

// ============================================================================
// Add to Cart payload (discriminated union by `type`)
// ============================================================================

export type AddToCartVariantPayload = {
  type: 'variant';
  variant_id: number | string;
  quantity?: number;
};

export type AddToCartBundlePayload = {
  type: 'bundle_price_option';
  bundle_price_option_id: number | string;
  quantity?: number;
};

export type AddToCartPayload = AddToCartVariantPayload | AddToCartBundlePayload;

export interface UpdateCartItemPayload {
  quantity: number;
}

// ============================================================================
// Checkout / Address / Shipping / Payment
// ============================================================================

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

export interface CheckoutPayload {
  shipping_address: ShippingAddress;
  shipping_method_id: number;
  payment_method: string;
  notes?: string;
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

// ============================================================================
// Order
// ============================================================================

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

// ============================================================================
// Auth & Customer
// ============================================================================

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

// ============================================================================
// Generic API responses
// ============================================================================

export interface PaginatedResponse<T> {
  data: T[];
  is_paginated?: boolean;
  has_next?: boolean;
  has_previous?: boolean;
  next_cursor?: string | null;
  previous_cursor?: string | null;
  page_size?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}
