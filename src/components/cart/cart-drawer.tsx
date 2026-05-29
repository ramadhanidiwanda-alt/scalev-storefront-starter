'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/stores/cart-store';
import { CartItem } from './cart-item';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/api/helpers';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

function toNumber(value: string | number | undefined | null): number {
  if (value === undefined || value === null) return 0;
  const parsed = typeof value === 'number' ? value : parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const cart = useCartStore((state) => state.cart);

  const isEmpty = !cart || cart.items.length === 0;
  const total = toNumber(cart?.total);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle style={{ fontFamily: 'var(--font-heading)' }}>
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <Link href="/products" onClick={onClose}>
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border pt-4 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-base font-medium">Total</span>
                <span
                  className="text-lg font-semibold text-primary"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {formatPrice(total)}
                </span>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" onClick={onClose} className="block">
                <Button
                  className="w-full bg-primary hover:bg-primary-hover text-on-primary"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
              </Link>

              {/* Continue Shopping */}
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
