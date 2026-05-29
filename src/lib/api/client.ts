import type {
  Product,
  StorefrontProductDetail,
  StorefrontItemListResponse,
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
  ApiResponse,
  ApiError,
} from './types';

// Extend window type for env fallback (Next.js Turbopack workaround)
declare global {
  interface Window {
    __ENV__?: {
      NEXT_PUBLIC_SCALEV_API_BASE?: string;
      NEXT_PUBLIC_SCALEV_STORE_ID?: string;
      NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY?: string;
    };
  }
}

const GUEST_TOKEN_KEY = 'scalev_guest_token';
const AUTH_TOKENS_KEY = 'scalev_auth_tokens';
const GUEST_TOKEN_HEADER = 'x-scalev-guest-token';

class ScalevApiClient {
  private baseUrl: string;
  private storeId: string | undefined;
  private apiKey: string | undefined;

  constructor() {
    const isBrowser = typeof window !== 'undefined';
    const env = isBrowser ? window.__ENV__ : undefined;

    const API_BASE =
      env?.NEXT_PUBLIC_SCALEV_API_BASE ||
      (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SCALEV_API_BASE : undefined) ||
      'https://api.scalev.com';
    const STORE_ID =
      env?.NEXT_PUBLIC_SCALEV_STORE_ID ||
      (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SCALEV_STORE_ID : undefined);
    const API_KEY =
      env?.NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY ||
      (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY : undefined);

    this.baseUrl = STORE_ID ? `${API_BASE}/v3/stores/${STORE_ID}` : '';
    this.storeId = STORE_ID;
    this.apiKey = API_KEY;
  }

  private checkCredentials() {
    if (!this.storeId || !this.apiKey) {
      throw new Error(
        'Scalev API credentials not configured. Set NEXT_PUBLIC_SCALEV_STORE_ID and NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY.'
      );
    }
  }

  private getHeaders(includeAuth = false): Record<string, string> {
    this.checkCredentials();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Scalev-Storefront-Api-Key': this.apiKey!,
    };

    if (typeof window !== 'undefined') {
      const guestToken = localStorage.getItem(GUEST_TOKEN_KEY);
      if (guestToken) {
        headers['X-Scalev-Guest-Token'] = guestToken;
      }

      if (includeAuth) {
        const authTokens = localStorage.getItem(AUTH_TOKENS_KEY);
        if (authTokens) {
          try {
            const tokens: AuthTokens = JSON.parse(authTokens);
            headers['Authorization'] = `Bearer ${tokens.access_token}`;
          } catch {
            // Ignore corrupted token
          }
        }
      }
    }

    return headers;
  }

  /**
   * Persist guest token returned by the API (header `x-scalev-guest-token`).
   */
  private captureGuestToken(response: Response) {
    if (typeof window === 'undefined') return;
    const token = response.headers.get(GUEST_TOKEN_HEADER);
    if (token) {
      localStorage.setItem(GUEST_TOKEN_KEY, token);
    }
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
    const timeoutId =
      typeof window !== 'undefined' && controller
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
          ...((options.headers as Record<string, string>) || {}),
        },
      });

      this.captureGuestToken(response);

      if (!response.ok) {
        const error = (await response.json().catch(() => null)) as
          | (ApiError & { error?: string })
          | null;
        throw new Error(
          error?.message || error?.error || `API request failed (${response.status})`
        );
      }

      // Handle empty responses (DELETE)
      if (response.status === 204) {
        return undefined as T;
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new Error('Scalev API request timeout. Check your network and credentials.');
      }
      console.error('API request error:', error);
      throw error;
    } finally {
      if (typeof window !== 'undefined' && timeoutId) {
        window.clearTimeout(timeoutId);
      }
    }
  }

  // ==========================================================================
  // Catalog (items / products)
  // ==========================================================================

  async getProducts(params?: {
    per_page?: number;
    cursor?: string;
    direction?: 'next' | 'previous';
    category_id?: number | string;
    search?: string;
  }): Promise<StorefrontItemListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.cursor) queryParams.append('cursor', params.cursor);
    if (params?.direction) queryParams.append('direction', params.direction);
    if (params?.category_id) queryParams.append('category_id', params.category_id.toString());
    if (params?.search) queryParams.append('search', params.search);

    const query = queryParams.toString();
    return this.request<StorefrontItemListResponse>(
      `/public/items${query ? `?${query}` : ''}`
    );
  }

  async getProduct(slug: string): Promise<StorefrontProductDetail> {
    return this.request<StorefrontProductDetail>(`/public/products/${slug}`);
  }

  // ==========================================================================
  // Cart (guest)
  // ==========================================================================

  async getCart(): Promise<Cart> {
    return this.request<Cart>('/public/cart');
  }

  async addToCart(payload: AddToCartPayload): Promise<Cart> {
    return this.request<Cart>('/public/cart/items', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async updateCartItem(
    itemId: number | string,
    payload: UpdateCartItemPayload
  ): Promise<Cart> {
    return this.request<Cart>(`/public/cart/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  }

  async removeCartItem(itemId: number | string): Promise<Cart | void> {
    return this.request<Cart | void>(`/public/cart/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  // ==========================================================================
  // Locations
  // ==========================================================================

  async getProvinces(): Promise<ApiResponse<Province[]>> {
    return this.request<ApiResponse<Province[]>>('/public/locations/provinces');
  }

  async getCities(provinceId: number): Promise<ApiResponse<City[]>> {
    return this.request<ApiResponse<City[]>>(`/public/locations/cities?province_id=${provinceId}`);
  }

  async getSubdistricts(cityId: number): Promise<ApiResponse<Subdistrict[]>> {
    return this.request<ApiResponse<Subdistrict[]>>(`/public/locations/subdistricts?city_id=${cityId}`);
  }

  // ==========================================================================
  // Shipping
  // ==========================================================================

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

  // ==========================================================================
  // Payment
  // ==========================================================================

  async getPaymentMethods(): Promise<ApiResponse<PaymentMethod[]>> {
    return this.request<ApiResponse<PaymentMethod[]>>('/public/payment-methods');
  }

  // ==========================================================================
  // Checkout
  // ==========================================================================

  async checkout(payload: CheckoutPayload): Promise<ApiResponse<Order>> {
    return this.request<ApiResponse<Order>>('/public/checkout', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // ==========================================================================
  // Orders
  // ==========================================================================

  async getOrder(secretSlug: string): Promise<ApiResponse<Order>> {
    return this.request<ApiResponse<Order>>(`/public/orders/${secretSlug}`);
  }

  // ==========================================================================
  // Auth
  // ==========================================================================

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

  // ==========================================================================
  // Guest Token Management
  // ==========================================================================

  initGuestToken(): void {
    // Scalev API issues guest tokens via response headers automatically.
    // No-op kept for backwards compatibility.
  }

  clearGuestToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(GUEST_TOKEN_KEY);
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
  clearGuestToken: () => getApiClient().clearGuestToken(),
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
