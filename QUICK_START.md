# ⚡ Quick Start - Scalev Storefront

Get your storefront running in **5 minutes**!

---

## 🎯 Prerequisites

- ✅ Node.js 20+ installed
- ✅ Scalev Store ID & API Key

---

## 🚀 3 Steps to Launch

### Step 1: Install (1 minute)

```bash
npm install
```

### Step 2: Configure (2 minutes)

Create `.env.local` file:

```bash
NEXT_PUBLIC_SCALEV_API_BASE=https://api.scalev.com
NEXT_PUBLIC_SCALEV_STORE_ID=your_store_id_here
NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY=your_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Scalev Storefront
```

**Get your credentials:**
1. Login to [Scalev Dashboard](https://dashboard.scalev.com)
2. Go to Settings → Storefront API
3. Copy Store ID & API Key
4. Paste into `.env.local`

**Configure allowed origins:**
1. In Scalev Dashboard → Settings → Storefront API
2. Add `http://localhost:3000`
3. Save

### Step 3: Run (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ✅ That's It!

Your storefront is now running! 🎉

---

## 📚 Next Steps

**Customize:**
- Change colors in `src/app/globals.css`
- Update logo in `src/components/layout/header.tsx`
- Add your branding

**Deploy:**
- Push to GitHub
- Deploy to Vercel
- Add environment variables
- Update Scalev allowed origins

**Learn More:**
- Read `README.md` for full documentation
- Read `SETUP_GUIDE.md` for detailed setup
- Read `PROJECT_SUMMARY.md` for overview

---

## 🆘 Need Help?

**Common Issues:**

1. **"API credentials not configured"**
   - Check `.env.local` exists
   - Verify credentials are correct
   - Restart dev server

2. **"CORS error"**
   - Add `http://localhost:3000` to Scalev allowed origins
   - Clear browser cache

3. **"No products showing"**
   - Add products in Scalev Dashboard first
   - Check API credentials

**More Help:**
- Check `SETUP_GUIDE.md`
- Check `README.md`
- Contact Scalev Support

---

**🚀 Happy selling!**
