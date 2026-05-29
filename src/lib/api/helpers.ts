import type {
  Product,
  StorefrontProductCard,
  StorefrontBundlePriceOptionCard,
  StorefrontVariant,
  AddToCartPayload,
} from './types';

/**
 * Coerce string|number price into a finite number (0 fallback).
 */
function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const parsed = typeof value === 'number' ? value : parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function getProductMinPrice(product: Product): number {
  return toNumber(product.price_range?.min);
}

export function getProductMaxPrice(product: Product): number {
  return toNumber(product.price_range?.max);
}

export function getProductPrice(product: Product): number {
  return getProductMinPrice(product);
}

export function hasPriceRange(product: Product): boolean {
  return getProductMinPrice(product) !== getProductMaxPrice(product);
}

export function formatPrice(price: number): string {
  return `Rp ${price.toLocaleString('id-ID')}`;
}

export function formatPriceRange(product: Product): string {
  const min = getProductMinPrice(product);
  const max = getProductMaxPrice(product);
  if (min === max) return formatPrice(min);
  return `${formatPrice(min)} – ${formatPrice(max)}`;
}

const PLACEHOLDER_IMAGE = '/placeholder-product.png';

export function getProductImage(product: Product | StorefrontVariant): string {
  return product.images?.[0] || PLACEHOLDER_IMAGE;
}

export function isProductAvailable(product: Product): boolean {
  return product.in_stock === true;
}

export function isBundle(
  product: Product
): product is StorefrontBundlePriceOptionCard {
  return product.entity_type === 'bundle_price_option';
}

export function isProduct(
  product: Product
): product is StorefrontProductCard {
  return product.entity_type === 'product';
}

/**
 * Build an Add to Cart payload that matches the Scalev API discriminated union.
 *
 * - bundle_price_option → uses `bundle_price_option_id`
 * - product (variant-based) → requires `variantId` (fetch detail first)
 */
export function buildAddToCartPayload(
  product: Product,
  quantity: number = 1,
  variantId?: number | string
): AddToCartPayload {
  if (isBundle(product)) {
    return {
      type: 'bundle_price_option',
      bundle_price_option_id: product.bundle_price_option_id,
      quantity,
    };
  }

  if (!variantId) {
    throw new Error(
      'A variant_id is required for product-type items. Open the detail page to pick a variant.'
    );
  }

  return {
    type: 'variant',
    variant_id: variantId,
    quantity,
  };
}

/**
 * Pick a sensible default variant for a product detail page.
 */
export function pickDefaultVariant(
  variants: StorefrontVariant[] | undefined
): StorefrontVariant | null {
  if (!variants || variants.length === 0) return null;
  const active = variants.find((v) => v.is_active !== false);
  return active ?? variants[0];
}
