# 🛍️ Scalev Storefront Starter - Project Plan

## 📋 Project Overview

**Project Name:** Scalev Storefront Starter  
**Tech Stack:** Next.js 15 + TypeScript + TailwindCSS + shadcn/ui  
**API:** Scalev Storefront API v3  
**Design System:** Minimal Flat Design with Clean Typography  
**Timeline:** 8 weeks (MVP)  

---

## 🎨 Design System

### **Visual Style**
- **Pattern:** Minimal Single Column
- **Style:** Flat Design (2D, minimalist, bold colors, no shadows)
- **Mode:** Light + Dark mode support
- **Performance:** ⚡ Excellent
- **Accessibility:** ✓ WCAG AAA

### **Color Palette**

| Role | Light Mode | Dark Mode | CSS Variable |
|------|------------|-----------|--------------|
| Primary | `#171717` | `#FAFAFA` | `--color-primary` |
| On Primary | `#FFFFFF` | `#171717` | `--color-on-primary` |
| Secondary | `#404040` | `#A3A3A3` | `--color-secondary` |
| Accent/CTA | `#A16207` | `#FCD34D` | `--color-accent` |
| Background | `#FFFFFF` | `#0A0A0A` | `--color-background` |
| Foreground | `#171717` | `#FAFAFA` | `--color-foreground` |
| Muted | `#E8ECF0` | `#262626` | `--color-muted` |
| Border | `#E5E5E5` | `#404040` | `--color-border` |
| Destructive | `#DC2626` | `#EF4444` | `--color-destructive` |
| Ring | `#171717` | `#FAFAFA` | `--color-ring` |

**Notes:**
- Minimal black + accent gold
- All colors meet WCAG 4.5:1 contrast ratio
- Accent adjusted for accessibility

### **Typography**

**Font Pairing:**
- **Heading:** Rubik (300, 400, 500, 600, 700)
- **Body:** Nunito Sans (300, 400, 500, 600, 700)
- **Mood:** Clean, modern, e-commerce, conversion-focused

**Google Fonts Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Rubik:wght@300;400;500;600;700&display=swap');
```

**Type Scale:**
```css
/* Headings */
h1: 2.5rem (40px) - Rubik 700
h2: 2rem (32px) - Rubik 600
h3: 1.5rem (24px) - Rubik 600
h4: 1.25rem (20px) - Rubik 500
h5: 1.125rem (18px) - Rubik 500
h6: 1rem (16px) - Rubik 500

/* Body */
body: 1rem (16px) - Nunito Sans 400
small: 0.875rem (14px) - Nunito Sans 400
caption: 0.75rem (12px) - Nunito Sans 400
```

### **Spacing System**

Based on 4px/8px increments:
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
4xl: 96px
```

### **Effects & Interactions**

**Transitions:**
- Duration: 150-200ms
- Easing: ease-in-out
- Properties: color, opacity, transform

**Hover States:**
- Buttons: Opacity 0.9 or color shift
- Cards: Subtle elevation (border color change)
- Links: Underline or color change

**No Gradients/Shadows:**
- Keep flat design principles
- Use borders for separation
- Use background colors for hierarchy

---

## 📁 Project Structure

