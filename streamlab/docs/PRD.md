# PRD.md — Product Requirements Document

> **StreamLab: Educational Streaming Platform Reference Implementation**
> Version 1.0 | Status: Active Development | Owner: Engineering

---

## 📌 Document Control

| Field | Value |
|-------|-------|
| **Product** | StreamLab |
| **Version** | 1.0.0 |
| **Status** | Active Development |
| **Author** | Engineering Team |
| **Reviewers** | Tech Lead, Security, Legal |
| **Last Updated** | 2024 |
| **Classification** | Internal — Educational |

---

## 1. Executive Summary

### 1.1 Purpose
StreamLab is a **production-grade reference implementation** of a video streaming platform built with Nuxt 3. It demonstrates industry-standard patterns for adaptive bitrate streaming, hybrid SSR/SPA rendering, multi-locale support, and observability — **using only legal, public-domain content**.

### 1.2 Scope
- **In Scope**: Frontend (Nuxt 3), BFF API (Nitro), Player (Video.js), State (Pinia), i18n, Auth, Testing, CI/CD
- **Out of Scope**: Transcoding pipeline, CDN configuration, DRM key management, Content licensing, Payment processing

### 1.3 Success Criteria
| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | 100 |
| TypeScript Strict | Zero errors |
| Test Coverage (Unit) | ≥ 80% |
| Test Coverage (E2E) | 100% critical paths |
| Bundle Size (JS) | < 200KB gzipped |
| Time to First Byte (SSR) | < 200ms |
| Time to Interactive (Player) | < 3s |

---

## 2. Problem Statement

### 2.1 Learning Gap
Developers building streaming platforms face:
- Fragmented documentation across Nuxt, Video.js, HLS/DASH, Pinia, i18n
- No complete reference showing SSR + Player coexistence
- Unclear patterns for BFF architecture with Nitro
- Missing RTL + multi-locale streaming examples
- No legal test content pipeline

### 2.2 Solution
StreamLab provides a **complete, cloneable, deployable reference** that teaches by example — every pattern is production-ready and legally safe.

---

## 3. User Personas

| Persona | Description | Primary Goals |
|---------|-------------|---------------|
| **Learner** | Mid-level dev learning streaming architecture | Understand patterns, copy code, experiment safely |
| **Evaluator** | Tech lead assessing Nuxt 3 for production | Verify performance, scalability, DX |
| **Contributor** | OSS contributor improving the reference | Consistent patterns, clear contribution path |

---

## 4. Functional Requirements

### 4.1 Content Discovery (Epic: Discovery)

#### FR-1: Home Page
- **SSR** with 60s SWR caching
- Sections: Hero, Continue Watching, Trending, 6× Category Rows
- SEO: Full meta, Open Graph, Twitter Card, JSON-LD `ItemList`
- Responsive: 1–6 columns based on breakpoint

#### FR-2: Search
- Debounced (300ms) autocomplete + full results
- Filters: Type, Genre, Year, Language, Sort
- URL-synced state (shareable links)
- Infinite scroll with IntersectionObserver
- SSR initial results, SPA subsequent pages

#### FR-3: Movie Detail
- SSR with 300s SWR
- Data: Title, Poster, Backdrop, Description, Release, Duration, Rating, Genres, Cast, Director
- Actions: Play (→ Player), Add to List, Share
- SEO: JSON-LD `Movie` schema, canonical, hreflang

#### FR-4: Series Detail
- SSR with 300s SWR
- Season picker (tabs/dropdown)
- Episode grid: Number, Title, Duration, Progress badge, Thumbnail
- Play episode → Player with series context

#### FR-5: Category/Genre Pages
- SSR with 60s SWR
- Pagination (cursor-based)
- Sort: Trending, Latest, A-Z, Rating
- URL: `/category/[slug]?page=2&sort=trending`

### 4.2 Video Playback (Epic: Player)

#### FR-6: Universal Player Page
- **SPA mode** (no SSR) — `/player/[contentId]` or `/player/[seriesId]/[season]/[episode]`
- Video.js 8 + hls.js + dash.js
- Sources: HLS primary, DASH fallback, multiple qualities
- Controls: Play/Pause, Seek, Volume, Fullscreen, PiP, Speed, Quality, Subtitles, Audio

