# AGENTS.md

This file provides guidance on how to work with the Scalev Storefront Starter repository.

## Project Overview

Scalev Storefront Starter is a modern e-commerce storefront built with Next.js 15 (App Router), TypeScript, and Tailwind CSS. It integrates with the Scalev API v3 for product catalog, cart management, and checkout functionality.

## General Guidelines

- Always use `npm` (not yarn or pnpm)
- Follow Next.js 15 App Router conventions
- All API types must align with Scalev OpenAPI spec: https://api-openapi.scalev.com/specs/v3/openapi.json
- Use helper functions from `src/lib/api/helpers.ts` for type-safe data access
- Environment variables are managed via `.env.local` (gitignored)
- Vercel is used for deployment (production + preview environments)

## Essential Commands

### Development
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix linting issues
```

### Building
Always build before committing to verify TypeScript and build errors:
```bash
npm run build
```

### Code Quality
- `npm run lint` - Lint code with ESLint
- TypeScript type checking runs automatically during build

Always run build before committing code to ensure quality.

## Architecture Overview

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── products/          # Product listing & detail pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout flow
│   └── order/             # Order confirmation
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── product/          # Product-specific components
│   ├── cart/             # Cart-specific components
│   └── providers/        # Context providers
├── lib/                   # Utilities and business logic
│   ├── api/              # Scalev API client & types
│   │   ├── client.ts     # API client with auto guest token capture
│   │   ├── types.ts      # TypeScript types aligned with OpenAPI
│   │   └── helpers.ts    # Type-safe accessor functions
│   └── stores/           # Zustand state management
└── styles/               # Global styles and Tailwind config
```

### Key Architectural Patterns

1. **API Client Pattern**: Centralized API client with automatic guest token management
2. **Discriminated Unions**: Product types use discriminated unions (`entity_type: 'product' | 'bundle_price_option'`)
3. **Helper Functions**: Type-safe accessors for API data (e.g., `getProductPrice()`, `formatPrice()`)
4. **State Management**: Zustand for cart and auth state
5. **Server Components**: Use React Server Components where possible, Client Components only when needed

## Technology Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS + Shadcn UI components
- **State Management:** Zustand (cart, auth)
- **API Integration:** Scalev API v3 (REST)
- **Deployment:** Vercel (auto-deploy from GitHub)
- **Image Optimization:** Next.js Image with CDN support

## Key Development Patterns

### Scalev API Integration

#### Type Alignment
All types in `src/lib/api/types.ts` must match the Scalev OpenAPI spec. Key patterns:

```typescript
// Discriminated union for products vs bundles
export type Product = StorefrontProductCard | StorefrontBundlePriceOptionCard;

// Price range (not single price)
export interface PriceRange {
  min: string | number;
  max: string | number;
}

// Use in_stock, not is_available
export interface StorefrontProductCard {
  entity_type: 'product';
  in_stock: boolean;
  price_range: PriceRange;
  // ...
}
```

#### Helper Functions
Always use helpers from `src/lib/api/helpers.ts` instead of direct property access:

```typescript
import { getProductPrice, formatPrice, isBundle } from '@/lib/api/helpers';

// ✅ Good
const price = getProductPrice(product);
const formatted = formatPrice(price);

// ❌ Bad - direct access can fail
const price = product.price; // This field doesn't exist!
```

#### Guest Token Management
The API client automatically captures and stores guest tokens from response headers:

```typescript
// No manual token management needed
const cart = await apiClient.getCart(); // Token handled automatically
```

### TypeScript Best Practices

- **NEVER use `any` type** - use proper types or `unknown`
- **Avoid type casting with `as`** unless absolutely necessary
- **Use discriminated unions** for polymorphic data (e.g., Product types)
- **Use type guards** from helpers (e.g., `isBundle()`, `isProduct()`)

### Component Patterns

#### Product Cards
- **Variant-based products**: Entire card clickable → detail page
- **Bundles**: Show "Add to cart" button (direct add from card)

```typescript
const isBundleProduct = isBundle(product);

if (isBundleProduct) {
  // Show add to cart button
} else {
  // Make card clickable to detail page
}
```

#### Image Optimization
Always use Next.js Image component with proper configuration:

```typescript
import Image from 'next/image';

<Image
  src={imageUrl}
  alt={product.name}
  fill
  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
/>
```

Ensure `next.config.ts` includes CDN domains:
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.scalev.id',
      pathname: '/uploads/**',
    },
  ],
}
```

### Error Handling

- Use try-catch for async operations
- Display user-friendly error messages
- Log errors to console for debugging
- Provide retry mechanisms for failed API calls

### Frontend Development

- **All UI text should be clear and user-friendly**
- **Use Tailwind CSS variables** - never hardcode colors or spacing
- **Follow Shadcn UI patterns** for consistent component styling
- **Responsive design** - mobile-first approach

### Testing Guidelines

- **Build before committing** - `npm run build` catches type errors
- **Test in development** - `npm run dev` for local testing
- **Test Vercel previews** - verify changes in preview deployments
- **Manual testing checklist**:
  - Product listing loads correctly
  - Product detail page shows variants
  - Add to cart works
  - Cart updates correctly
  - Checkout flow completes

## Common Development Tasks

### Adding a New API Endpoint

1. Check Scalev OpenAPI spec for endpoint schema
2. Add types to `src/lib/api/types.ts`
3. Add method to `src/lib/api/client.ts`
4. Add helper functions to `src/lib/api/helpers.ts` if needed
5. Use in components

Example:
```typescript
// 1. Add type
export interface Order {
  id: number;
  status: string;
  // ...
}

// 2. Add client method
async getOrder(orderId: string): Promise<Order> {
  return this.request(`/public/orders/${orderId}`);
}

