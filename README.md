# 🛍️ Scalev Storefront Starter

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)

Production-ready e-commerce storefront template built with Next.js 16, TypeScript, Tailwind CSS 4, and shadcn/ui. Powered by [Scalev Storefront API v3](https://scalev.com).

## ✨ Features

- 🛒 **Complete E-commerce**: Products, Cart, Checkout, Order Tracking
- 🎨 **Modern UI**: Meta/Facebook Blue theme with shadcn/ui components
- 🔐 **Authentication**: Customer login & registration
- 📦 **Order Management**: Real-time order tracking
- 🚀 **Performance**: Next.js 16 with Turbopack
- 📱 **Responsive**: Mobile-first design
- 🎯 **Type-safe**: Full TypeScript support
- 🔒 **Secure**: Environment-based configuration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Scalev account ([Sign up](https://dashboard.scalev.com))
- Store ID and Storefront API Key

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/scalev-storefront-starter.git
cd scalev-storefront-starter

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Add your Scalev credentials to .env.local
# NEXT_PUBLIC_SCALEV_STORE_ID=your_store_id
# NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY=your_api_key

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

- [Setup Guide](SETUP_GUIDE.md) - Detailed setup instructions
- [Quick Start](QUICK_START.md) - Get started in 5 minutes
- [Security](SECURITY.md) - Security best practices
- [Contributing](CONTRIBUTING.md) - How to contribute

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **API**: Scalev Storefront API v3
- **Fonts**: Rubik, Nunito Sans

## 📁 Project Structure

```
scalev-storefront-starter/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── lib/
│   │   ├── api/         # Scalev API client
│   │   └── stores/      # Zustand stores
│   └── styles/          # Global styles
├── .env.example         # Environment template
├── .env.local          # Your credentials (gitignored)
└── ...
```

## 🔐 Environment Variables

Required variables in `.env.local`:

```bash
NEXT_PUBLIC_SCALEV_API_BASE=https://api.scalev.com
NEXT_PUBLIC_SCALEV_STORE_ID=your_store_id
NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY=your_api_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Store Name
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🙏 Acknowledgments

- [Scalev](https://scalev.com) - E-commerce API
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Vercel](https://vercel.com) - Hosting platform

## 📞 Support

- 📖 [Scalev Documentation](https://docs.scalev.com)
- 💬 [GitHub Issues](https://github.com/YOUR_USERNAME/scalev-storefront-starter/issues)
- 📧 [Scalev Support](https://scalev.com/support)

---

**Made with ❤️ for the Scalev community**