#### FR-7: Adaptive Bitrate Streaming
- HLS: Master playlist → variant playlists → segments
- DASH: MPD → Representations → Segments
- Quality selector: Auto / 1080p / 720p / 480p / 360p
- ABR: Auto-switch based on bandwidth (hls.js/dash.js default)

#### FR-8: Subtitles & Audio Tracks
- WebVTT subtitles loaded via `<track>`
- Multiple languages, default by user locale
- Audio track switching (dubs) via Video.js audioTracks API
- External subtitle loading (future)

#### FR-9: Resume Playback
- Position saved every 10s to Pinia + localStorage
- Synced to API on pause/end (debounced)
- Restored on revisit with "Resume from X:XX" toast
- Cross-tab sync via storage event

#### FR-10: Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `Space` / `K` | Play/Pause |
| `←` / `→` | Seek ±10s |
| `J` / `L` | Seek ±30s |
| `↑` / `↓` | Volume ±10% |
| `M` | Mute/Unmute |
| `F` | Fullscreen |
| `P` | Picture-in-Picture |
| `0-9` | Seek to 0-90% |
| `C` | Toggle subtitles |

#### FR-11: Error Handling & Fallback
- HLS load error → Auto-switch to DASH source
- DASH load error → Show retry button + "Report Issue"
- Segment error → Retry 3x with exponential backoff
- DRM error (future) → Clear messaging + support link

### 4.3 Authentication & Access (Epic: Auth)

#### FR-12: Auth Flows
- Email/password registration + login
- Google OAuth 2.0 (PKCE)
- JWT in httpOnly Secure SameSite=Lax cookie
- Refresh token rotation (stored in DB, not localStorage)
- Password reset via email token

#### FR-13: Subscription Tiers
| Tier | Content Access | Concurrent Streams | Quality |
|------|----------------|-------------------|---------|
| Free | Preview only (first 6:50) | 1 | 720p |
| VIP | Full library | 2 | 1080p |
| Premium | Full + Early Access | 4 | 4K (future) |

#### FR-14: Protected Routes
- Middleware: `/profile/**`, `/player/**` (VIP content)
- Redirect to `/auth/login?redirect=...`
- Post-login redirect preserved

### 4.4 User Profile (Epic: Profile)

#### FR-15: Profile Dashboard
- Tabs: Overview, Subscription, Watch History, Continue Watching, Settings
- Continue Watching: Horizontal scroll, resume button, progress ring
- Watch History: Paginated, filterable, "Remove from History"
- Settings: Language, Theme, Playback Defaults, Email Preferences

### 4.5 Internationalization (Epic: i18n)

#### FR-16: Supported Locales
| Code | Language | Direction | Status |
|------|----------|-----------|--------|
| `en` | English | LTR | Complete |
| `hi` | Hindi (हिन्दी) | LTR | Complete |
| `ur` | Urdu (اردو) | RTL | Complete |
| `fil` | Filipino | LTR | Complete |
| `ar` | Arabic (العربية) | RTL | Complete |
| `fr` | Français | LTR | Complete |
| `id` | Bahasa Indonesia | LTR | Complete |

#### FR-17: i18n Features
- Lazy-loaded locale chunks
- Browser language detection (cookie override)
- URL prefix strategy: `/hi/movie/123` (except default `en`)
- RTL: Logical CSS properties, mirrored layout, RTL player controls
- Date/Number formatting per locale
- SEO: `hreflang` alternate links, localized sitemaps

### 4.6 Admin (Epic: Admin — Stretch)

#### FR-17: Content Management
- CRUD: Movies, Series, Seasons, Episodes
- Upload: Poster, Backdrop, Video (triggers transcode)
- Metadata: Genres, Cast, Crew, Ratings, Restrictions

#### FR-18: User Management
- List, Search, Impersonate, Ban, Role assignment
- Subscription status override

---

## 5. Non-Functional Requirements

### 5.1 Performance
| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Time to Interactive | < 3.5s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| API Response (p95) | < 200ms | Prometheus |
| Player Start Time | < 3s | Custom metric |

