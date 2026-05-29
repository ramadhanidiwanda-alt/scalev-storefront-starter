'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/stores/cart-store';
import { CartItem } from './cart-item';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const cart = useCartStore((state) => state.cart);
  const isLoading = useCartStore((state) => state.isLoading);

  const isEmpty = !cart || cart.items.length === 0;

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
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-base font-medium">Subtotal</span>
                <span 
                  className="text-lg font-semibold text-primary"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Rp {parseFloat(cart.subtotal).toLocaleString('id-ID')}
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
