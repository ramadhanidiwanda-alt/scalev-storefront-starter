import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '@/lib/api/client';
import type { Cart, AddToCartPayload } from '@/lib/api/types';

interface CartStore {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCart: () => Promise<void>;
  addItem: (payload: AddToCartPayload) => Promise<void>;
  updateItem: (itemId: number | string, quantity: number) => Promise<void>;
  removeItem: (itemId: number | string) => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: null,
      isLoading: false,
      error: null,

      fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const cart = await apiClient.getCart();
          set({ cart, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch cart',
            isLoading: false,
          });
        }
      },

      addItem: async (payload: AddToCartPayload) => {
        set({ isLoading: true, error: null });
        try {
          const cart = await apiClient.addToCart(payload);
          set({ cart, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to add item',
            isLoading: false,
          });
          throw error;
        }
      },

      updateItem: async (itemId, quantity) => {
        set({ isLoading: true, error: null });
        try {
          const cart = await apiClient.updateCartItem(itemId, { quantity });
          set({ cart, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to update item',
            isLoading: false,
          });
          throw error;
        }
      },

      removeItem: async (itemId) => {
        set({ isLoading: true, error: null });
        try {
          const cart = await apiClient.removeCartItem(itemId);
          // DELETE may return cart or void
          if (cart) {
            set({ cart, isLoading: false });
          } else {
            // Refetch to get updated cart
            const refreshed = await apiClient.getCart();
            set({ cart: refreshed, isLoading: false });
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to remove item',
            isLoading: false,
          });
          throw error;
        }
      },

      clearCart: () => {
        set({ cart: null, error: null });
      },
    }),
    {
      name: 'scalev-cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
