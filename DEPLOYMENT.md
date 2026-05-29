# 🚀 Deployment Guide

## ⚠️ Important: Next.js 16 Compatibility

**Next.js 16** belum fully supported di Cloudflare Pages. Rekomendasi deployment:

### ✅ Recommended: Vercel (Best for Next.js 16)

**Pros:**
- Native Next.js 16 support
- Zero configuration
- Auto preview deployments
- Edge functions support
- Free tier generous

**Steps:**
1. Push to GitHub (already done ✅)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import `ramadhanidiwanda-alt/scalev-storefront-starter`
4. Add environment variables:
   ```
   NEXT_PUBLIC_SCALEV_API_BASE=https://api.scalev.com
   NEXT_PUBLIC_SCALEV_STORE_ID=your_store_id
   NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY=your_api_key
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_SITE_NAME=Your Store Name
   ```
5. Deploy!

---

## ⚠️ Cloudflare Pages (Limited Support)

**Current Issue:**
- Next.js 16 tidak support `@cloudflare/next-on-pages` adapter
- Dynamic routes (`/order/[secretSlug]`, `/products/[slug]`) tidak bisa static export
- Build error: "Output directory 'dist' not found"

**Workarounds:**

### Option 1: Wait for Adapter Update
Monitor: https://github.com/cloudflare/next-on-pages/issues

### Option 2: Downgrade to Next.js 15
```bash
npm install next@15.5.2 react@18 react-dom@18
npm install -D @cloudflare/next-on-pages
```

Then update `package.json`:
```json
{
  "scripts": {
    "build": "next-on-pages",
    "preview": "wrangler pages dev .vercel/output/static"
  }
}
```

### Option 3: Use Cloudflare Workers (Advanced)
Requires custom setup with Hono or similar framework.

---

## 🔄 Alternative Platforms

### Netlify
- Good Next.js support
- Similar to Vercel
- Free tier available

**Steps:**
1. Go to [netlify.com](https://netlify.com)
2. Import from GitHub
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables

### Railway
- Docker-based deployment
- Good for full-stack apps
- $5/month minimum

### Render
- Free tier available
- Auto-deploy from GitHub
- Good Next.js support

---

## 📝 Environment Variables (All Platforms)

Required for all deployments:

```bash
NEXT_PUBLIC_SCALEV_API_BASE=https://api.scalev.com
NEXT_PUBLIC_SCALEV_STORE_ID=your_store_id
NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY=your_api_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Your Store Name
```

---

## 🎯 Current Status

- ✅ **GitHub:** Deployed and public
- ✅ **Local:** Working with ngrok
- ⚠️ **Cloudflare Pages:** Not compatible with Next.js 16
- ✅ **Vercel:** Ready to deploy (recommended)

---

## 🔗 Quick Deploy Links

- **Vercel:** [Deploy Now](https://vercel.com/new/clone?repository-url=https://github.com/ramadhanidiwanda-alt/scalev-storefront-starter)
- **Netlify:** [Deploy Now](https://app.netlify.com/start/deploy?repository=https://github.com/ramadhanidiwanda-alt/scalev-storefront-starter)

---

**Recommendation:** Deploy to **Vercel** for best Next.js 16 experience.
