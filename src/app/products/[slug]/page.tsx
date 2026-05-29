'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { apiClient } from '@/lib/api/client';
import { useCartStore } from '@/lib/stores/cart-store';
import type {
  StorefrontProductDetail,
  StorefrontVariant,
} from '@/lib/api/types';
import {
  buildAddToCartPayload,
  formatPrice,
  formatPriceRange,
  getProductImage,
  hasPriceRange,
  isBundle,
  isProductAvailable,
  pickDefaultVariant,
} from '@/lib/api/helpers';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<StorefrontProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<StorefrontVariant | null>(null);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const detail = await apiClient.getProduct(slug);
        setProduct(detail);
        setSelectedVariant(pickDefaultVariant(detail.variants));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const images = useMemo(() => {
    if (!product) return ['/placeholder-product.png'];
    // Prefer variant images when picking a variant
    const variantImages = selectedVariant?.images ?? [];
    if (variantImages.length > 0) return variantImages;
    return product.images.length > 0 ? product.images : ['/placeholder-product.png'];
  }, [product, selectedVariant]);

  const displayPrice = useMemo(() => {
    if (!product) return '';
    if (selectedVariant) {
      const num =
        typeof selectedVariant.price === 'number'
          ? selectedVariant.price
          : parseFloat(String(selectedVariant.price));
      return formatPrice(Number.isFinite(num) ? num : 0);
    }
    return hasPriceRange(product) ? formatPriceRange(product) : formatPrice(0);
  }, [product, selectedVariant]);

  const handleAddToCart = async () => {
    if (!product || !isProductAvailable(product) || isAdding) return;

    setIsAdding(true);
    try {
      let payload;
      if (isBundle(product)) {
        payload = buildAddToCartPayload(product, quantity);
      } else {
        if (!selectedVariant) {
          throw new Error('Pilih varian terlebih dahulu');
        }
        payload = buildAddToCartPayload(product, quantity, selectedVariant.id);
      }
      await addItem(payload);
    } catch (err) {
      console.error('Failed to add to cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-destructive">{error || 'Product not found'}</p>
        </div>
      </div>
    );
  }

  const available = isProductAvailable(product);
  const showVariants = !isBundle(product) && (product.variants?.length ?? 0) > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <Image
              src={images[selectedImage] || '/placeholder-product.png'}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
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

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-muted rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <h1
              className="text-3xl md:text-4xl font-bold text-foreground mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {product.name}
            </h1>
            <p className="text-sm text-muted-foreground capitalize">
              {isBundle(product) ? 'Bundle' : product.item_type}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span
              className="text-3xl font-bold text-primary"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {displayPrice}
            </span>
          </div>

          {/* Description */}
          {(product.rich_description || product.description) && (
            <div className="prose prose-sm max-w-none">
              {product.rich_description ? (
                <div
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: product.rich_description }}
                />
              ) : (
                <p className="text-muted-foreground">{product.description}</p>
              )}
            </div>
          )}

          {/* Variant Selector */}
          {showVariants && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Choose variant</label>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((variant) => {
                  const isActive = selectedVariant?.id === variant.id;
                  const variantPrice =
                    typeof variant.price === 'number'
                      ? variant.price
                      : parseFloat(String(variant.price));
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => {
                        setSelectedVariant(variant);
                        setSelectedImage(0);
                      }}
                      disabled={variant.is_active === false}
                      className={`text-left p-3 rounded-lg border transition-colors ${
                        isActive
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/40'
                      } ${variant.is_active === false ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="text-sm font-medium text-foreground line-clamp-1">
                        {variant.fullname || variant.name || `Variant ${variant.id}`}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatPrice(Number.isFinite(variantPrice) ? variantPrice : 0)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Quantity</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-6 text-lg font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            disabled={!available || isAdding || (showVariants && !selectedVariant)}
            size="lg"
            className="w-full bg-primary hover:bg-primary-hover text-on-primary"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {isAdding ? 'Adding…' : available ? 'Add to Cart' : 'Out of Stock'}
          </Button>

          {/* Availability */}
          <div className="flex items-center gap-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${available ? 'bg-accent' : 'bg-muted-foreground'}`} />
            <span className={available ? 'text-accent' : 'text-muted-foreground'}>
              {available ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
