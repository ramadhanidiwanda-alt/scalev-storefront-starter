'use client';

import { useEffect } from 'react';
import { apiClient } from '@/lib/api/client';
import { useCartStore } from '@/lib/stores/cart-store';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    // Initialize guest token
    apiClient.initGuestToken();

    // Fetch cart on mount
    fetchCart();
  }, [fetchCart]);

  return <>{children}</>;
}
