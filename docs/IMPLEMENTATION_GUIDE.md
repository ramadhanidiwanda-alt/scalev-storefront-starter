# 🚀 Implementation Guide - Scalev Storefront

Step-by-step guide to implement the Scalev Storefront from scratch.

---

## 📋 Prerequisites

### **Required**
- Node.js 20+ installed
- Git installed
- Code editor (VS Code recommended)
- Scalev account with Store ID and API key

### **Recommended**
- Basic knowledge of React, TypeScript, Next.js
- Familiarity with TailwindCSS
- Understanding of REST APIs

---

## 🎯 Phase 1: Project Setup (Day 1)

### **Step 1: Create Next.js Project**

```bash
# Create project
npx create-next-app@latest scalev-storefront \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd scalev-storefront
```

### **Step 2: Install Dependencies**

```bash
# Core dependencies
npm install zustand @tanstack/react-query zod react-hook-form @hookform/resolvers

# UI utilities
npm install lucide-react date-fns clsx tailwind-merge

# Dev dependencies
npm install -D @types/node
```

### **Step 3: Setup shadcn/ui**

```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# When prompted:
# - Style: Default
# - Base color: Slate
# - CSS variables: Yes

# Install components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add select
npx shadcn-ui@latest add label
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add form
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add skeleton
```

### **Step 4: Configure Environment Variables**

```bash
# Create .env.local
cat > .env.local << 'ENVEOF'
# Scalev API Configuration
NEXT_PUBLIC_SCALEV_API_BASE=https://api.scalev.com
NEXT_PUBLIC_SCALEV_STORE_ID=your_store_id_here
NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY=your_api_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Scalev Storefront
ENVEOF

# Create .env.example (for git)
cat > .env.example << 'ENVEOF'
NEXT_PUBLIC_SCALEV_API_BASE=https://api.scalev.com
NEXT_PUBLIC_SCALEV_STORE_ID=
NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=
ENVEOF
```

### **Step 5: Configure Design System**

**Update `src/app/globals.css`:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Colors - Light Mode */
    --color-primary: 23 23 23;
    --color-on-primary: 255 255 255;
    --color-secondary: 64 64 64;
    --color-accent: 161 98 7;
    --color-background: 255 255 255;
    --color-foreground: 23 23 23;
    --color-muted: 232 236 240;
    --color-muted-foreground: 115 115 115;
    --color-border: 229 229 229;
    --color-destructive: 220 38 38;
    --color-ring: 23 23 23;
    
    /* Radius */
    --radius: 0.5rem;
  }

  .dark {
    /* Colors - Dark Mode */
    --color-primary: 250 250 250;
    --color-on-primary: 23 23 23;
    --color-secondary: 163 163 163;
    --color-accent: 252 211 77;
    --color-background: 10 10 10;
    --color-foreground: 250 250 250;
    --color-muted: 38 38 38;
    --color-muted-foreground: 163 163 163;
    --color-border: 64 64 64;
    --color-destructive: 239 68 68;
    --color-ring: 250 250 250;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-family: 'Nunito Sans', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Rubik', sans-serif;
  }
}

/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Rubik:wght@300;400;500;600;700&display=swap');
```

**Update `tailwind.config.ts`:**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "on-primary": "rgb(var(--color-on-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        muted: {
          DEFAULT: "rgb(var(--color-muted) / <alpha-value>)",
          foreground: "rgb(var(--color-muted-foreground) / <alpha-value>)",
        },
        border: "rgb(var(--color-border) / <alpha-value>)",
        destructive: "rgb(var(--color-destructive) / <alpha-value>)",
        ring: "rgb(var(--color-ring) / <alpha-value>)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
        heading: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

---

## 🔧 Phase 2: Core Setup (Day 2)

### **Step 1: Create Folder Structure**

```bash
# Create directories
mkdir -p src/lib/{api,stores,hooks,utils,types}
mkdir -p src/components/{ui,layout,product,cart,checkout,payment}
mkdir -p src/app/{shop,auth,account,order}
```

### **Step 2: Setup API Client**

**Create `src/lib/api/client.ts`:**

```typescript
const API_BASE = process.env.NEXT_PUBLIC_SCALEV_API_BASE!;
const STORE_ID = process.env.NEXT_PUBLIC_SCALEV_STORE_ID!;
const STOREFRONT_KEY = process.env.NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY!;

export class ScalevAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ScalevAPIError';
  }
}

export async function storefrontFetch<T = any>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  headers.set("X-Scalev-Storefront-Api-Key", STOREFRONT_KEY);

  if (typeof window !== 'undefined') {
    const guestToken = localStorage.getItem("scalev_guest_token");
    if (guestToken) {
      headers.set("X-Scalev-Guest-Token", guestToken);
    }
  }

  const response = await fetch(
    `${API_BASE}/v3/stores/${STORE_ID}${path}`,
    {
      ...init,
      credentials: "omit",
      headers,
    }
  );

  if (typeof window !== 'undefined') {
    const newGuestToken = response.headers.get("x-scalev-guest-token");
    if (newGuestToken) {
      localStorage.setItem("scalev_guest_token", newGuestToken);
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ScalevAPIError(
      errorData.message || `API Error: ${response.status}`,
      response.status,
      errorData
    );
  }

  return response.json();
}

