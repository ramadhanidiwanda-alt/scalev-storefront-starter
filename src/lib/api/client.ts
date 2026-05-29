import type {
  Product,
  Cart,
  AddToCartPayload,
  UpdateCartItemPayload,
  CheckoutPayload,
  Order,
  Province,
  City,
  Subdistrict,
  ShippingMethod,
  PaymentMethod,
  AuthTokens,
  Customer,
  LoginPayload,
  RegisterPayload,
  PaginatedResponse,
  ApiResponse,
  ApiError,
} from './types';

// Extend window type for env fallback
declare global {
  interface Window {
    __ENV__?: {
      NEXT_PUBLIC_SCALEV_API_BASE?: string;
      NEXT_PUBLIC_SCALEV_STORE_ID?: string;
      NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY?: string;
    };
  }
}

class ScalevApiClient {
  private baseUrl: string;
  private storeId: string | undefined;
  private apiKey: string | undefined;

  constructor() {
    const isBrowser = typeof window !== 'undefined';
    const env = isBrowser ? window.__ENV__ : undefined;
    
    const API_BASE = env?.NEXT_PUBLIC_SCALEV_API_BASE || 
                     (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SCALEV_API_BASE : undefined) ||
                     'https://api.scalev.com';
    const STORE_ID = env?.NEXT_PUBLIC_SCALEV_STORE_ID ||
                     (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SCALEV_STORE_ID : undefined);
    const API_KEY = env?.NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY ||
                    (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY : undefined);
    
    this.baseUrl = STORE_ID ? `${API_BASE}/v3/stores/${STORE_ID}` : '';
    this.storeId = STORE_ID;
    this.apiKey = API_KEY;
  }

  private checkCredentials() {
    if (!this.storeId || !this.apiKey) {
      throw new Error('Scalev API credentials not configured. Please set NEXT_PUBLIC_SCALEV_STORE_ID and NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY in your environment variables.');
    }
  }

  private getHeaders(includeAuth = false): HeadersInit {
    this.checkCredentials();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-Scalev-Storefront-Api-Key': this.apiKey!,
    };

    // Add guest token
    if (typeof window !== 'undefined') {
      const guestToken = localStorage.getItem('scalev_guest_token');
      if (guestToken) {
        headers['X-Scalev-Guest-Token'] = guestToken;
      }
    }

    // Add auth token
    if (includeAuth && typeof window !== 'undefined') {
      const authTokens = localStorage.getItem('scalev_auth_tokens');
      if (authTokens) {
        const tokens: AuthTokens = JSON.parse(authTokens);
        headers['Authorization'] = `Bearer ${tokens.access_token}`;
      }
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    includeAuth = false
  ): Promise<T> {
    this.checkCredentials();
    
    const url = `${this.baseUrl}${endpoint}`;
    const headers = this.getHeaders(includeAuth);
    
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = typeof window !== 'undefined' && controller
      ? window.setTimeout(() => controller.abort(), 15000)
      : null;

    try {
      const response = await fetch(url, {
        ...options,
        mode: 'cors',
        credentials: 'omit',
        signal: options.signal || controller?.signal,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = (await response.json().catch(() => null)) as (ApiError & { error?: string }) | null;
        throw new Error(error?.message || error?.error || `API request failed (${response.status})`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new Error('Scalev API request timeout. Check Storefront API origin and credentials.');
      }

      console.error('API request error:', error);
      throw error;
    } finally {
      if (typeof window !== 'undefined' && timeoutId) {
        window.clearTimeout(timeoutId);
      }
    }
  }

  // Products
  async getProducts(params?: {
    page?: number;
    per_page?: number;
    category_id?: number;
    search?: string;
  }): Promise<PaginatedResponse<Product>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.category_id) queryParams.append('category_id', params.category_id.toString());
    if (params?.search) queryParams.append('search', params.search);

    const query = queryParams.toString();
    return this.request<PaginatedResponse<Product>>(
      `/public/items${query ? `?${query}` : ''}`
    );
  }

  async getProduct(slug: string): Promise<ApiResponse<Product>> {
    return this.request<ApiResponse<Product>>(`/public/products/${slug}`);
  }

  // Cart
  async getCart(): Promise<ApiResponse<Cart>> {
    return this.request<ApiResponse<Cart>>('/public/cart');
  }