### 5.2 Scalability
- **Horizontal**: Stateless Node.js (Nitro) — scale via replicas
- **Caching**: CDN for static assets, SWR for API, Redis for sessions
- **Database**: Connection pooling, read replicas for queries
- **Video**: CDN handles segment delivery; origin only for manifests

### 5.3 Reliability
- **Uptime**: 99.9% (excluding planned maintenance)
- **Error Rate**: < 0.1% for playback starts
- **Graceful Degradation**: Player works without API (local fallback)
- **Recovery**: Auto-restart on crash (PM2/K8s), health checks

### 5.4 Security
- **Headers**: CSP, HSTS, X-Frame-Options, Referrer-Policy
- **Cookies**: httpOnly, Secure, SameSite=Lax
- **CSP**: `script-src 'self' 'unsafe-inline'` (Video.js inline), `media-src *`
- **Rate Limiting**: 100 req/min/IP on auth, 1000 req/min on API
- **Validation**: Zod on all inputs (client + server)
- **Dependencies**: `pnpm audit` in CI, Dependabot alerts

### 5.5 Accessibility (WCAG 2.1 AA)
- Semantic HTML5
- ARIA labels on player controls
- Focus management (modal trap, skip links)
- Color contrast ≥ 4.5:1
- Keyboard navigation everywhere
- Screen reader tested (NVDA, VoiceOver)
- Captions default ON for new users

### 5.6 Browser Support
| Browser | Version | Notes |
|---------|---------|-------|
| Chrome | ≥ 118 | Full support |
| Firefox | ≥ 119 | Full support |
| Safari | ≥ 17 | HLS native, DASH via dash.js |
| Edge | ≥ 118 | Full support |
| Mobile Safari | iOS 17+ | HLS native, PiP supported |
| Chrome Android | ≥ 118 | Full support |

---

## 6. Technical Architecture

### 6.1 Frontend (Nuxt 3)
```
App (Vue 3.5 + TS)
├── Pages (File-based routing)
├── Layouts (Default, Player, Error)
├── Components (UI, Movie, Player, Layout)
├── Composables (useApi, usePlayer, useAuth, ...)
├── Stores (Pinia: Auth, Player, UI, Video, ContinueWatching)
├── Plugins (Video.js, i18n, Pinia persist)
├── Middleware (Auth, i18n, Player cleanup)
└── Assets (CSS, Locales, Fonts)
```

### 6.2 Server (Nitro)
```
Server Routes (/api/**)
├── Movies (CRUD, Sources, Hero, ByCategory)
├── Series (CRUD, Episodes, Sources)
├── Categories (Tree, Flat)
├── Search (Query, Suggestions)
├── Auth (Login, Register, Refresh, Me, OAuth)
├── ContinueWatching (List, Add, Update, Delete)
├── Users (Profile, Subscription, History)
└── Health/Metrics (/api/_health, /api/_metrics)
```

### 6.3 Data Flow
```
User Action → Component → Composable → Pinia Action → API Route → MockDB/RealDB
                                                    ↓
                                              Response → Pinia State → Component Re-render
```

### 6.4 Video Pipeline (Reference Only)
```
Source (MP4/MKV) 
  → FFmpeg Transcode (HLS + DASH, 5 qualities) 
  → Package (Shaka Packager for DRM) 
  → Upload (R2/S3) 
  → CDN (Cloudflare/Bunny) 
  → Manifest URLs stored in CMS 
  → API returns signed URLs 
  → Player loads manifest
```

---

## 7. Data Models

### 7.1 Movie
```typescript
interface Movie {
  id: string              // UUID
  type: 'movie'
  title: string
  description: string
  poster: string          // CDN URL
  backdrop: string        // CDN URL
  releaseDate: string     // ISO 8601
  duration: number        // Minutes
  rating: string          // G, PG, PG-13, R, etc.
  language: string        // ISO 639-1
  genres: string[]        // Genre IDs
  cast: string[]          // Actor names
  director?: string
  requiresVip: boolean
  imdbId?: string
  tmdbId?: number
  createdAt: string
  updatedAt: string
}
```