```
scalev-storefront-starter/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (shop)/                   # Shop routes group
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── products/
│   │   │   │   ├── page.tsx          # Product listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # Product detail
│   │   │   ├── cart/
│   │   │   │   └── page.tsx          # Cart page
│   │   │   └── checkout/
│   │   │       └── page.tsx          # Checkout page
│   │   ├── (auth)/                   # Auth routes group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── account/                  # Customer account
│   │   │   ├── profile/
│   │   │   ├── orders/
│   │   │   └── addresses/
│   │   ├── order/
│   │   │   └── [secretSlug]/
│   │   │       └── page.tsx          # Order tracking
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles
│   │   └── page.tsx                  # Root redirect
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── sheet.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── navigation.tsx
│   │   │   └── mobile-nav.tsx
│   │   ├── product/
│   │   │   ├── product-card.tsx
│   │   │   ├── product-grid.tsx
│   │   │   ├── product-detail.tsx
│   │   │   └── variant-selector.tsx
│   │   ├── cart/
│   │   │   ├── cart-item.tsx
│   │   │   ├── cart-summary.tsx
│   │   │   └── cart-drawer.tsx
│   │   ├── checkout/
│   │   │   ├── shipping-form.tsx
│   │   │   ├── payment-selector.tsx
│   │   │   └── order-summary.tsx
│   │   └── payment/
│   │       ├── payment-renderer.tsx
│   │       ├── bank-transfer.tsx
│   │       ├── virtual-account.tsx
│   │       └── qris.tsx
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts             # API client
│   │   │   ├── catalog.ts
│   │   │   ├── cart.ts
│   │   │   ├── checkout.ts
│   │   │   └── auth.ts
│   │   ├── stores/
│   │   │   ├── cart-store.ts         # Zustand cart
│   │   │   └── auth-store.ts         # Zustand auth
│   │   ├── hooks/
│   │   │   ├── use-cart.ts
│   │   │   ├── use-auth.ts
│   │   │   └── use-products.ts
│   │   ├── utils/
│   │   │   ├── format.ts
│   │   │   └── validation.ts
│   │   └── types/
│   │       └── api.ts
│   │
│   └── config/
│       ├── site.ts                   # Site config
│       └── constants.ts
│
├── public/
│   ├── images/
│   └── fonts/
│
├── docs/
│   ├── SETUP.md
│   ├── COMPONENTS.md
│   └── API_INTEGRATION.md
│
├── .env.example
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🎯 MVP Features (8 Weeks)

### **Week 1: Setup & Foundation**
- [x] Initialize Next.js project
- [x] Setup TailwindCSS + shadcn/ui
- [x] Configure design system (colors, typography)
- [x] Create base layout (header, footer)
- [x] Setup API client
- [x] Configure environment variables

### **Week 2: Catalog Pages**
- [ ] Homepage
  - Hero section
  - Featured products grid
  - Category showcase
- [ ] Product listing page
  - Grid layout
  - Filters (category, price)
  - Pagination
  - Search
- [ ] Product detail page
  - Image gallery
  - Variant selector
  - Add to cart
  - Product info

### **Week 3: Cart & Checkout**
- [ ] Cart drawer/modal
  - Item list
  - Quantity controls
  - Remove items
  - Subtotal
- [ ] Cart page
  - Full cart view
  - Update quantities
  - Proceed to checkout
- [ ] Checkout page
  - Shipping form
  - Location selector
  - Shipping method
  - Payment method
  - Order summary

### **Week 4: Authentication**
- [ ] Login page
  - Email/password form
  - OTP support
- [ ] Register page
  - Registration form
  - Validation
- [ ] Password reset flow
- [ ] Customer dashboard
  - Profile
  - Order history
  - Addresses

### **Week 5: Payment & Orders**
- [ ] Order tracking page
  - Order details
  - Status timeline
  - Payment status
- [ ] Payment instructions
  - Bank transfer
  - Virtual account
  - QRIS
  - E-wallet
- [ ] Transfer proof upload

### **Week 6: Polish & Optimization**
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Dark mode implementation
- [ ] Loading states
- [ ] Error handling
- [ ] Form validation
- [ ] Accessibility improvements

### **Week 7: Testing & Bug Fixes**
- [ ] Manual testing all flows
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Performance optimization
- [ ] Bug fixes

### **Week 8: Deployment**
- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Setup analytics
- [ ] Final testing
- [ ] Documentation

---

## 🎨 Component Specifications

### **Key Components to Build**

#### **1. ProductCard**
```typescript
interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    price: string;
    compare_at_price?: string;
    images: string[];
    is_available: boolean;
  };
  onAddToCart?: () => void;
}
```

**Design:**
- Flat card with border
- Product image (aspect-ratio 1:1)
- Product name (2 lines max, ellipsis)
- Price (bold, accent color)
- Compare price (strikethrough, muted)
- Add to cart button (primary accent)
- Hover: Border color change

#### **2. Header**
```typescript
interface HeaderProps {
  cartItemCount: number;
  isAuthenticated: boolean;
}
```

**Design:**
- Fixed top position
- Logo (left)
- Navigation (center): Home, Products, Categories
- Actions (right): Search, Cart (with badge), Account
- Mobile: Hamburger menu
- Background: white (light) / dark (dark mode)
- Border bottom

#### **3. CartDrawer**
```typescript
interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}
```

**Design:**
- Slide from right
- Header: "Cart" + close button
- Item list (scrollable)
- Each item: image, name, price, quantity controls, remove
- Footer: Subtotal + Checkout button
- Empty state: Icon + message + "Continue shopping"

#### **4. CheckoutForm**
```typescript
interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void;
}
```

**Design:**
- Multi-step or single page
- Sections: Shipping, Payment, Review
- Form fields with labels
- Validation errors below fields
- Progress indicator (if multi-step)
- Submit button: "Place Order"

---

## 🔧 Technical Specifications

### **API Integration**

**Base URL:** `https://api.scalev.com/v3/stores/{store_id}`

