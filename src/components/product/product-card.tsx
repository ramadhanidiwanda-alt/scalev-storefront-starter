'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/stores/cart-store';
import type { Product } from '@/lib/api/types';
import {
  getProductMinPrice,
  getProductImage,
  isProductAvailable,
  hasPriceRange,
  formatPrice,
  formatPriceRange,
  isBundle,
  buildAddToCartPayload,
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

  // For variant-based products, entire card is clickable to detail page
  // For bundles, show add to cart button
  const isBundleProduct = isBundle(product);

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
            {isBundleProduct && available && (
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

          {/* Action Button */}
          {isBundleProduct ? (
            // Bundle: Show add to cart button
            <Button
              onClick={handleAddToCart}
              disabled={!available || isAdding}
              className="w-full bg-primary hover:bg-primary-hover text-on-primary transition-colors duration-150"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {isAdding ? 'Adding...' : 'Add to cart'}
            </Button>
          ) : (
            // Product with variants: Show view details text (card itself is clickable via Link)
            <div className="w-full py-2 px-4 text-center text-sm font-medium text-primary border border-primary rounded-md group-hover:bg-primary group-hover:text-on-primary transition-colors duration-150">
              View Details
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