### 7.2 Series
```typescript
interface Series {
  id: string
  type: 'series'
  title: string
  description: string
  poster: string
  backdrop: string
  firstAirDate: string
  lastAirDate: string
  language: string
  genres: string[]
  cast: string[]
  requiresVip: boolean
  seasons: Season[]
  imdbId?: string
  tmdbId?: number
}

interface Season {
  seasonNumber: number
  episodeCount: number
  episodes: Episode[]
}

interface Episode {
  id: string
  seasonNumber: number
  episodeNumber: number
  title: string
  description: string
  duration: number
  thumbnail: string
  requiresVip: boolean
}
```

### 7.3 Video Sources
```typescript
interface VideoSource {
  id: string
  type: 'hls' | 'dash' | 'mp4'
  url: string
  quality: 'auto' | '1080p' | '720p' | '480p' | '360p' | '240p'
  codec: string           // avc1.42001f, hev1.1.6.L93.90
  bitrate: number         // kbps
  isPrimary: boolean
  drm?: {
    type: 'widevine' | 'playready' | 'fairplay'
    licenseUrl: string
    certificateUrl?: string
  }
}

interface SubtitleTrack {
  id: string
  label: string           // "English", "हिन्दी"
  language: string        // ISO 639-1
  url: string             // WebVTT
  isDefault: boolean
  isForced: boolean
}

interface AudioTrack {
  id: string
  label: string           // "Original", "Hindi Dub"
  language: string
  url: string             // HLS/DASH audio-only
  isDefault: boolean
}
```

### 7.4 Continue Watching
```typescript
interface ContinueWatchingItem {
  contentId: string       // Movie ID or Series ID
  contentType: 'movie' | 'episode'
  title: string
  poster: string
  progress: number        // 0-1
  currentTime: number     // Seconds
  duration: number        // Seconds
  season?: number
  episode?: number
  updatedAt: string       // ISO 8601
}
```

---

## 8. API Contracts

### 8.1 Movies
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies` | List with filters (page, limit, genre, sort) |
| GET | `/api/movies/hero` | Hero movie for home |
| GET | `/api/movies/trending` | Trending movies |
| GET | `/api/movies/by-category` | Grouped by category |
| GET | `/api/movies/[id]` | Movie detail |
| GET | `/api/movies/[id]/sources` | Video sources + tracks |

### 8.2 Series
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/series` | List series |
| GET | `/api/series/[id]` | Series detail + seasons |
| GET | `/api/series/[id]/episodes` | Episodes for season |
| GET | `/api/series/[id]/sources` | Episode sources |

### 8.3 Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Flat list |
| GET | `/api/categories/tree` | Hierarchical |

### 8.4 Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search` | Query + filters |
| GET | `/api/search/suggestions` | Autocomplete |

### 8.5 Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Email/password |
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/refresh` | Refresh tokens |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Current user |
| POST | `/api/auth/forgot-password` | Request reset |
| POST | `/api/auth/reset-password` | Reset with token |
| GET | `/api/auth/google` | OAuth redirect |
| GET | `/api/auth/google/callback` | OAuth callback |

### 8.6 Continue Watching
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/continue-watching` | List items |
| POST | `/api/continue-watching` | Add/Update |
| DELETE | `/api/continue-watching/[id]` | Remove |

---

## 9. Content Strategy (Legal)

### 9.1 Included Content
| Title | Source | License | Duration |
|-------|--------|---------|----------|
| Big Buck Bunny | Blender Foundation | CC BY 3.0 | 9:56 |
| Elephants Dream | Blender Foundation | CC BY 3.0 | 10:53 |
| Sintel | Blender Foundation | CC BY 3.0 | 14:48 |
| Tears of Steel | Blender Foundation | CC BY 3.0 | 12:14 |
| Cosmos Laundromat | Blender Studio | CC BY 4.0 | 12:10 |
| Mux Test Streams | Mux Inc. | MIT | Various |
| SVTA Reference Streams | SVTA | BSD-3 | Various |

### 9.2 Content Metadata
- All metadata manually curated (no auto-scraping)
- Genres: Animation, Sci-Fi, Short, Demo
- Languages: English (original), subtitle tracks in 7 locales
- No real movie/TV data — prevents confusion with pirate sites

---

## 10. Milestones & Roadmap

