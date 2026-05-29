'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/stores/cart-store';
import { CartItem } from '@/components/cart/cart-item';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const isLoading = useCartStore((state) => state.isLoading);
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const isEmpty = !cart || cart.items.length === 0;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto" />
          <h1 
            className="text-2xl font-bold text-foreground"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Your cart is empty
          </h1>
          <p className="text-muted-foreground">
            Add some products to get started
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-primary hover:bg-primary-hover text-on-primary">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 
        className="text-3xl font-bold text-foreground mb-8"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-border rounded-lg p-6 sticky top-24">
            <h2 
              className="text-xl font-semibold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">
                  Rp {parseFloat(cart.subtotal).toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">Calculated at checkout</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span 
                  className="text-xl font-bold text-primary"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Rp {parseFloat(cart.total).toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <Link href="/checkout" className="block mb-3">
              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary-hover text-on-primary"
              >
                Proceed to Checkout
              </Button>
            </Link>

            <Link href="/products" className="block">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