  async addToCart(payload: AddToCartPayload): Promise<ApiResponse<Cart>> {
    return this.request<ApiResponse<Cart>>('/public/cart/items', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async updateCartItem(
    itemId: string,
    payload: UpdateCartItemPayload
  ): Promise<ApiResponse<Cart>> {
    return this.request<ApiResponse<Cart>>(`/public/cart/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  }

  async removeCartItem(itemId: string): Promise<ApiResponse<Cart>> {
    return this.request<ApiResponse<Cart>>(`/public/cart/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  // Locations
  async getProvinces(): Promise<ApiResponse<Province[]>> {
    return this.request<ApiResponse<Province[]>>('/public/provinces');
  }

  async getCities(provinceId: number): Promise<ApiResponse<City[]>> {
    return this.request<ApiResponse<City[]>>(`/public/provinces/${provinceId}/cities`);
  }

  async getSubdistricts(cityId: number): Promise<ApiResponse<Subdistrict[]>> {
    return this.request<ApiResponse<Subdistrict[]>>(`/public/cities/${cityId}/subdistricts`);
  }

  // Shipping
  async getShippingMethods(params: {
    subdistrict_id: number;
    weight?: number;
  }): Promise<ApiResponse<ShippingMethod[]>> {
    const queryParams = new URLSearchParams({
      subdistrict_id: params.subdistrict_id.toString(),
    });
    if (params.weight) {
      queryParams.append('weight', params.weight.toString());
    }

    return this.request<ApiResponse<ShippingMethod[]>>(
      `/public/shipping-methods?${queryParams.toString()}`
    );
  }

  // Payment
  async getPaymentMethods(): Promise<ApiResponse<PaymentMethod[]>> {
    return this.request<ApiResponse<PaymentMethod[]>>('/public/payment-methods');
  }

  // Checkout
  async checkout(payload: CheckoutPayload): Promise<ApiResponse<Order>> {
    return this.request<ApiResponse<Order>>('/public/checkout', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // Orders
  async getOrder(secretSlug: string): Promise<ApiResponse<Order>> {
    return this.request<ApiResponse<Order>>(`/public/orders/${secretSlug}`);
  }

  // Auth
  async login(payload: LoginPayload): Promise<ApiResponse<AuthTokens>> {
    return this.request<ApiResponse<AuthTokens>>('/public/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async register(payload: RegisterPayload): Promise<ApiResponse<AuthTokens>> {
    return this.request<ApiResponse<AuthTokens>>('/public/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getCustomer(): Promise<ApiResponse<Customer>> {
    return this.request<ApiResponse<Customer>>('/public/auth/me', {}, true);
  }

  async logout(): Promise<void> {
    await this.request('/public/auth/logout', { method: 'POST' }, true);
  }

  // Guest Token Management
  initGuestToken(): void {
    if (typeof window !== 'undefined') {
      const existingToken = localStorage.getItem('scalev_guest_token');
      if (!existingToken) {
        const guestToken = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('scalev_guest_token', guestToken);
      }
    }
  }

  clearGuestToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('scalev_guest_token');
    }
  }
}

let _apiClient: ScalevApiClient;

function getApiClient() {
  if (!_apiClient) {
    _apiClient = new ScalevApiClient();
  }
  return _apiClient;
}

export const apiClient = {
  initGuestToken: () => getApiClient().initGuestToken(),
  getProducts: (...args: Parameters<ScalevApiClient['getProducts']>) => getApiClient().getProducts(...args),
  getProduct: (...args: Parameters<ScalevApiClient['getProduct']>) => getApiClient().getProduct(...args),
  getCart: (...args: Parameters<ScalevApiClient['getCart']>) => getApiClient().getCart(...args),
  addToCart: (...args: Parameters<ScalevApiClient['addToCart']>) => getApiClient().addToCart(...args),
  updateCartItem: (...args: Parameters<ScalevApiClient['updateCartItem']>) => getApiClient().updateCartItem(...args),
  removeCartItem: (...args: Parameters<ScalevApiClient['removeCartItem']>) => getApiClient().removeCartItem(...args),
  getProvinces: (...args: Parameters<ScalevApiClient['getProvinces']>) => getApiClient().getProvinces(...args),
  getCities: (...args: Parameters<ScalevApiClient['getCities']>) => getApiClient().getCities(...args),
  getSubdistricts: (...args: Parameters<ScalevApiClient['getSubdistricts']>) => getApiClient().getSubdistricts(...args),
  getShippingMethods: (...args: Parameters<ScalevApiClient['getShippingMethods']>) => getApiClient().getShippingMethods(...args),
  getPaymentMethods: (...args: Parameters<ScalevApiClient['getPaymentMethods']>) => getApiClient().getPaymentMethods(...args),
  checkout: (...args: Parameters<ScalevApiClient['checkout']>) => getApiClient().checkout(...args),
  getOrder: (...args: Parameters<ScalevApiClient['getOrder']>) => getApiClient().getOrder(...args),
  login: (...args: Parameters<ScalevApiClient['login']>) => getApiClient().login(...args),
  register: (...args: Parameters<ScalevApiClient['register']>) => getApiClient().register(...args),
  getCustomer: (...args: Parameters<ScalevApiClient['getCustomer']>) => getApiClient().getCustomer(...args),
  logout: (...args: Parameters<ScalevApiClient['logout']>) => getApiClient().logout(...args),
};
