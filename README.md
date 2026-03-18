# 3uck.store

**Deine Plattform für 3D-Druck-Modelle und physische Prints.**

Kostenlos. Ohne Gebühren. Deine Kontrolle.

---

## 🎯 Was ist 3uck.store?

**3uck.store ist ein Marketplace für 3D-Druck-Services**, der als Etsy-ähnliche Plattform konzipiert ist.

- **Verkäufer** = Drucker-Besitzer (Store Owners)
- **Kunden** bestellen Druckaufträge
- **Plattform** = Etsy-ähnlich, aber für 3D-Druck

### 🏪 Konzept

- **Eigener Store-Slug** – `3uck.store/dein-name`
- **Store Dashboard** – Listings, Orders, Analytics
- **Multi-Vendor** – Mehrere Stores in einer Plattform
- **Regional-Fokus** – Lokaler P2P-Druck in Deutschland

### 🎨 Features

- **Stores** – Name, Beschreibung, Logo, Drucker-Details
- **Listings** – STL-Dateien, Preise pro Gramm
- **Categories** – Organisiere deine Produkte
- **Orders** – Order Management, History, Tracking
- **Freemium** – Kostenlos starten, später upgraden
- **Revenue Share** – Maximale Einnahmen für STL Sales

---

## 🚀 Tech-Stack

### Frontend
- **Next.js 15** (App Router) mit Turbopack
- **React 19**
- **TypeScript**
- **TailwindCSS 4 + Shadcn/ui** für Styling

### Backend
- **Supabase**
  - Backend / Database
  - Authentifizierung (Auth.js / NextAuth)
  - Realtime & Storage
- **Vercel** für Deployment

### Repository
- **Turborepo-Monorepo** Setup
- Multi-Vendor-Support
- Git Workflow: dev → main

---

## 📦 Installation

### 1. Repository klonen

```bash
git clone git@github.com:achu94/3uck.store.git
cd 3uck.store
```

### 2. Dependencies installieren

```bash
npm install
# oder
yarn install
# oder
pnpm install
```

### 3. Environment Variablen konfigurieren

Erstelle eine `.env.local` Datei im Root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Auth.js / NextAuth
NEXTAUTH_URL=http://localhost:3000
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Entwicklungsserver starten

```bash
npm run dev
# oder
yarn dev
# oder
pnpm dev
```

**Öffne:** http://localhost:3000

---

## 📂 Projekt-Struktur

```
src/
├── app/
│   ├── (protected)/          # Geschützte Routes
│   │   ├── store/
│   │   │   ├── page.tsx      # Store Dashboard
│   │   │   ├── create/       # Store erstellen Wizard
│   │   │   ├── edit/[id]/    # Store editieren
│   │   │   └── categories/   # Category Management
│   │   ├── listings/
│   │   │   ├── create/       # Listing erstellen
│   │   │   └── edit/[id]/    # Listing editieren
│   │   └── settings/        # User Settings
│   ├── [storeSlug]/          # Public Store Pages
│   │   └── page.tsx
│   ├── auth/
│   │   ├── signin/
│   │   ├── signup/
│   │   └── error/
│   ├── marketplace/           # Marketplace (Q4)
│   │   ├── page.tsx          # Discovery
│   │   └── search/
│   ├── api/
│   │   ├── stores/
│   │   ├── listings/
│   │   ├── orders/
│   │   └── payments/
│   └── page.tsx              # Home
├── components/
│   ├── ui/                   # Shadcn/ui Components
│   ├── buttons/
│   ├── forms/
│   └── modals/
├── services/
│   ├── store.ts
│   ├── listing.ts
│   ├── order.ts
│   └── user.ts
├── types/
│   ├── store.ts
│   ├── listing.ts
│   ├── order.ts
│   └── user.ts
├── lib/
│   ├── auth.ts
│   ├── supabaseClient.ts
│   └── utils.ts
└── middleware.ts
```

---

## 🧪 Testing

```bash
npm run test
# oder
yarn test
```

---

## 🚀 Deployment

### GitHub Actions + Docker

Das Projekt verwendet GitHub Actions für CI/CD und Docker für Deployment.

**Workflow:**
1. Push zu GitHub
2. GitHub Actions triggert
3. Docker Container bauen
4. Container deployen

---

## 📅 Roadmap

### Q1 2025 - Foundation (Jan - Mar)
- ✅ Store CRUD (erstellen, editieren, löschen)
- ✅ Category CRUD
- ✅ Item (Listing) CRUD
- ✅ Store Dashboard
- ✅ User Settings
- ✅ Public Store Page
- ✅ Mobile Responsive Design

### Q2 2025 - Payment & Orders (Apr - Jun)
- ✅ Payment Integration (Stripe)
- ✅ Order System
- ✅ Order History
- ✅ Checkout Flow
- ✅ Order Notifications
- ✅ Payment Tests

### Q3 2025 - STL Sales & Revenue Share (Jul - Sep)
- ✅ STL File Upload
- ✅ STL Sales Feature
- ✅ Revenue Share System
- ✅ Share Settings
- ✅ Commission Tracking

### Q4 2025 - Marketplace (Okt - Dez)
- ✅ Featured Store Products
- ✅ Discovery Page
- ✅ Search & Filters
- ✅ Store Directory
- ✅ Reviews & Ratings

### Backlog - Nice to Have
- 🌙 Dark Mode Toggle
- 📊 Store Analytics
- 📧 Email Notifications
- 📖 API Documentation
- 📱 Mobile App (PWA)
- 📤 Social Sharing
- 🔍 Advanced Search
- ❤️ Wishlist / Favorites
- 🏷️ Discount Codes

---

## 🤝 Contributing

Wir freuen uns über Beiträge!

### Entwicklung

1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feat/amazing-feature`)
3. Commit deine Änderungen (`git commit -m 'feat: amazing feature'`)
4. Push zum Branch (`git push origin feat/amazing-feature`)
5. Erstelle einen Pull Request

### Code Style

- ✅ Atomic Commits
- ✅ Conventional Commits
- ✅ TypeScript Strict Mode
- ✅ ESLint & Prettier

---

## 📄 Lizenz

MIT License - siehe LICENSE Datei

---

## 👤 Kontakt

- **GitHub:** https://github.com/achu94/3uck.store
- **Issues:** https://github.com/achu94/3uck.store/issues
- **Discussions:** https://github.com/achu94/3uck.store/discussions

---

**Viel Spaß beim Entwickeln!** 💻🚀
