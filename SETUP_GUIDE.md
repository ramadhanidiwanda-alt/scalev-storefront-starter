# 🚀 Setup Guide - Scalev Storefront

Complete setup guide untuk menjalankan Scalev Storefront di local development atau production.

---

## 📋 Prerequisites

Sebelum memulai, pastikan Anda memiliki:

- ✅ Node.js 20+ installed
- ✅ npm atau yarn package manager
- ✅ Scalev account dengan Store ID dan API Key
- ✅ Text editor (VS Code recommended)
- ✅ Git (optional, untuk version control)

---

## 🎯 Quick Setup (5 Menit)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment Variables

Buat file `.env.local` di root directory:

```bash
# Scalev API Configuration
NEXT_PUBLIC_SCALEV_API_BASE=https://api.scalev.com
NEXT_PUBLIC_SCALEV_STORE_ID=your_store_id_here
NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY=your_api_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Scalev Storefront
```

**⚠️ PENTING:** Ganti `your_store_id_here` dan `your_api_key_here` dengan credentials Scalev Anda.

### Step 3: Get Scalev Credentials

1. Login ke [Scalev Dashboard](https://dashboard.scalev.com)
2. Navigate ke **Settings** → **Storefront API**
3. Copy **Store ID** dan **API Key**
4. Paste ke `.env.local`

### Step 4: Configure Allowed Origins

Di Scalev Dashboard:
1. Go to **Settings** → **Storefront API** → **Allowed Origins**
2. Add `http://localhost:3000`
3. Save

### Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🔧 Detailed Configuration

### Environment Variables Explained

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_SCALEV_API_BASE` | Yes | Scalev API base URL | `https://api.scalev.com` |
| `NEXT_PUBLIC_SCALEV_STORE_ID` | Yes | Your Scalev Store ID | `12345` |
| `NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY` | Yes | Your Storefront API Key | `sk_live_xxxxx` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Your site URL | `http://localhost:3000` |
| `NEXT_PUBLIC_SITE_NAME` | Yes | Your store name | `My Store` |

### Scalev Dashboard Configuration

#### 1. Allowed Origins
Tambahkan domain yang diizinkan untuk mengakses API:
- Development: `http://localhost:3000`
- Production: `https://yourdomain.com`

#### 2. Payment Methods
Aktifkan payment methods yang ingin Anda gunakan:
- Bank Transfer
- Virtual Account (BCA, Mandiri, BNI, BRI)
- QRIS
- E-wallets (GoPay, DANA, OVO, ShopeePay)
- COD

#### 3. Shipping Settings
Configure shipping providers dan rates di Scalev Dashboard.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

#### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

#### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

#### Step 3: Add Environment Variables

Di Vercel project settings, add environment variables:

```
NEXT_PUBLIC_SCALEV_API_BASE=https://api.scalev.com
NEXT_PUBLIC_SCALEV_STORE_ID=your_store_id
NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY=your_api_key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=Your Store Name
```

#### Step 4: Deploy

Click **"Deploy"** dan tunggu build selesai.

#### Step 5: Update Scalev Allowed Origins

Tambahkan Vercel domain ke Scalev allowed origins:
- `https://your-domain.vercel.app`

### Deploy to Other Platforms

#### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Add environment variables di Netlify dashboard.

#### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

Add environment variables di Railway dashboard.

---

## 🧪 Testing

### Test Locally

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

### Test Checklist

- [ ] Homepage loads correctly
- [ ] Product listing shows products
- [ ] Product detail page works
- [ ] Add to cart functionality
- [ ] Cart persists on refresh
- [ ] Checkout flow completes
- [ ] Order tracking works
- [ ] Login/Register works
- [ ] Dark mode toggle works
- [ ] Mobile responsive (test on 375px)

---

## 🐛 Troubleshooting

### Problem: "Scalev API credentials not configured"

**Solution:**
1. Check `.env.local` exists in root directory
2. Verify all environment variables are set
3. Restart development server: `npm run dev`

### Problem: API requests fail with CORS error

**Solution:**
1. Check Scalev Dashboard → Allowed Origins
2. Add your domain (e.g., `http://localhost:3000`)
3. Clear browser cache
4. Restart development server

### Problem: Cart not persisting

**Solution:**
1. Check browser localStorage is enabled
2. Clear browser cache and localStorage
3. Guest token should be auto-generated on first visit

### Problem: Build fails

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Rebuild
npm run build
```

### Problem: Images not loading

**Solution:**
1. Check product images exist in Scalev Dashboard
2. Verify image URLs are accessible
3. Check Next.js Image configuration in `next.config.ts`

### Problem: Payment methods not showing

**Solution:**
1. Check payment methods are enabled in Scalev Dashboard
2. Verify API key has correct permissions
3. Check API response in browser console

---

## 📚 Development Tips

### Hot Reload

Next.js automatically reloads when you save files. If it doesn't:
```bash
# Restart dev server
npm run dev
```

### Debug Mode

Add console logs in components:
```typescript
console.log('Cart:', cart);
console.log('Products:', products);
```

### Check API Responses

Open browser DevTools → Network tab to see API requests/responses.

### Test Different Scenarios

1. **Guest User Flow:**
   - Browse products
   - Add to cart
   - Checkout without login

2. **Authenticated User Flow:**
   - Register/Login
   - Browse products
   - Add to cart
   - Checkout
   - View order history

3. **Error Scenarios:**
   - Out of stock products
   - Invalid checkout data
   - Payment failures

---

## 🎨 Customization

### Change Colors

Edit `src/app/globals.css`:
```css
:root {
  --color-primary: #1877F2;  /* Change this */
  --color-accent: #42B72A;   /* Change this */
}
```

### Change Fonts

Edit `src/app/layout.tsx`:
```typescript
import { YourFont } from "next/font/google";

const yourFont = YourFont({
  variable: "--font-heading",
  subsets: ["latin"],
});
```

### Change Logo

Edit `src/components/layout/header.tsx`:
```typescript
<span className="text-xl font-bold">
  Your Store Name
</span>
```

### Add Custom Pages

Create new page in `src/app/`:
```bash
mkdir src/app/about
touch src/app/about/page.tsx
```

---

## 📖 Next Steps

After setup is complete:

1. **Customize Design:**
   - Update colors, fonts, logo
   - Add your branding

2. **Add Products:**
   - Add products in Scalev Dashboard
   - Test product display

3. **Configure Shipping:**
   - Setup shipping methods
   - Test checkout flow

4. **Configure Payments:**
   - Enable payment methods
   - Test payment flow

5. **Test Everything:**
   - Test on mobile devices
   - Test all user flows
   - Test error scenarios

6. **Deploy to Production:**
   - Deploy to Vercel
   - Update allowed origins
   - Test production site

7. **Monitor & Optimize:**
   - Monitor performance
   - Check analytics
   - Optimize as needed

---

## 🆘 Support

### Scalev API Issues
- 📖 [Scalev Documentation](https://docs.scalev.com)
- 💬 Contact Scalev Support

### Template Issues
- Check documentation in `/docs` folder
- Review this setup guide
- Check GitHub issues

---

## ✅ Setup Complete!

Jika semua steps sudah selesai, Anda seharusnya memiliki:

- ✅ Development server running di `http://localhost:3000`
- ✅ Products loading dari Scalev API
- ✅ Cart functionality working
- ✅ Checkout flow working
- ✅ Authentication working

**Selamat! Storefront Anda sudah siap digunakan! 🎉**

---

*Last Updated: 2026-05-29*
*Version: 1.0.0*
