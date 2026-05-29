# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Scalev API v3 integration with OpenAPI spec alignment
- Helper functions for type-safe data access (`src/lib/api/helpers.ts`)
- Automatic guest token capture from API response headers
- Product listing page with bundle filtering
- Product detail page with variant selection
- Shopping cart with discriminated union types
- Checkout flow with address and shipping selection
- Comprehensive AGENTS.md documentation
- Next.js Image optimization for Scalev CDN

### Changed
- Product types now use discriminated unions (`entity_type: 'product' | 'bundle_price_option'`)
- Price structure changed from single `price` to `price_range` (min/max)
- Availability field changed from `is_available` to `in_stock`
- Cart structure updated to match Scalev API v3 response format
- Product cards now differentiate between variant products (clickable to detail) and bundles (direct add to cart)

### Fixed
- Product price display showing NaN
- Add to cart functionality for both products and bundles
- Cart total calculation using correct field (`cart.total` instead of `cart.subtotal`)
- Product card navigation to detail page
- Image loading from Scalev CDN
- Type safety across all API interactions
- Checkout location API endpoints (provinces, cities, subdistricts) returning 404

### Infrastructure
- Vercel preview deployments configured with environment variables
- Scalev CDN domain allowlisted for Next.js Image optimization
- Build and TypeScript type checking passes

## [0.1.0] - 2026-05-29

### Added
- Initial project setup with Next.js 15 (App Router)
- TypeScript configuration
- Tailwind CSS with Shadcn UI components
- Zustand state management for cart and auth
- Basic Scalev API client
- Product listing and detail pages
- Shopping cart functionality
- Checkout flow
- Order confirmation page
- Vercel deployment configuration

[Unreleased]: https://github.com/ramadhanidiwanda-alt/scalev-storefront-starter/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/ramadhanidiwanda-alt/scalev-storefront-starter/releases/tag/v0.1.0
