'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/api/types';
import { useCartStore } from '@/lib/stores/cart-store';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.is_available || isAdding) return;

    setIsAdding(true);
    try {
      await addItem({
        product_id: product.id,
        quantity: 1,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const imageUrl = product.images[0]?.url || '/placeholder-product.png';
  const hasDiscount = product.compare_at_price && parseFloat(product.compare_at_price) > parseFloat(product.price);

  return (
    <Link href={`/products/${product.slug}`}>
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
            {!product.is_available && (
              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                Out of Stock
              </Badge>
            )}
            {hasDiscount && product.is_available && (
              <Badge className="bg-destructive text-white">
                Sale
              </Badge>
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
          <div className="flex items-center gap-2">
            <span 
              className="text-lg font-semibold text-primary"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Rp {parseFloat(product.price).toLocaleString('id-ID')}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                Rp {parseFloat(product.compare_at_price!).toLocaleString('id-ID')}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!product.is_available || isAdding}
            className="w-full bg-primary hover:bg-primary-hover text-on-primary transition-colors duration-150"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Link>
  );
}
