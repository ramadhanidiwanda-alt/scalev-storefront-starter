'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { apiClient } from '@/lib/api/client';
import { useCartStore } from '@/lib/stores/cart-store';
import type { Product } from '@/lib/api/types';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.getProduct(slug);
        setProduct(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product || !product.is_available || isAdding) return;

    setIsAdding(true);
    try {
      await addItem({
        product_id: product.id,
        quantity,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
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

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-destructive">{error || 'Product not found'}</p>
        </div>
      </div>
    );
  }

  const hasDiscount = product.compare_at_price && parseFloat(product.compare_at_price) > parseFloat(product.price);
  const images = product.images.length > 0 ? product.images : [{ id: 0, url: '/placeholder-product.png', position: 0 }];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <Image
              src={images[selectedImage]?.url || '/placeholder-product.png'}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
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

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-muted rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image.url}
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
            {product.category && (
              <p className="text-sm text-muted-foreground">
                Category: {product.category.name}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span 
              className="text-3xl font-bold text-primary"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Rp {parseFloat(product.price).toLocaleString('id-ID')}
            </span>
            {hasDiscount && (
              <span className="text-xl text-muted-foreground line-through">
                Rp {parseFloat(product.compare_at_price!).toLocaleString('id-ID')}
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground">{product.description}</p>
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

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            disabled={!product.is_available || isAdding}
            size="lg"
            className="w-full bg-primary hover:bg-primary-hover text-on-primary"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {isAdding ? 'Adding...' : product.is_available ? 'Add to Cart' : 'Out of Stock'}
          </Button>

          {/* Availability */}
          <div className="flex items-center gap-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${product.is_available ? 'bg-accent' : 'bg-muted-foreground'}`} />
            <span className={product.is_available ? 'text-accent' : 'text-muted-foreground'}>
              {product.is_available ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
