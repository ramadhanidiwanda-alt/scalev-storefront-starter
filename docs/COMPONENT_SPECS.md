# 🎨 Component Specifications - Scalev Storefront

Detailed specifications for all UI components following the Flat Design system.

---

## 🎨 Design Principles

### **Flat Design Rules**
- ✅ No shadows or gradients
- ✅ Clean borders for separation
- ✅ Bold, solid colors
- ✅ Simple shapes and icons
- ✅ Typography-focused hierarchy
- ✅ Smooth transitions (150-200ms)

### **Color Usage**
- **Primary (#171717):** Main text, headings, primary buttons
- **Accent (#A16207):** CTAs, links, highlights, prices
- **Muted (#E8ECF0):** Backgrounds, disabled states
- **Border (#E5E5E5):** Card borders, dividers
- **Destructive (#DC2626):** Delete, remove, error states

---

## 📦 Layout Components

### **1. Header**

**File:** `src/components/layout/header.tsx`

**Props:**
```typescript
interface HeaderProps {
  cartItemCount: number;
  isAuthenticated: boolean;
  userName?: string;
}
```

**Design Specs:**
```
Height: 64px (mobile), 72px (desktop)
Background: bg-background
Border: border-b border-border
Position: sticky top-0
Z-index: 50

Layout:
├─ Logo (left) - 32px height
├─ Navigation (center, desktop only)
│  ├─ Home
│  ├─ Products
│  └─ Categories
└─ Actions (right)
   ├─ Search icon
   ├─ Cart icon + badge
   └─ Account icon/avatar

Mobile:
├─ Hamburger menu (left)
├─ Logo (center)
└─ Cart icon (right)
```

**States:**
- Default: Border bottom visible
- Scroll: Add subtle background opacity
- Mobile menu open: Full-screen overlay

**Interactions:**
- Cart badge: Animate on count change (scale pulse)
- Menu items: Underline on hover
- Icons: Opacity 0.9 on hover

---

### **2. Footer**

**File:** `src/components/layout/footer.tsx`

**Design Specs:**
```
Background: bg-muted
Padding: py-12 px-4
Border: border-t border-border

Layout (Desktop):
├─ Column 1: Brand
│  ├─ Logo
│  └─ Tagline
├─ Column 2: Shop
│  ├─ Products
│  ├─ Categories
│  └─ New Arrivals
├─ Column 3: Support
│  ├─ Contact
│  ├─ FAQ
│  └─ Shipping
└─ Column 4: Legal
   ├─ Privacy
   ├─ Terms
   └─ Returns

Bottom:
├─ Copyright text
└─ Social icons
```

**Mobile:** Stack columns vertically

---

### **3. MobileNav**

**File:** `src/components/layout/mobile-nav.tsx`

**Props:**
```typescript
interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
}
```

**Design Specs:**
```
Type: Full-screen overlay
Background: bg-background
Animation: Slide from left (300ms ease-out)

Layout:
├─ Header
│  ├─ Logo
│  └─ Close button (X)
├─ Navigation Links
│  ├─ Home
│  ├─ Products
│  ├─ Categories
│  ├─ Cart
│  └─ Account / Login
└─ Footer
   └─ Dark mode toggle
```

**Interactions:**
- Links: Full-width, py-4, hover bg-muted
- Close: Tap outside or X button
- Backdrop: bg-black/50

---

## 🛍️ Product Components

### **4. ProductCard**

**File:** `src/components/product/product-card.tsx`

**Props:**
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

**Design Specs:**
```
Card:
├─ Border: border border-border
├─ Radius: rounded-lg (8px)
├─ Padding: p-0
├─ Background: bg-background
└─ Hover: border-primary transition-colors

Layout:
├─ Image Container
│  ├─ Aspect ratio: 1:1
│  ├─ Object fit: cover
│  └─ Background: bg-muted
├─ Content (p-4)
│  ├─ Name
│  │  ├─ Font: Rubik 500
│  │  ├─ Size: text-base
│  │  ├─ Lines: 2 max (line-clamp-2)
│  │  └─ Color: text-foreground
│  ├─ Price Row
│  │  ├─ Current Price
│  │  │  ├─ Font: Rubik 600
│  │  │  ├─ Size: text-lg
│  │  │  └─ Color: text-accent
│  │  └─ Compare Price (if exists)
│  │     ├─ Size: text-sm
│  │     ├─ Color: text-muted-foreground
│  │     └─ Decoration: line-through
│  └─ Add to Cart Button
│     ├─ Full width
│     ├─ Height: h-10
│     ├─ Background: bg-accent
│     ├─ Text: text-on-primary
│     └─ Hover: opacity-90
```

**States:**
- Available: Normal
- Out of stock: Opacity 0.6, button disabled
- Loading: Button shows spinner

**Interactions:**
- Card hover: Border color changes
- Button hover: Opacity 0.9
- Click: Navigate to product detail

---

### **5. ProductGrid**

**File:** `src/components/product/product-grid.tsx`

**Props:**
```typescript
interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onLoadMore?: () => void;
}
```

**Design Specs:**
```
Grid:
├─ Columns: 2 (mobile), 3 (tablet), 4 (desktop)
├─ Gap: gap-4 (mobile), gap-6 (desktop)
└─ Container: max-w-7xl mx-auto px-4

Loading State:
└─ Skeleton cards (same grid)

Empty State:
├─ Icon (ShoppingBag)
├─ Message: "No products found"
└─ CTA: "Browse all products"
```

---

### **6. ProductDetail**

**File:** `src/components/product/product-detail.tsx`

**Design Specs:**
```
Layout (Desktop):
├─ Left (60%): Image Gallery
│  ├─ Main Image (aspect-ratio 1:1)
│  └─ Thumbnails (below, horizontal scroll)
└─ Right (40%): Product Info
   ├─ Breadcrumb
   ├─ Name (h1, Rubik 700, text-3xl)
   ├─ Price
   │  ├─ Current (text-2xl, text-accent)
   │  └─ Compare (text-lg, line-through)
   ├─ Description
   ├─ Variant Selector (if variants)
   ├─ Quantity Selector
   ├─ Add to Cart Button (large)
   └─ Product Details (accordion)

Mobile: Stack vertically
```

**Variant Selector:**
```
Type: Button group
Options: Border buttons
Selected: bg-primary text-on-primary
Unselected: border-border hover:border-primary
```

---

## 🛒 Cart Components

### **7. CartDrawer**

**File:** `src/components/cart/cart-drawer.tsx`

**Props:**
```typescript
interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}
```

**Design Specs:**
```
Type: Sheet (slide from right)
Width: 400px (desktop), 100vw (mobile)
Background: bg-background
Animation: 300ms ease-out

Layout:
├─ Header (sticky)
│  ├─ Title: "Cart" (h2, Rubik 600)
│  ├─ Item count
│  └─ Close button (X)
├─ Items (scrollable)
│  └─ CartItem components
└─ Footer (sticky)
   ├─ Subtotal
   │  ├─ Label: "Subtotal"
   │  └─ Amount: text-accent text-xl
   └─ Checkout Button
      ├─ Full width
      ├─ Height: h-12
      └─ Background: bg-accent

Empty State:
├─ Icon (ShoppingCart)
├─ Message: "Your cart is empty"
└─ CTA: "Continue shopping"
```

---

### **8. CartItem**

**File:** `src/components/cart/cart-item.tsx`

**Props:**
```typescript
interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: string;
    quantity: number;
    image?: string;
  };
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}
```

**Design Specs:**
```
Layout:
├─ Image (64x64px, rounded)
├─ Info (flex-1)
│  ├─ Name (text-sm, line-clamp-2)
│  ├─ Price (text-accent, font-semibold)
│  └─ Quantity Controls
│     ├─ Minus button (-)
│     ├─ Quantity display
│     └─ Plus button (+)
└─ Remove button (Trash icon)

Spacing: p-4, gap-3
Border: border-b border-border (except last)
```

**Interactions:**
- Quantity buttons: Disabled at min/max
- Remove: Confirm dialog (optional)
- Update: Debounced API call

---

## 💳 Checkout Components

### **9. CheckoutForm**

**File:** `src/components/checkout/checkout-form.tsx`

**Design Specs:**
```
Layout:
├─ Progress Indicator (if multi-step)
│  ├─ Step 1: Shipping
│  ├─ Step 2: Payment
│  └─ Step 3: Review
├─ Form Sections
│  ├─ Shipping Information
│  │  ├─ Name (required)
│  │  ├─ Email (required)
│  │  ├─ Phone (required)
│  │  ├─ Address (required)
│  │  ├─ Location Selector
│  │  └─ Postal Code
│  ├─ Shipping Method
│  │  └─ Radio group
│  └─ Payment Method
│     └─ Radio group
└─ Actions
   ├─ Back button (if multi-step)
   └─ Continue / Place Order button

Form Fields:
├─ Label: text-sm font-medium mb-1
├─ Input: h-10 border border-border rounded
├─ Error: text-destructive text-sm mt-1
└─ Helper: text-muted-foreground text-sm
```

---

### **10. OrderSummary**

**File:** `src/components/checkout/order-summary.tsx`

**Design Specs:**
```
Card:
├─ Border: border border-border
├─ Padding: p-6
└─ Background: bg-muted

Layout:
├─ Title: "Order Summary"
├─ Items List
│  └─ Each item: name, qty, price
├─ Divider
├─ Costs
│  ├─ Subtotal
│  ├─ Shipping
│  ├─ Discount (if any)
│  └─ Total (text-xl, font-bold, text-accent)
└─ Discount Code Input (optional)
```

---

## 💰 Payment Components

### **11. PaymentRenderer**

**File:** `src/components/payment/payment-renderer.tsx`

**Props:**
```typescript
interface PaymentRendererProps {
  order: Order;
}
```

**Design Specs:**
```
Switch based on payment_method:
├─ bank_transfer → BankTransferInstructions
├─ va → VirtualAccountInstructions
├─ qris → QRISInstructions
├─ gopay/dana/ovo → EWalletInstructions
└─ cod → CODConfirmation

Common Layout:
├─ Status Badge
├─ Payment Method Icon
├─ Instructions
└─ Action Buttons
```

---

### **12. BankTransferInstructions**

**File:** `src/components/payment/bank-transfer.tsx`

**Design Specs:**
```
Layout:
├─ Bank Account Cards
│  ├─ Bank Logo
│  ├─ Account Number (large, monospace)
│  ├─ Account Holder
│  └─ Copy button
├─ Amount to Transfer
│  ├─ Label: "Total Amount"
│  └─ Amount: text-2xl text-accent
├─ Upload Proof Section
│  ├─ File input
│  ├─ Preview
│  └─ Submit button
└─ Instructions List
   ├─ Transfer to account
   ├─ Upload proof
   └─ Wait for confirmation
```

---

### **13. VirtualAccountInstructions**

**File:** `src/components/payment/virtual-account.tsx`

**Design Specs:**
```
Layout:
├─ Bank Logo
├─ Virtual Account Number
│  ├─ Large display (text-2xl, monospace)
│  └─ Copy button
├─ Amount
│  └─ text-accent text-xl
├─ Expiry Countdown
│  └─ "Pay within: HH:MM:SS"
└─ How to Pay (accordion)
   ├─ ATM
   ├─ Mobile Banking
   └─ Internet Banking
```

---

### **14. QRISInstructions**

**File:** `src/components/payment/qris.tsx`

**Design Specs:**
```
Layout:
├─ QR Code
│  ├─ Size: 256x256px
│  ├─ Border: border-2 border-border
│  └─ Padding: p-4
├─ Amount
│  └─ text-accent text-xl
├─ Download QR Button
└─ Instructions
   ├─ Open QRIS app
   ├─ Scan QR code
   └─ Confirm payment
```

---

## 🎯 Form Components

### **15. LocationSelector**

**File:** `src/components/checkout/location-selector.tsx`

**Props:**
```typescript
interface LocationSelectorProps {
  value: {
    province_id?: number;
    city_id?: number;
    subdistrict_id?: number;
  };
  onChange: (location: Location) => void;
}
```

**Design Specs:**
```
Layout:
├─ Province Select
│  └─ Loads on mount
├─ City Select
│  └─ Loads when province selected
└─ Subdistrict Select
   └─ Loads when city selected

Each Select:
├─ Label above
├─ Placeholder: "Select..."
├─ Loading: "Loading..."
└─ Disabled until parent selected
```

---

## 🎨 UI Components (shadcn/ui)

### **16. Button**

**Variants:**
```typescript
variants: {
  variant: {
    default: "bg-primary text-on-primary hover:opacity-90",
    accent: "bg-accent text-on-primary hover:opacity-90",
    outline: "border border-border hover:bg-muted",
    ghost: "hover:bg-muted",
    destructive: "bg-destructive text-white hover:opacity-90",
  },
  size: {
    default: "h-10 px-4",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6 text-lg",
    icon: "h-10 w-10",
  }
}
```

**Transitions:** `transition-all duration-150 ease-in-out`

---

### **17. Input**

**Design Specs:**
```
Base:
├─ Height: h-10
├─ Padding: px-3
├─ Border: border border-border
├─ Radius: rounded-md
├─ Background: bg-background
└─ Focus: ring-2 ring-ring

States:
├─ Default: border-border
├─ Focus: ring-2 ring-ring
├─ Error: border-destructive
└─ Disabled: opacity-50 cursor-not-allowed
```

---

### **18. Card**

**Design Specs:**
```
Base:
├─ Border: border border-border
├─ Radius: rounded-lg
├─ Background: bg-background
└─ Padding: p-6

Variants:
├─ default: Standard card
├─ hover: Add hover:border-primary
└─ interactive: Add cursor-pointer
```

---

## ✅ Component Checklist

Before marking a component complete, verify:

### **Visual**
- [ ] Follows flat design (no shadows/gradients)
- [ ] Uses design system colors
- [ ] Typography matches specs (Rubik/Nunito Sans)
- [ ] Spacing uses 4px/8px increments
- [ ] Icons from Lucide React (no emojis)

### **Interaction**
- [ ] Hover states defined (150-200ms)
- [ ] Focus states visible
- [ ] Loading states implemented
- [ ] Disabled states clear
- [ ] cursor-pointer on clickable elements

### **Responsive**
- [ ] Mobile (375px) tested
- [ ] Tablet (768px) tested
- [ ] Desktop (1024px+) tested
- [ ] Touch targets ≥44px

### **Accessibility**
- [ ] Semantic HTML
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Color contrast ≥4.5:1
- [ ] Alt text for images

### **Dark Mode**
- [ ] Dark variant defined
- [ ] Contrast maintained
- [ ] Tested in both modes

---

**Created:** 2026-05-28  
**Status:** Component Specifications  
**Ready for Implementation:** Yes ✅

