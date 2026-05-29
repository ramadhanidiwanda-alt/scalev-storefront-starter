'use client';

import { useEffect, useState } from 'react';
import { ProductGrid } from '@/components/product/product-grid';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { apiClient } from '@/lib/api/client';
import type { Product } from '@/lib/api/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await apiClient.getProducts({ per_page: 20 });
      setProducts(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await apiClient.getProducts({ per_page: 20 });
        setProducts(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 
          className="text-3xl md:text-4xl font-bold text-foreground mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          All Products
        </h1>
        <p className="text-muted-foreground">
          Discover our collection of quality products
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="mx-auto max-w-2xl rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
          <h2 className="mb-2 text-xl font-semibold text-foreground">Products belum bisa dimuat</h2>
          <p className="mb-4 text-sm text-muted-foreground">{error}</p>
          <Button onClick={fetchProducts}>Coba lagi</Button>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
