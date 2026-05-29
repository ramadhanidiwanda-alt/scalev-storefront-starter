# 🔧 Vercel Environment Variables Setup

## Required Environment Variables

Go to: https://vercel.com/ramadhani-mataru-s-projects/scalev-storefront-starter/settings/environment-variables

Add the following variables:

### 1. NEXT_PUBLIC_SCALEV_API_BASE
- **Value:** `https://api.scalev.com`
- **Environment:** Production, Preview, Development

### 2. NEXT_PUBLIC_SCALEV_STORE_ID
- **Value:** `store_Kl2nMcMEyX0ZVSOu1w8cQCpo`
- **Environment:** Production, Preview, Development

### 3. NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY
- **Value:** `sfpk_2PIembUth0eoRbVq7dvrqTS3wOOA7B8zrtS3FDSCKihbaH3FoEzyJ6BzdTDz5WLe`
- **Environment:** Production, Preview, Development

### 4. NEXT_PUBLIC_SITE_URL
- **Value:** `https://scalev-storefront-starter.vercel.app`
- **Environment:** Production

### 5. NEXT_PUBLIC_SITE_NAME
- **Value:** `Scalev Storefront`
- **Environment:** Production, Preview, Development

---

## 📝 Steps to Add

1. Go to: https://vercel.com/ramadhani-mataru-s-projects/scalev-storefront-starter/settings/environment-variables
2. Click "Add New"
3. Enter variable name and value
4. Select environments (Production, Preview, Development)
5. Click "Save"
6. Repeat for all 5 variables
7. Redeploy: `npx vercel --prod`

---

## ⚠️ Important

After adding environment variables, you MUST redeploy for changes to take effect.

Run: `npx vercel --prod`

---

**Current Status:** Deployed but needs environment variables to work properly.
