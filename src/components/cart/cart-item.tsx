'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/stores/cart-store';
import type { CartItem as CartItemType } from '@/lib/api/types';
import { useState } from 'react';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const updateItem = useCartStore((state) => state.updateItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || isUpdating) return;

    setIsUpdating(true);
    try {
      await updateItem(item.id, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      await removeItem(item.id);
    } catch (error) {
      console.error('Failed to remove item:', error);
      setIsUpdating(false);
    }
  };

  const imageUrl = item.product.image || '/placeholder-product.png';

  return (
    <div className="flex gap-4 p-4 bg-background border border-border rounded-lg">
      {/* Image */}
      <div className="relative w-20 h-20 flex-shrink-0 bg-muted rounded-md overflow-hidden">
        <Image
          src={imageUrl}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Product Name */}
        <h4 className="text-sm font-medium text-foreground line-clamp-2">
          {item.product.name}
        </h4>

        {/* Variant */}
        {item.variant && (
          <p className="text-xs text-muted-foreground mt-1">
            {item.variant.name}
          </p>
        )}

        {/* Price */}
        <p className="text-sm font-semibold text-primary mt-2">
          Rp {parseFloat(item.price).toLocaleString('id-ID')}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              disabled={isUpdating}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleRemove}
            disabled={isUpdating}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="text-right">
        <p className="text-sm font-semibold text-foreground">
          Rp {parseFloat(item.subtotal).toLocaleString('id-ID')}
        </p>
      </div>
    </div>
  );
}