**Headers:**
```typescript
{
  'X-Scalev-Storefront-Api-Key': process.env.NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY,
  'X-Scalev-Guest-Token': guestToken, // from localStorage
  'Content-Type': 'application/json'
}
```

**Key Endpoints:**
- `GET /public/items` - Product listing
- `GET /public/products/{slug}` - Product detail
- `GET /public/cart` - Get cart
- `POST /public/cart/items` - Add to cart
- `POST /public/checkout` - Create order
- `GET /public/orders/{secret_slug}` - Order tracking

### **State Management**

**Zustand Stores:**

```typescript
// cart-store.ts
interface CartStore {
  cart: Cart | null;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (item: CartItem) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
}

// auth-store.ts
interface AuthStore {
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
```

### **Styling Approach**

**TailwindCSS + CSS Variables:**

```css
/* globals.css */
@layer base {
  :root {
    --color-primary: 23 23 23;
    --color-accent: 161 98 7;
    --color-background: 255 255 255;
    --color-foreground: 23 23 23;
    /* ... */
  }

  .dark {
    --color-primary: 250 250 250;
    --color-accent: 252 211 77;
    --color-background: 10 10 10;
    --color-foreground: 250 250 250;
    /* ... */
  }
}
```

**Usage:**
```tsx
<button className="bg-accent text-on-primary hover:opacity-90 transition-opacity duration-150">
  Add to Cart
</button>
```

---

## ✅ Pre-Delivery Checklist

### **Visual Quality**
- [ ] No emojis as icons (use Lucide React)
- [ ] Consistent icon family and style
- [ ] Flat design principles maintained
- [ ] No gradients or shadows
- [ ] Clean borders and separations

### **Interaction**
- [ ] All buttons have hover states
- [ ] Transitions: 150-200ms ease-in-out
- [ ] cursor-pointer on clickable elements
- [ ] Loading states for async operations
- [ ] Disabled states clearly visible

### **Accessibility**
- [ ] Text contrast ≥4.5:1 (WCAG AA)
- [ ] Focus states visible
- [ ] Keyboard navigation works
- [ ] Alt text for images
- [ ] Aria labels for icon buttons
- [ ] Form labels properly associated

### **Responsive**
- [ ] Mobile (375px) tested
- [ ] Tablet (768px) tested
- [ ] Desktop (1024px, 1440px) tested
- [ ] No horizontal scroll
- [ ] Touch targets ≥44px

### **Performance**
- [ ] Images optimized (WebP/AVIF)
- [ ] Lazy loading for below-fold content
- [ ] Code splitting by route
- [ ] Lighthouse score >90

### **Dark Mode**
- [ ] All colors have dark variants
- [ ] Contrast maintained in dark mode
- [ ] Tested in both modes
- [ ] Smooth theme transition

---

## 🚀 Next Steps

1. **Review this plan** - Make sure everything aligns with your vision
2. **Setup environment** - Install Node.js, create Scalev account
3. **Initialize project** - Follow setup guide
4. **Start building** - Week by week implementation
5. **Deploy** - Vercel deployment when ready

---

**Created:** 2026-05-28  
**Status:** Planning Phase  
**Ready to Start:** Yes ✅