### Phase 1: Foundation (Weeks 1-3) ✅
- [x] Nuxt 3 project setup + TypeScript + Tailwind
- [x] Pinia stores (Auth, Player, UI, ContinueWatching)
- [x] i18n with 7 locales + RTL
- [x] Nitro API routes structure
- [x] CI/CD pipeline (GitHub Actions)
- [x] Testing setup (Vitest + Cypress)

### Phase 2: Core Features (Weeks 4-7)
- [ ] Home page with SSR + category rows
- [ ] Movie/Series detail pages + SEO
- [ ] Video.js player + HLS/DASH + quality selector
- [ ] Subtitles + Audio tracks
- [ ] Continue watching persistence
- [ ] Search + Filters

### Phase 3: Auth & Profile (Weeks 8-10)
- [ ] JWT Auth + Google OAuth
- [ ] Protected routes + middleware
- [ ] User profile + Continue Watching sync
- [ ] Subscription tiers (mock)

### Phase 4: Polish (Weeks 11-12)
- [ ] Accessibility audit + fixes
- [ ] Performance optimization
- [ ] RTL visual regression tests
- [ ] Documentation completion
- [ ] Deploy to Vercel + Cloudflare Pages

### Phase 5: Stretch (Post-v1)
- [ ] Admin CMS
- [ ] Real transcoding pipeline docs
- [ ] DRM integration guide (Axinom/EZDRM)
- [ ] Analytics dashboard (PostHog)
- [ ] Mobile app (Capacitor)

---

## 11. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Video.js SSR issues | High | Medium | Player page = SPA only; `<ClientOnly>` wrapper |
| hls.js/dash.js bundle size | Medium | High | Dynamic import, code splitting, ES modules |
| i18n locale chunk loading | Medium | Low | Preload default, lazy load others |
| Pinia persistence hydration | Medium | Medium | Test SSR → client transition thoroughly |
| Legal content confusion | Low | Critical | Clear README, no TMDB/IMDb integration, Blender only |
| Browser codec support | Medium | Medium | HLS + DASH dual, test matrix in CI |

---

## 12. Acceptance Criteria for v1.0

| ID | Criterion | Verification |
|----|-----------|--------------|
| AC-1 | Home page SSR with SEO meta | `curl / | grep 'og:title'` |
| AC-2 | Movie detail SSR + JSON-LD | `curl /movie/bbb | grep 'Movie'` |
| AC-3 | Player plays HLS + DASH | Cypress: play → assert video.duration > 0 |
| AC-4 | Quality selector works | Cypress: switch quality → assert level change |
| AC-5 | Subtitles load + toggle | Cypress: enable CC → assert track.mode=showing |
| AC-6 | Resume position saved | localStorage + API sync verified |
| AC-7 | Auth login + protected route | Cypress: login → access /profile |
| AC-8 | 7 locales switch + RTL | Manual: ar/ur layout mirrored |
| AC-9 | TypeScript strict passes | `pnpm typecheck` = 0 errors |
| AC-10 | Unit tests ≥ 80% | `pnpm test:unit --coverage` |
| AC-11 | E2E critical paths pass | `pnpm test:e2e` = 0 failures |
| AC-12 | Lighthouse CI ≥ 90/95/100 | GitHub Action passes |

---

## 13. Appendix

### A. Glossary
| Term | Definition |
|------|------------|
| **ABR** | Adaptive Bitrate Streaming |
| **BFF** | Backend for Frontend |
| **CDN** | Content Delivery Network |
| **CMAF** | Common Media Application Format |
| **CSP** | Content Security Policy |
| **DASH** | Dynamic Adaptive Streaming over HTTP |
| **HLS** | HTTP Live Streaming |
| **MPD** | Media Presentation Description (DASH manifest) |
| **SWR** | Stale-While-Revalidate |
| **VTT** | Web Video Text Tracks (subtitles) |

### B. References
- [Nuxt 3 Docs](https://nuxt.com/docs)
- [Video.js Guide](https://videojs.com/guides/)
- [hls.js Documentation](https://github.com/video-dev/hls.js/)
- [dash.js Reference](https://github.com/Dash-Industry-Forum/dash.js/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
- [Blender Open Movies](https://www.blender.org/download/demo-files/)
- [SVTA Test Streams](https://github.com/svta/common-media-test-streams)

---

*End of PRD. This document is the single source of truth for product scope. All changes require PRD update + stakeholder approval.*