// 3. Use in component
const order = await apiClient.getOrder(orderId);
```

### Adding a New Page

1. Create page in `src/app/[route]/page.tsx`
2. Use Server Component by default
3. Add 'use client' only if needed (state, effects, etc.)
4. Follow existing page patterns

### Updating Product Display Logic

1. Check if change affects type definitions
2. Update helpers in `src/lib/api/helpers.ts`
3. Update components using those helpers
4. Test with both products and bundles

### Environment Variables

Required variables in `.env.local`:
```bash
NEXT_PUBLIC_SCALEV_STORE_ID=store_xxx
NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY=sfpk_xxx
```

For Vercel deployments, set these in:
- **Production**: Vercel Dashboard → Settings → Environment Variables → Production
- **Preview**: Same location → Preview (enable for all preview branches)

## File Creation Rules

### ❌ DO NOT create markdown (.md) files unless:
1. User explicitly requests it
2. You asked permission AND user gave approval

### ✅ Existing essential MD files (allowed):
- `README.md` - Main documentation
- `CONTRIBUTING.md` - Contribution guidelines  
- `CODE_OF_CONDUCT.md` - Community guidelines
- `SECURITY.md` - Security policies
- `LICENSE` - License file
- `SETUP_GUIDE.md` - Setup instructions
- `AGENTS.md` - This file
- `CLAUDE.md` - Claude-specific instructions

### 📋 If you need to share information:
- **Put it directly in the chat response**, not in a new MD file
- Use code blocks for code examples
- Use markdown formatting for clarity
- Only suggest creating a file if it's truly needed long-term

### 🚫 Never create these without permission:
- Summary files (FINAL_*, SUMMARY_*, COMPLETE_*)
- Analysis files (BUG_ANALYSIS_*, INVESTIGATION_*)
- Status files (STATUS_*, READY_*)
- Question files (QUESTIONS_*, NOTES_*)
- Implementation files (IMPLEMENTATION_*)
- Deployment files (DEPLOYMENT_*) unless user asks
- Any *.txt files unless user asks

### ✅ Always allowed (no permission needed):
- Source code files (.ts, .tsx, .js, .jsx, .css)
- Configuration files (.json, .yaml, .toml)
- Updates to existing essential MD files (with user awareness)

## Communication Rules

- Respond in chat, not in files
- Use chat formatting (headers, bullets, code blocks)
- Save files only for actual project deliverables
- Ask before creating any new documentation file

## Vercel Deployment

### Preview Deployments
- Automatic preview for every PR
- Preview URL format: `https://[project]-[hash]-[team].vercel.app`
- Environment variables must be configured for Preview environment
- Allowlist preview domains in Scalev dashboard: `*.vercel.app`

### Production Deployment
- Auto-deploy from `main` branch
- Production URL: https://scalev-storefront-starter.vercel.app
- Environment variables configured separately for Production

### Deployment Checklist
1. ✅ Build passes locally (`npm run build`)
2. ✅ Environment variables set in Vercel
3. ✅ Preview domain allowlisted in Scalev
4. ✅ Test preview deployment
5. ✅ Merge to main
6. ✅ Verify production deployment

## Git Workflow

### Branch Naming
- Feature: `feat/description`
- Bug fix: `fix/description`
- Refactor: `refactor/description`

### Commit Messages
Follow conventional commits:
```
feat: add product filtering
fix: resolve cart total calculation
refactor: simplify price helpers
docs: update API integration guide
```

### Pull Requests
- Create draft PR early for feedback
- Link to related issues
- Describe what changed and why
- Include testing notes
- Request review when ready

## Next.js 15 Specific Notes

This project uses Next.js 15 with App Router. Key differences from older versions:

- **Server Components by default** - add 'use client' only when needed
- **Async Server Components** - can fetch data directly
- **Metadata API** - use `generateMetadata()` for SEO
- **Route Handlers** - use `app/api/` for API routes
- **Parallel Routes** - use `@folder` convention

Always check Next.js 15 docs when implementing new features, as patterns may differ from training data.

## Scalev API Specifics

### Authentication
- **Guest users**: Automatic guest token via response headers
- **Authenticated users**: JWT tokens stored in localStorage
- **Token refresh**: Handled automatically by client

### Pagination
- Cursor-based pagination (not page numbers)
- Use `cursor` and `direction` params
- Response includes `next_cursor` and `previous_cursor`

### Product Types
- **Products**: Have variants, require detail page for selection
- **Bundles**: Single SKU, can add to cart directly
- Use `entity_type` discriminator to distinguish

### Cart Behavior
- Guest carts persist via guest token
- Cart merges on login
- Cart items use discriminated union (variant vs bundle)

## Troubleshooting

### Common Issues

**Images not loading:**
- Check `next.config.ts` has correct `remotePatterns`
- Verify CDN domain is allowlisted

**API calls failing:**
- Check environment variables are set
- Verify Scalev API key is valid
- Check domain is allowlisted in Scalev dashboard

**Type errors:**
- Run `npm run build` to see full error details
- Check types match OpenAPI spec
- Use helper functions instead of direct access

**Preview deployment missing env vars:**
- Set env vars in Vercel dashboard
- Enable for "Preview" environment
- Redeploy preview (push new commit)

## Resources

- **Scalev API Docs**: https://api-openapi.scalev.com/specs/v3/openapi.json
- **Next.js 15 Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Shadcn UI**: https://ui.shadcn.com
- **Vercel Docs**: https://vercel.com/docs

## Getting Help

When asking for help or reporting issues:
1. Describe what you're trying to do
2. Show the error message or unexpected behavior
3. Share relevant code snippets
4. Mention what you've already tried
5. Include environment (local dev, preview, production)
