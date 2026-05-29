'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/stores/cart-store';
import type { CartItem as CartItemType } from '@/lib/api/types';
import { formatPrice } from '@/lib/api/helpers';

interface CartItemProps {
  item: CartItemType;
}

/**
 * Best-effort accessor for fields that may exist on the API payload but are
 * not part of the strict OpenAPI shape (additionalProperties: true).
 */
function readField<T>(obj: Record<string, unknown>, key: string): T | undefined {
  const value = obj[key];
  return value as T | undefined;
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

  // Read fields that may come back from the API but aren't strictly typed.
  const itemRecord = item as unknown as Record<string, unknown>;
  const name =
    readField<string>(itemRecord, 'name') ||
    readField<string>(itemRecord, 'product_name') ||
    readField<string>(itemRecord, 'bundle_name') ||
    (item.type === 'bundle_price_option' ? 'Bundle item' : 'Variant item');

  const variantLabel = readField<string>(itemRecord, 'variant_name');

  const image =
    readField<string>(itemRecord, 'image') ||
    readField<string>(itemRecord, 'thumbnail') ||
    (readField<string[]>(itemRecord, 'images') ?? [])[0] ||
    '/placeholder-product.png';

  const unitPriceRaw =
    readField<string | number>(itemRecord, 'price') ??
    readField<string | number>(itemRecord, 'unit_price');
  const subtotalRaw =
    readField<string | number>(itemRecord, 'subtotal') ??
    readField<string | number>(itemRecord, 'total');

  const toNumber = (value: string | number | undefined): number => {
    if (value === undefined) return 0;
    const parsed = typeof value === 'number' ? value : parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const unitPrice = toNumber(unitPriceRaw);
  const subtotal = toNumber(subtotalRaw) || unitPrice * item.quantity;

  return (
    <div className="flex gap-4 p-4 bg-background border border-border rounded-lg">
      {/* Image */}
      <div className="relative w-20 h-20 flex-shrink-0 bg-muted rounded-md overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground line-clamp-2">{name}</h4>

        {variantLabel && (
          <p className="text-xs text-muted-foreground mt-1">{variantLabel}</p>
        )}

        {unitPrice > 0 && (
          <p className="text-sm font-semibold text-primary mt-2">
            {formatPrice(unitPrice)}
          </p>
        )}

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
      {subtotal > 0 && (
        <div className="text-right">
          <p className="text-sm font-semibold text-foreground">
            {formatPrice(subtotal)}
          </p>
        </div>
      )}
    </div>
  );
}
