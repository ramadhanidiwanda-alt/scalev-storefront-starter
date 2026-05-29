'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/api/types';
import { useCartStore } from '@/lib/stores/cart-store';
import {
  buildAddToCartPayload,
  formatPrice,
  formatPriceRange,
  getProductImage,
  getProductMinPrice,
  hasPriceRange,
  isBundle,
  isProductAvailable,
} from '@/lib/api/helpers';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const available = isProductAvailable(product);
  const imageUrl = getProductImage(product);
  const showRange = hasPriceRange(product);
  const minPrice = getProductMinPrice(product);
  const detailHref = `/products/${product.slug}`;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!available || isAdding) return;

    // Variant-based products require picking a variant first.
    if (!isBundle(product)) {
      router.push(detailHref);
      return;
    }

    setIsAdding(true);
    try {
      const payload = buildAddToCartPayload(product, 1);
      await addItem(payload);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const ctaLabel = (() => {
    if (!available) return 'Out of stock';
    if (isAdding) return 'Adding…';
    if (!isBundle(product)) return 'View options';
    return 'Add to cart';
  })();

  return (
    <Link href={detailHref}>
      <div className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-primary transition-colors duration-150">
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {!available && (
              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                Out of Stock
              </Badge>
            )}
            {isBundle(product) && available && (
              <Badge className="bg-primary text-on-primary">Bundle</Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Product Name */}
          <h3
            className="text-base font-medium text-foreground line-clamp-2 min-h-[3rem]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-lg font-semibold text-primary"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {showRange ? formatPriceRange(product) : formatPrice(minPrice)}
            </span>
            {showRange && (
              <span className="text-xs text-muted-foreground">From</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!available || isAdding}
            className="w-full bg-primary hover:bg-primary-hover text-on-primary transition-colors duration-150"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {ctaLabel}
          </Button>
        </div>
      </div>
    </Link>
  );
}
