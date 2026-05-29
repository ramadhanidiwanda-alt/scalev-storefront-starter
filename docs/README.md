# 🛍️ Scalev Storefront Starter

> Production-ready e-commerce storefront template built with Next.js 15, TypeScript, TailwindCSS, and shadcn/ui, powered by Scalev Storefront API v3.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000)](https://ui.shadcn.com/)

---

## 📖 What's This?

Complete documentation and specifications for building a modern e-commerce storefront using Scalev API. This project includes:

- ✅ **Design System** - Flat design with clean typography (Rubik + Nunito Sans)
- ✅ **Component Specs** - 18+ detailed component specifications
- ✅ **Implementation Guide** - Step-by-step setup and development guide
- ✅ **Project Plan** - 8-week roadmap from zero to production
- ✅ **Code Examples** - Ready-to-use TypeScript code snippets

---

## 🎨 Design System

### **Visual Style**
- **Pattern:** Minimal Single Column
- **Style:** Flat Design (no shadows, no gradients)
- **Typography:** Rubik (headings) + Nunito Sans (body)
- **Colors:** Minimal black + accent gold
- **Mode:** Light + Dark mode support

### **Color Palette**

| Role | Light | Dark | Usage |
|------|-------|------|-------|
| Primary | `#171717` | `#FAFAFA` | Main text, headings |
| Accent | `#A16207` | `#FCD34D` | CTAs, prices, highlights |
| Background | `#FFFFFF` | `#0A0A0A` | Page background |
| Muted | `#E8ECF0` | `#262626` | Disabled, secondary bg |
| Border | `#E5E5E5` | `#404040` | Card borders, dividers |

---

## 🛠️ Tech Stack

```
Frontend:        Next.js 15 (App Router) + TypeScript
Styling:         TailwindCSS + shadcn/ui
State:           Zustand
Data Fetching:   TanStack Query (React Query v5)
Forms:           React Hook Form + Zod
Icons:           Lucide React
API:             Scalev Storefront API v3
Deployment:      Vercel (recommended)
```

---

## 📁 Documentation Files

| File | Description |
|------|-------------|
| **PROJECT_PLAN.md** | Complete project plan with 8-week timeline |
| **COMPONENT_SPECS.md** | Detailed specifications for 18+ components |
| **IMPLEMENTATION_GUIDE.md** | Step-by-step implementation guide |
| **README.md** | This file - project overview |

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 20+
- Scalev account with Store ID and API key
- Basic knowledge of React, TypeScript, Next.js

### **Setup (5 minutes)**

```bash
# 1. Create Next.js project
npx create-next-app@latest scalev-storefront --typescript --tailwind --app --src-dir
cd scalev-storefront

# 2. Install dependencies
npm install zustand @tanstack/react-query zod react-hook-form @hookform/resolvers lucide-react date-fns clsx tailwind-merge

# 3. Setup shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input card select label textarea dialog sheet tabs form

# 4. Configure environment
cp .env.example .env.local
# Edit .env.local with your Scalev credentials

# 5. Start development
npm run dev
```

### **Next Steps**

1. Read **PROJECT_PLAN.md** for the complete roadmap
2. Follow **IMPLEMENTATION_GUIDE.md** for step-by-step setup
3. Reference **COMPONENT_SPECS.md** when building components

---

## 🎯 Features

### **MVP Features (8 Weeks)**

✅ **Catalog**
- Product listing with pagination
- Product detail with variants
- Category filtering
- Search functionality

✅ **Cart**
- Add to cart
- Update quantity
- Remove items
- Cart persistence

✅ **Checkout**
- Guest checkout
- Shipping address form
- Location selector
- Payment method selector

✅ **Payment**
- Bank Transfer
- Virtual Account (BCA, Mandiri, BNI, BRI)
- QRIS
- E-wallets (GoPay, DANA, OVO, ShopeePay)
- COD

✅ **Authentication**
- Login (with OTP support)
- Register
- Password reset
- Customer dashboard

✅ **Customer Account**
- Profile management
- Order history
- Address management

---

## 📦 Project Structure

```
scalev-storefront/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (shop)/            # Shop routes
│   │   ├── (auth)/            # Auth routes
│   │   ├── account/           # Customer account
│   │   └── order/             # Order tracking
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── layout/            # Header, Footer, Nav
│   │   ├── product/           # Product components
│   │   ├── cart/              # Cart components
│   │   ├── checkout/          # Checkout components
│   │   └── payment/           # Payment components
│   ├── lib/
│   │   ├── api/               # API client
│   │   ├── stores/            # Zustand stores
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # Utilities
│   │   └── types/             # TypeScript types
│   └── config/                # Configuration
├── public/                    # Static assets
└── docs/                      # Documentation
```

---

## 🎨 Component Library

### **Layout Components**
- Header (with cart badge, mobile menu)
- Footer (multi-column, responsive)
- MobileNav (full-screen overlay)

### **Product Components**
- ProductCard (flat design, hover states)
- ProductGrid (responsive grid)
- ProductDetail (image gallery, variant selector)

### **Cart Components**
- CartDrawer (slide from right)
- CartItem (quantity controls, remove)
- CartSummary (subtotal, checkout CTA)

### **Checkout Components**
- CheckoutForm (multi-step or single page)
- LocationSelector (province → city → subdistrict)
- OrderSummary (items, costs, total)

### **Payment Components**
- PaymentRenderer (method switcher)
- BankTransferInstructions
- VirtualAccountInstructions
- QRISInstructions

---

## ⏱️ Timeline

**8 weeks from zero to production:**

| Week | Focus | Deliverable |
|------|-------|-------------|
| 1 | Setup & Foundation | Project initialized |
| 2 | Catalog Features | Product listing & detail |
| 3 | Cart & Checkout | Cart system, checkout flow |
| 4 | Authentication | Login, register, account |
| 5 | Payment & Orders | All payment methods |
| 6 | Polish & Optimization | Responsive, dark mode |
| 7 | Testing & Bug Fixes | Cross-browser testing |
| 8 | Deployment | Live on Vercel |

---

## ✅ Pre-Delivery Checklist

### **Visual Quality**
- [ ] No emojis as icons (use Lucide React)
- [ ] Flat design principles maintained
- [ ] Consistent typography (Rubik + Nunito Sans)
- [ ] Spacing uses 4px/8px increments

### **Interaction**
- [ ] All buttons have hover states (150-200ms)
- [ ] cursor-pointer on clickable elements
- [ ] Loading states for async operations
- [ ] Disabled states clearly visible

### **Accessibility**
- [ ] Text contrast ≥4.5:1 (WCAG AA)
- [ ] Focus states visible
- [ ] Keyboard navigation works
- [ ] Alt text for images
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

---

## 🚀 Deployment

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### **Environment Variables**

Add these in Vercel Dashboard:

```
NEXT_PUBLIC_SCALEV_API_BASE=https://api.scalev.com
NEXT_PUBLIC_SCALEV_STORE_ID=your_store_id
NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY=your_api_key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### **Scalev Configuration**

Add your Vercel domain to Scalev allowed origins:
1. Go to Scalev Dashboard → Storefront API
2. Add allowed origin: `https://your-domain.vercel.app`
3. Save

---

## 📚 Resources

### **Documentation**
- [Scalev API Docs](https://docs.scalev.com)
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

### **Design System**
- [Rubik Font](https://fonts.google.com/specimen/Rubik)
- [Nunito Sans Font](https://fonts.google.com/specimen/Nunito+Sans)
- [Lucide Icons](https://lucide.dev/)

---

## 💡 Tips

### **Development**
- Start with layout components (Header, Footer)
- Build product components next (ProductCard, ProductGrid)
- Test each component in isolation
- Use Storybook for component development (optional)

### **Styling**
- Follow flat design principles (no shadows/gradients)
- Use design system colors consistently
- Keep transitions smooth (150-200ms)
- Test dark mode alongside light mode

### **Performance**
- Use Next.js Image component for all images
- Implement lazy loading for heavy components
- Use React Query for API caching
- Monitor bundle size

---

## 🤝 Contributing

This is a documentation project. To use it:

1. Clone or download this repository
2. Follow the **IMPLEMENTATION_GUIDE.md**
3. Build your own storefront
4. Share your experience!

---

## 📄 License

MIT License - Free to use for personal and commercial projects

---

## 🙏 Acknowledgments

- **Scalev Team** - For the powerful API
- **Next.js Team** - For the amazing framework
- **shadcn** - For the beautiful UI components
- **Vercel** - For the deployment platform

---

## 📞 Support

### **For Scalev API Issues**
- 📖 [Scalev Documentation](https://docs.scalev.com)
- 💬 Scalev Support

### **For Implementation Help**
- Read the documentation files in this repository
- Check the component specifications
- Follow the implementation guide step-by-step

---

**🎯 Ready to build your storefront?**

Start with **PROJECT_PLAN.md** to understand the complete roadmap, then follow **IMPLEMENTATION_GUIDE.md** for step-by-step instructions.

**Good luck! 🚀**

---

*Created: 2026-05-28*  
*Version: 1.0*  
*Status: Ready for Implementation*

