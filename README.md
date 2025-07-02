# Five Iron Golf - Next.js App

> A modern recreation of the Five Iron Golf website built with Next.js, featuring indoor golf simulators and premium experiences.

## 🚀 Tech Stack

- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS v4** (CSS-first config)
- **shadcn/ui** components with custom variants
- **Lucide** icons
- **OriginUI** for components- **Motion** for animations
- **React Hook Form + Zod** for validation

## ✨ Features

### 🎨 Design System

- **Dark theme** optimized for Five Iron Golf branding
- **Custom color palette** with brand green (`#bff300`), orange, and navy
- **Typography** using Work Sans, Rawson, and Times fonts
- **Component variants** for buttons, selects, and forms

### 🧩 Components Built

- **Header/Navigation** with responsive mega menus
- **Rotating Text Circle** with scroll-driven animations
- **Neon Glow Buttons** matching original site design
- **Location Cards** with distance calculations
- **Subscribe Form** with full validation
- **Button & Select** components with multiple variants

### 📍 Location Features

- **Geolocation integration** (GPS + IP fallback via Vercel)
- **Distance calculations** using Haversine formula
- **Nearest locations** hook with automatic sorting
- **International locations** (US, London, Italy, Russia, Cape Town)
- **Dynamic location pages** with custom content

### 🎯 Pages Created

- **Demo showcase** highlighting Next.js vs WordPress benefits
- **All locations** grid with search and filtering
- **Individual location** pages with detailed information
- **Newsletter signup** with responsive form validation

## 🏗️ Architecture

src/
├── app/ # Next.js App Router
├── components/
│ ├── ui/ # shadcn base components
│ ├── layout/ # Header, Footer
│ └── custom/ # Five Iron specific components
├── hooks/ # Custom React hooks
├── lib/ # Utilities and helpers
└── types/ # TypeScript definitions

## 🎪 Key Innovations

- **Scroll-driven animations** with rotating text circles
- **Geolocation-based** location finder
- **Custom theme system** with dark mode support
- **Responsive design** optimized for mobile-first
- **International expansion** ready with timezone support

## 🚀 Getting Started

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open http://localhost:3000 to experience the premium Five Iron Golf interface.

## 🎯 Why Next.js over WordPress?

- **3x faster loading times**
- **Better SEO and Core Web Vitals**
- **Mobile-optimized responsive design**
- **Modern developer experience with TypeScript**
- **Scalable architecture for international expansion**

## 📝 License

MIT
