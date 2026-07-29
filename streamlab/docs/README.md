# StreamLab — Educational Nuxt 3 Streaming Platform

> **A reference implementation of a modern video streaming platform** built with Nuxt 3, Vue 3, Pinia, and adaptive streaming (HLS/DASH). Designed for learning — not for piracy.

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.11-00DC82?logo=nuxt.js)](https://nuxt.com/)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-42B883?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🎯 What Is This?

**StreamLab** is a **complete, production-grade reference architecture** for a video streaming platform. It demonstrates:

- **Hybrid SSR/SPA rendering** with Nuxt 3 (SEO-critical pages SSR, player SPA)
- **Adaptive bitrate streaming** (HLS + DASH) with quality selection, subtitles, audio tracks
- **Pinia state management** with persistence (auth, player, continue-watching)
- **Multi-locale i18n** (7 languages: en, hi, ur, fil, ar, fr, id) with RTL support
- **BFF pattern** via Nitro server routes (decoupled frontend/backend)
- **Component-driven UI** with Tailwind CSS + Video.js
- **Observability hooks** (Tango-style tracing, Prometheus metrics, structured logging)

**Content is 100% legal** — uses Blender open movies (Big Buck Bunny, Sintel, Tears of Steel) and synthetic test streams.

---

## 🏗️ Architecture at a Glance

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT (Browser)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Nuxt 3 App (Vue 3.5 + TypeScript)                                           │
│  ├── Pages: Home, Search, Movie/Series Detail (SSR), Player (SPA)           │
│  ├── Components: MovieCard, HeroBanner, VideoPlayer, QualitySelector, ...   │
│  ├── Stores: auth, player, ui, video, continueWatching (Pinia + persist)    │
│  ├── Composables: useApi, usePlayer, useAuth, useVideo, useCategories       │
│  └── i18n: 7 locales, RTL support, SEO alternate links                      │
└────────────────────────────────┬──────────────────────────────────────────────┘
                                 │ HTTPS/REST
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           NUXT SSR SERVER (Node.js :3000)                    │
│  Nitro Server                                                                 │
│  ├── SSR Rendering (Vue Server Renderer)                                    │
│  ├── API Routes (/api/*) — BFF Layer                                        │
│  ├── Middleware: auth, i18n, rate-limit, logging                            │
│  └── Route Rules: SSR/SPA/ISR per path                                      │
└────────────────────────────────┬──────────────────────────────────────────────┘
                                 │ Internal (mock → real CMS/CDN)
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CONTENT & DELIVERY                                │
│  ├── Metadata: Mock DB → replace with Directus/Strapi/Sanity                │
│  ├── Transcoding: FFmpeg → HLS/DASH (multi-bitrate)                         │
│  ├── Storage: Cloudflare R2 / AWS S3 / Alibaba OSS                          │
│  ├── CDN: Cloudflare / Bunny / Alibaba Cloud CDN                            │
│  └── DRM: Widevine/PlayReady via Axinom/EZDRM (optional)                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Core Features

| Feature | Implementation |
|---------|----------------|
| **Movie/Series Catalog** | SSR pages with SEO meta, JSON-LD structured data |
| **Adaptive Video Player** | Video.js + hls.js + dash.js, quality selector, PiP, keyboard shortcuts |
| **Multi-language** | 7 locales, RTL (Arabic/Urdu), browser detection, cookie persistence |
| **Auth & VIP** | JWT in httpOnly cookies, Pinia persist, subscription tiers (free/vip/premium) |
| **Continue Watching** | Resume position saved per video (localStorage + API sync) |
| **Search & Filter** | Debounced search, genre/category filters, infinite scroll |
| **Admin-ready** | Role-based access, content management endpoints |
| **Observability** | Structured logs, Prometheus `/metrics`, Tango-style trace headers |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 20.10 (LTS recommended)
- **pnpm** ≥ 9.0 (or npm/yarn)
- **Git**
- Optional: **Docker** for containerized deploy

### Install & Run

```bash
# 1. Clone
git clone https://github.com/your-org/streamlab.git
cd streamlab

# 2. Install dependencies
pnpm install

# 3. Copy environment template
cp .env.example .env

# 4. Start development server
pnpm dev

# 5. Open http://localhost:3000
```

### Environment Variables

```bash
# .env
# ─── App ───
NUXT_APP_ENV=development          # development | test | production
NUXT_PUBLIC_API_BASE=http://localhost:3000/api
NUXT_PUBLIC_VIDEO_CDN_BASE=https://cdn.example.com

# ─── Auth ───
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRY=7d

# ─── Video (when using real CDN) ───
MUX_TOKEN_ID=                     # Mux.com credentials
MUX_TOKEN_SECRET=
CLOUDFLARE_R2_ACCOUNT_ID=
CLOUDFLARE_R2_ACCESS_KEY_ID=
CLOUDFLARE_R2_SECRET_ACCESS_KEY=

# ─── Observability ───
TANGO_ENABLED=false
PROMETHEUS_PORT=9100
```

---

## 📁 Project Structure

```
streamlab/
├── app/                    # Frontend application (Nuxt 3)
│   ├── components/         # Vue components (UI, movie, player, layout)
│   ├── composables/        # VueUse-style composables (useApi, usePlayer, ...)
│   ├── layouts/            # Page layouts (default, player, error)
│   ├── middleware/         # Route middleware (auth, i18n, player)
│   ├── pages/              # File-based routing (SSR + SPA)
│   ├── plugins/            # Nuxt plugins (videojs, pinia, i18n)
│   ├── stores/             # Pinia stores (auth, player, ui, video, ...)
│   ├── utils/              # Helpers (format, player, url)
│   └── assets/             # CSS, locales, static assets
├── server/                 # Nitro server (BFF + API)
│   ├── routes/             # API routes (/api/**)
│   ├── middleware/         # Server middleware (rate-limit, cors, logging)
│   └── utils/              # Server utils (mockDb, jwt)
├── public/                 # Static files served at root
├── tests/                  # Vitest (unit) + Cypress (e2e)
├── docs/                   # Additional documentation
├── .github/workflows/      # CI/CD pipelines
├── nuxt.config.ts          # Main Nuxt configuration
├── tailwind.config.ts      # Tailwind theme (MovieBox-inspired)
├── tsconfig.json           # TypeScript config
└── package.json
```

See [STRUCTURE.md](STRUCTURE.md) for detailed code style and naming rules.

---

## 🧪 Testing

```bash
# Unit tests (Vitest)
pnpm test:unit

# E2E tests (Cypress)
pnpm test:e2e

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

---

## 📦 Build & Deploy

### Production Build

```bash
pnpm build
pnpm preview  # Test production build locally
```

### Deploy Targets

| Platform | Command | Notes |
|----------|---------|-------|
| **Vercel** | `vercel deploy` | Zero-config, edge functions |
| **Netlify** | `netlify deploy --prod` | Edge handlers via `@netlify/functions` |
| **Docker** | `docker build -t streamlab .` | Multi-stage, standalone output |
| **Node.js** | `node .output/server/index.mjs` | Nitro standalone (PM2, systemd) |
| **Cloudflare Pages** | `wrangler pages deploy .output/public` | Edge runtime via `@cloudflare/pages` |

### Docker Example

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

---

## 🔧 Development Workflow

### Adding a New Page

1. Create `app/pages/new-page.vue`
2. Add route middleware if needed (`app/middleware/`)
3. Create components in `app/components/`
4. Add API route in `server/routes/api/` if backend needed
5. Add locale strings in `app/assets/locales/*.json`
6. Write tests in `tests/`

### Adding a New API Endpoint

```typescript
// server/routes/api/resource/[id].get.ts
import { defineEventHandler, getRouterParam, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const data = await getResource(id)
  if (!data) throw createError({ statusCode: 404 })
  return { success: true, data }
})
```

### Database Migration (When Adding Real DB)

```bash
# Using Drizzle ORM (recommended)
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

---

## 📚 Documentation Index

| Document | Purpose |
|----------|---------|
| [AGENTS.md](AGENTS.md) | AI agent behavioral guidelines & constraints |
| [PRD.md](PRD.md) | Product requirements, user stories, features |
| [COMMANDS.md](COMMANDS.md) | Executable commands, scripts, flags |
| [STRUCTURE.md](STRUCTURE.md) | Directory layout, code style, naming rules |
| [EVALUATION.md](EVALUATION.md) | Safety layers, token budgets, validation, test criteria |

---

## 🎓 Learning Objectives

This project teaches:

1. **Nuxt 3 Hybrid Rendering** — when to SSR vs SPA, route rules, caching
2. **Video Streaming Architecture** — HLS/DASH, multi-CDN fallback, DRM concepts
3. **State Management** — Pinia stores, persistence, cross-tab sync
4. **BFF Pattern** — Nitro server routes as API gateway
5. **i18n at Scale** — 7 locales, RTL, SEO, lazy-loaded translations
6. **Observability** — Structured logging, metrics, distributed tracing
7. **Type-Safe Full Stack** — End-to-end TypeScript with shared types
8. **Testing Strategy** — Unit (Vitest), Component (Vue Test Utils), E2E (Cypress)

---

## ⚖️ Legal & Ethical Notice

> **StreamLab is an educational reference implementation.**
>
> - All included content is **public domain** (Blender Foundation movies) or **synthetic test streams** (Mux, SVTA).
> - **No pirated content, no unauthorized streams, no cyberlocker integrations.**
> - The architecture patterns demonstrated are industry-standard and used by legitimate streaming services (Netflix, Disney+, Mux, Cloudflare Stream).
> - If you deploy this, **you are responsible for licensing any content you serve**.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Follow code style (see [STRUCTURE.md](STRUCTURE.md))
4. Add tests for new functionality
5. Ensure all checks pass: `pnpm check` (lint + typecheck + test)
6. Submit a PR with clear description

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- **Nuxt Team** — Amazing framework
- **Video.js + hls.js + dash.js** — Open source player ecosystem
- **Blender Foundation** — Big Buck Bunny, Sintel, Tears of Steel (CC BY 3.0)
- **Mux** — Test streams and video infrastructure inspiration
- **SVTA** — Common Media Test Streams
- **Tailwind CSS** — Utility-first styling