export async function customerFetch<T = any>(
  path: string,
  accessToken: string,
  init: RequestInit = {}
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  headers.set("Authorization", `Bearer ${accessToken}`);

  const response = await fetch(
    `${API_BASE}/v3/stores/${STORE_ID}${path}`,
    {
      ...init,
      credentials: "omit",
      headers,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ScalevAPIError(
      errorData.message || `API Error: ${response.status}`,
      response.status,
      errorData
    );
  }

  return response.json();
}
```

### **Step 3: Create Type Definitions**

**Create `src/lib/types/api.ts`:**

```typescript
export interface Product {
  id: number;
  unique_id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  price: string;
  compare_at_price?: string;
  is_available: boolean;
  variants: Variant[];
  categories: Category[];
}

export interface Variant {
  id: number;
  unique_id: string;
  name: string;
  sku?: string;
  price: string;
  compare_at_price?: string;
  stock: number;
  is_available: boolean;
  image?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CartItem {
  id: string;
  type: 'variant' | 'bundle_price_option';
  variant?: Variant;
  quantity: number;
  unit_price: string;
  total_price: string;
}

export interface Cart {
  items: CartItem[];
  total_items: number;
  subtotal: string;
}

export interface Order {
  order_id: number;
  secret_slug: string;
  status: string;
  payment_status: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_price: string;
  shipping_cost: string;
  gross_revenue: string;
  payment_method: string;
  payment_url?: string;
  public_order_url: string;
  items: OrderItem[];
  created_at: string;
}

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  unit_price: string;
  total_price: string;
  image?: string;
}
```

### **Step 4: Setup Zustand Stores**

**Create `src/lib/stores/cart-store.ts`:**

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem } from '@/lib/types/api';
import { storefrontFetch } from '@/lib/api/client';

interface CartStore {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  
  fetchCart: () => Promise<void>;
  addItem: (item: { type: 'variant'; id: number; quantity: number }) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,
      error: null,

      fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const cart = await storefrontFetch<Cart>('/public/cart');
          set({ cart, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch cart',
            isLoading: false 
          });
        }
      },

      addItem: async (item) => {
        set({ isLoading: true, error: null });
        try {
          const payload = { 
            type: 'variant', 
            variant_id: item.id, 
            quantity: item.quantity 
          };

          const cart = await storefrontFetch<Cart>('/public/cart/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          
          set({ cart, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to add item',
            isLoading: false 
          });
          throw error;
        }
      },

      updateItem: async (itemId, quantity) => {
        set({ isLoading: true, error: null });
        try {
          const cart = await storefrontFetch<Cart>(`/public/cart/items/${itemId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity }),
          });
          
          set({ cart, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update item',
            isLoading: false 
          });
          throw error;
        }
      },

      removeItem: async (itemId) => {
        set({ isLoading: true, error: null });
        try {
          await storefrontFetch(`/public/cart/items/${itemId}`, {
            method: 'DELETE',
          });
          
          await get().fetchCart();
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to remove item',
            isLoading: false 
          });
          throw error;
        }
      },

      clearCart: () => {
        set({ cart: null, error: null });
      },
    }),
    {
      name: 'scalev-cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
```

### **Step 5: Create Utility Functions**

**Create `src/lib/utils/format.ts`:**

```typescript
export function formatCurrency(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}
```

---

## 🎨 Phase 3: Build Components (Week 2-5)

### **Week 2: Layout Components**

**Priority:**
1. Header
2. Footer
3. MobileNav

**Start with Header:**

```bash
# Create file
touch src/components/layout/header.tsx
```

Follow the specs in `COMPONENT_SPECS.md` for each component.

### **Week 3: Product Components**

**Priority:**
1. ProductCard
2. ProductGrid
3. ProductDetail
4. VariantSelector

### **Week 4: Cart & Checkout**

**Priority:**
1. CartDrawer
2. CartItem
3. CheckoutForm
4. OrderSummary

### **Week 5: Payment Components**

**Priority:**
1. PaymentRenderer
2. BankTransferInstructions
3. VirtualAccountInstructions
4. QRISInstructions

---

## ✅ Testing Checklist

After each component:

```bash
# Run dev server
npm run dev

# Test in browser
# - Visual appearance
# - Hover states
# - Click interactions
# - Responsive (375px, 768px, 1024px)
# - Dark mode toggle
# - Keyboard navigation
```

---

## 🚀 Phase 4: Deployment (Week 8)

### **Step 1: Build for Production**

```bash
npm run build
```

### **Step 2: Deploy to Vercel**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### **Step 3: Configure Environment Variables**

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.local`
3. Apply to: Production, Preview, Development
4. Redeploy

### **Step 4: Add Domain to Scalev**

In Scalev Dashboard:
1. Go to Storefront API settings
2. Add allowed origin: `https://your-domain.vercel.app`
3. Save

---

## 📝 Development Tips

### **Hot Reload Issues**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### **Type Errors**
```bash
# Check types
npm run type-check
```

### **Styling Issues**
- Check `globals.css` for CSS variable definitions
- Verify `tailwind.config.ts` color mappings
- Use browser DevTools to inspect computed styles

### **API Errors**
- Check `.env.local` variables
- Verify API key in Scalev dashboard
- Check browser console for CORS errors
- Verify allowed origins in Scalev

---

## 🎯 Next Steps

1. ✅ Complete Phase 1 (Setup)
2. ✅ Complete Phase 2 (Core Setup)
3. 🔄 Start Phase 3 (Build Components)
4. ⏳ Phase 4 (Deployment)

---

**Created:** 2026-05-28  
**Status:** Implementation Guide  
**Ready to Start:** Yes ✅

