# STRUCTURE.md — Project Structure & Conventions

> **StreamLab** — File organization, naming conventions, and architectural patterns

---

## 📁 Root Directory

```
streamlab/
├── .github/                    # GitHub workflows, issue templates
├── .vscode/                    # VS Code settings, extensions, launch.json
├── app/                        # Nuxt 3 app directory (client + SSR)
├── server/                     # Nitro server routes + middleware
├── shared/                     # Shared types, constants, utilities
├── tests/                      # Test files (unit, e2e, fixtures)
├── public/                     # Static assets (served at /)
├── assets/                     # Source assets (processed by Vite)
├── scripts/                    # Build/deploy/helper scripts
├── docs/                       # Additional documentation
├── .env.example                # Environment template
├── .env.dev                    # Development overrides (gitignored)
├── .gitignore
├── .eslintrc.cjs
├── .prettierrc
├── nuxt.config.ts              # Main Nuxt configuration
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── vitest.config.ts
├── cypress.config.ts
├── AGENTS.md                   # Agent instructions (this repo)
├── PRD.md                      # Product requirements
├── STRUCTURE.md                # This file
├── COMMANDS.md                 # Common commands reference
└── CHANGELOG.md
```

---

## 📂 `app/` — Nuxt Application

```
app/
├── app.vue                     # Root component (<NuxtPage /> + global UI)
├── error.vue                   # Global error boundary
├── layouts/
│   ├── default.vue             # Main layout (header, footer, sidebar)
│   ├── player.vue              # Full-screen player layout
│   ├── auth.vue                # Auth pages (centered card)
│   └── error.vue               # Error layout
├── pages/
│   ├── index.vue               # Home (SSR)
│   ├── search.vue              # Search (SSR initial)
│   ├── movie/
│   │   └── [id].vue            # Movie detail (SSR)
│   ├── series/
│   │   ├── [id].vue            # Series detail (SSR)
│   │   └── [id]/
│   │       └── season-[season].vue  # Season episodes
│   ├── player/
│   │   ├── [id].vue            # Movie player (SPA)
│   │   └── [seriesId]/
│   │       └── season-[season]/
│   │           └── episode-[episode].vue  # Episode player (SPA)
│   ├── category/
│   │   └── [slug].vue          # Genre/category listing (SSR)
│   ├── auth/
│   │   ├── login.vue
│   │   ├── register.vue
│   │   └── forgot-password.vue
│   ├── profile/
│   │   ├── index.vue           # Profile dashboard
│   │   ├── subscription.vue
│   │   ├── history.vue
│   │   └── settings.vue
│   └── admin/                  # Admin (optional)
│       ├── index.vue
│       ├── content.vue
│       └── users.vue
├── components/
│   ├── ui/                     # Base UI components (auto-imported)
│   │   ├── Button.vue
│   │   ├── Input.vue
│   │   ├── Select.vue
│   │   ├── Modal.vue
│   │   ├── Slider.vue
│   │   ├── Toast.vue
│   │   ├── Skeleton.vue
│   │   ├── Badge.vue
│   │   ├── Avatar.vue
│   │   ├── Dropdown.vue
│   │   ├── Tooltip.vue
│   │   └── index.ts            # Barrel export
│   ├── layout/
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   ├── Sidebar.vue
│   │   ├── PlayerBar.vue       # Persistent mini-player
│   │   └── LanguageSwitcher.vue
│   ├── movie/
│   │   ├── MovieCard.vue
│   │   ├── MovieRow.vue
│   │   ├── HeroBanner.vue
│   │   ├── DetailHeader.vue
│   │   ├── DetailMeta.vue
│   │   ├── CastList.vue
│   │   └── EpisodeList.vue
│   ├── player/
│   │   ├── VideoPlayer.vue     # Video.js wrapper
│   │   ├── QualitySelector.vue
│   │   ├── SubtitleSelector.vue
│   │   ├── AudioTrackSelector.vue
│   │   ├── PlayerControls.vue
│   │   ├── ProgressBar.vue
│   │   └── VolumeSlider.vue
│   ├── common/
│   │   ├── LazyImage.vue       # IntersectionObserver + blurhash
│   │   ├── InfiniteScroll.vue
│   │   ├── SearchInput.vue
│   │   ├── GenreFilter.vue
│   │   ├── RatingStars.vue
│   │   └── ShareButton.vue
│   └── admin/                  # Admin components
├── composables/
│   ├── useApi.ts               # Typed API client
│   ├── usePlayer.ts            # Player logic (play, seek, quality)
│   ├── useAuth.ts              # Auth helpers (login, logout, user)
│   ├── useVideo.ts             # Video metadata + sources
│   ├── useCategories.ts        # Category tree + filters
│   ├── useContinueWatching.ts  # Resume positions
│   ├── useI18n.ts              # Locale helpers
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useMediaQuery.ts
│   └── useKeyboardShortcuts.ts
├── stores/
│   ├── auth.ts                 # User, token, permissions
│   ├── player.ts               # Current video, sources, quality, subtitles
│   ├── ui.ts                   # Sidebar, modals, toasts, theme
│   ├── video.ts                # Video metadata cache
│   ├── categories.ts           # Category tree
│   └── continueWatching.ts     # Resume positions (persisted)
├── plugins/
│   ├── videojs.client.ts       # Video.js registration (client-only)
│   ├── pinia.ts                # Pinia persisted state config
│   ├── i18n.ts                 # i18n runtime config
│   └── analytics.client.ts     # PostHog/GA (client-only)
├── middleware/
│   ├── auth.ts                 # Protected routes
│   ├── guest.ts                # Redirect authenticated away from auth pages
│   ├── i18n.ts                 # Locale detection/redirect
│   └── player.ts               # Cleanup on player route leave
├── utils/
│   ├── format.ts               # time, bytes, numbers, dates
│   ├── player.ts               # codec detection, source helpers
│   ├── url.ts                  # URL builders, query helpers
│   ├── validation.ts           # Zod schemas (shared with server)
│   └── constants.ts            # App constants
├── assets/
│   ├── css/
│   │   └── main.css            # Tailwind + global styles
│   ├── locales/
│   │   ├── en.json
│   │   ├── hi.json
│   │   ├── ur.json
│   │   ├── fil.json
│   │   ├── ar.json
│   │   ├── fr.json
│   │   └── id.json
│   └── fonts/                  # Self-hosted fonts (optional)
└── types/
    ├── api.ts                  # API response types
    ├── video.ts                # Video, Source, Subtitle, AudioTrack
    ├── user.ts                 # User, Session, Subscription
    ├── category.ts             # Category, Genre
    └── player.ts               # PlayerState, Quality, PlayerEvents
```

---

## 📂 `server/` — Nitro Server

```
server/
├── routes/
│   ├── api/
│   │   ├── movies/
│   │   │   ├── index.get.ts          # List movies (filters, pagination)
│   │   │   ├── [id].get.ts           # Movie detail
│   │   │   ├── [id]/sources.get.ts   # Video sources (HLS/DASH)
│   │   │   └── hero.get.ts           # Hero movie
│   │   ├── series/
│   │   │   ├── index.get.ts
│   │   │   ├── [id].get.ts
│   │   │   └── [id]/
│   │   │       └── episodes.get.ts   # Episodes for season
│   │   ├── categories/
│   │   │   └── index.get.ts
│   │   ├── search/
│   │   │   └── index.get.ts
│   │   ├── continue-watching/
│   │   │   ├── index.get.ts
│   │   │   ├── [id].post.ts          # Add/update progress
│   │   │   └── [id].delete.ts        # Remove from list
│   │   ├── auth/
│   │   │   ├── login.post.ts
│   │   │   ├── register.post.ts
│   │   │   ├── logout.post.ts
│   │   │   ├── me.get.ts
│   │   │   ├── refresh.post.ts
│   │   │   └── forgot-password.post.ts
│   │   └── health.get.ts             # Health check
│   └── sse/                          # Server-sent events (optional)
│       └── progress.ts
├── middleware/
│   ├── rate-limit.ts                 # Token bucket per IP
│   ├── cors.ts                       # CORS headers
│   ├── logging.ts                    # Request logging + correlation ID
│   ├── auth.ts                       # JWT verification (optional per route)
│   └── validation.ts                 # Zod schema validation
├── utils/
│   ├── mockDb.ts                     # In-memory mock database
│   ├── jwt.ts                        # JWT sign/verify (jose)
│   ├── cookies.ts                    # Cookie helpers (httpOnly, secure)
│   ├── videoSources.ts               # Generate mock HLS/DASH manifests
│   ├── validation.ts                 # Zod schemas for API
│   └── constants.ts                  # Server constants
├── plugins/
│   ├── prisma.ts                     # Database client (when real DB)
│   └── redis.ts                      # Redis client (caching/sessions)
└── types/
    └── h3.d.ts                       # H3 event extensions
```

---

## 📂 `shared/` — Shared Code

```
shared/
├── types/
│   ├── api.ts                        # API contracts (request/response)
│   ├── video.ts                      # Video, Source, Subtitle, AudioTrack
│   ├── user.ts                       # User, Session, SubscriptionTier
│   ├── category.ts                   # Category, Genre
│   └── player.ts                     # PlayerState, Quality, Events
├── constants/
│   ├── app.ts                        # App name, version, defaults
│   ├── player.ts                     # Default quality, speeds, shortcuts
│   └── routes.ts                     # Route names, patterns
├── validation/
│   ├── movie.ts                      # Zod schemas for movie
│   ├── series.ts                     # Zod schemas for series
│   ├── auth.ts                       # Zod schemas for auth
│   └── common.ts                     # Shared validators (email, uuid)
└── utils/
    ├── format.ts                     # Shared formatters
    └── url.ts                        # Shared URL builders
```

---

## 📂 `tests/` — Testing Structure

```
tests/
├── unit/
│   ├── stores/
│   │   ├── auth.test.ts
│   │   ├── player.test.ts
│   │   └── continueWatching.test.ts
│   ├── composables/
│   │   ├── useApi.test.ts
│   │   ├── usePlayer.test.ts
│   │   └── useAuth.test.ts
│   ├── utils/
│   │   ├── format.test.ts
│   │   └── player.test.ts
│   └── server/
│       ├── mockDb.test.ts
│       └── jwt.test.ts
├── e2e/
│   ├── specs/
│   │   ├── home.cy.ts
│   │   ├── movie-detail.cy.ts
│   │   ├── player.cy.ts
│   │   ├── auth.cy.ts
│   │   ├── search.cy.ts
│   │   └── i18n.cy.ts
│   ├── support/
│   │   ├── commands.ts               # Custom Cypress commands
│   │   ├── e2e.ts                    # Global config
│   │   └── page-objects/             # Page Object Models
│   │       ├── HomePage.ts
│   │       ├── MovieDetailPage.ts
│   │       ├── PlayerPage.ts
│   │       └── LoginPage.ts
│   └── fixtures/
│       ├── movies.json
│       └── series.json
├── integration/
│   └── api/
│       ├── movies.test.ts
│       ├── auth.test.ts
│       └── continue-watching.test.ts
└── setup/
    ├── unit.ts                       # Vitest global setup
    └── e2e.ts                        # Cypress global setup
```

---

## 📂 `public/` — Static Assets

```
public/
├── images/
│   ├── placeholders/                 # Blurhash/base64 placeholders
│   │   ├── poster.webp
│   │   └── backdrop.webp
│   ├── logos/
│   │   ├── logo.svg
│   │   └── logo-white.svg
│   └── favicon/
│       ├── favicon.ico
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── apple-touch-icon.png
│       └── manifest.json
├── videos/
│   └── samples/                      # Local test streams (optional)
└── robots.txt
```

---

## 📂 `assets/` — Source Assets (Vite-processed)

```
assets/
├── css/
│   └── main.css                      # @tailwind imports + globals
├── scss/                             # If using SCSS
├── fonts/
│   ├── inter/                        # Self-hosted Inter
│   ├── poppins/                      # Self-hosted Poppins
│   └── noto/                         # Noto Sans for non-Latin
└── locales/                          # i18n locale files (copied to app/assets/locales)
```

---

## 📂 `scripts/` — Build & Deploy Scripts

```
scripts/
├── dev.sh                            # Start dev with proper env
├── build.sh                          # Production build
├── preview.sh                        # Preview production build
├── test.sh                           # Run all tests
├── lint.sh                           # Lint + typecheck
├── db/
│   ├── migrate.sh                    # Run migrations
│   └── seed.sh                       # Seed database
├── deploy/
│   ├── vercel.sh
│   ├── netlify.sh
│   ├── docker.sh
│   └── k8s.sh
└── video/
    ├── transcode.sh                  # FFmpeg transcode helper
    ├── package-hls.sh                # HLS packaging
    └── package-dash.sh               # DASH packaging
```

---

## 📂 `docs/` — Additional Documentation

```
docs/
├── architecture/
│   ├── overview.md
│   ├── rendering.md
│   ├── state-management.md
│   ├── video-pipeline.md
│   └── i18n.md
├── guides/
│   ├── adding-a-page.md
│   ├── adding-a-component.md
│   ├── adding-an-api-route.md
│   ├── adding-a-store.md
│   ├── adding-a-composable.md
│   ├── writing-tests.md
│   └── deploying.md
├── api/
│   ├── movies.md
│   ├── series.md
│   ├── auth.md
│   └── continue-watching.md
└── troubleshooting/
    ├── common-errors.md
    └── performance.md
```

---

## 🏷️ Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Files (Vue)** | PascalCase | `MovieCard.vue`, `VideoPlayer.vue` |
| **Files (TS/JS)** | kebab-case | `use-api.ts`, `format-time.ts` |
| **Files (Test)** | `*.test.ts` / `*.spec.ts` | `use-player.test.ts` |
| **Files (E2E)** | `*.cy.ts` | `player.cy.ts` |
| **Directories** | kebab-case | `movie-card/`, `player-controls/` |
| **Components** | PascalCase | `MovieCard`, `QualitySelector` |
| **Composables** | `use` + PascalCase | `usePlayer`, `useApi`, `useAuth` |
| **Stores** | PascalCase + `Store` suffix | `AuthStore`, `PlayerStore` (but file: `auth.ts`) |
| **Pinia State** | camelCase | `currentVideo`, `isPlaying` |
| **Pinia Getters** | camelCase + `is`/`has`/`can` | `isAuthenticated`, `canPlay` |
| **Pinia Actions** | verb + camelCase | `login`, `loadVideo`, `setQuality` |
| **CSS Classes** | kebab-case (Tailwind) | `.movie-card`, `.player-controls` |
| **CSS Variables** | kebab-case with prefix | `--color-primary`, `--space-4` |
| **Type Interfaces** | PascalCase | `Movie`, `VideoSource`, `PlayerState` |
| **Type Aliases** | PascalCase | `Quality = 'auto' \| '1080p' \| ...` |
| **Enums/Const Objects** | PascalCase | `SubscriptionTier`, `PlayerEvents` |
| **Zod Schemas** | `PascalCase` + `Schema` suffix | `MovieSchema`, `LoginSchema` |
| **API Routes** | kebab-case + HTTP verb | `/api/movies/[id].get.ts` |
| **Env Vars** | UPPER_SNAKE_CASE | `JWT_SECRET`, `DATABASE_URL` |
| **Locale Keys** | `feature.action` | `player.quality`, `auth.login` |

---

## 🔄 Import Conventions

### Auto-Imports (Nuxt)
```typescript
// These are auto-imported — no import needed
// Components: app/components/**/*
// Composables: app/composables/**/*
// Stores: app/stores/**/*
// Utils: app/utils/**/*
```

### Explicit Imports
```typescript
// Shared types — explicit import
import type { Movie, VideoSource } from '~/shared/types'

// Server utils — explicit import (server only)
import { mockDb } from '~/server/utils/mockDb'

// Shared validation — explicit import
import { movieSchema } from '~/shared/validation/movie'

// Constants — explicit import
import { DEFAULT_QUALITY } from '~/shared/constants/player'
```

### Path Aliases (tsconfig.json)
```json
{
  "compilerOptions": {
    "paths": {
      "~/": ["./app/"],
      "#shared/": ["./shared/"],
      "#server/": ["./server/"],
      "#tests/": ["./tests/"]
    }
  }
}
```

---

## 📦 Component Organization Rules

### 1. **Single Responsibility**
- Each component does ONE thing well
- `MovieCard` displays a movie — doesn't fetch data
- `VideoPlayer` plays video — doesn't manage continue-watching

### 2. **Props Interface**
```typescript
// Define props interface with descriptive name
interface MovieCardProps {
  movie: Movie
  variant?: 'default' | 'compact' | 'hero'
  showProgress?: boolean
}

// Use with defineProps<MovieCardProps>()
```

### 3. **Emits Interface**
```typescript
interface MovieCardEmits {
  play: [movie: Movie]
  addToList: [movieId: string]
}

// Use with defineEmits<MovieCardEmits>()
```

### 4. **Component Categories**
| Category | Location | Purpose |
|----------|----------|---------|
| **UI** | `components/ui/` | Reusable primitives (Button, Input, Modal) |
| **Layout** | `components/layout/` | Page structure (Header, Sidebar, Footer) |
| **Domain** | `components/movie/`, `components/player/` | Business logic components |
| **Common** | `components/common/` | Cross-domain utilities (LazyImage, SearchInput) |

---

## 🏪 Store Organization Rules

### 1. **One Store Per Domain**
```
stores/
├── auth.ts           # Authentication only
├── player.ts         # Video playback only
├── ui.ts             # Global UI state only
├── video.ts          # Video metadata cache only
├── categories.ts     # Category tree only
└── continueWatching.ts  # Resume positions only
```

### 2. **Store Structure Template**
```typescript
export const useXxxStore = defineStore('xxx', () => {
  // ─── State ───
  const state = ref(initialValue)
  
  // ─── Getters (computed) ───
  const derived = computed(() => ...)
  
  // ─── Actions ───
  async function actionName(params) { ... }
  function syncAction(params) { ... }
  
  // ─── Persistence (if needed) ───
  // Configured in defineStore options
  
  return {
    // State
    state,
    // Getters
    derived,
    // Actions
    actionName,
    syncAction,
  }
}, {
  persist: {
    key: 'streamlab-xxx',
    paths: ['state', 'derived'], // Only persist needed fields
  }
})
```

### 3. **Cross-Store Communication**
- **Don't** import stores in other stores
- **Do** use composables that coordinate: `usePlayer()` calls `useContinueWatching().savePosition()`

---

## 🔌 Composables Rules

### 1. **Naming**: `use` + PascalCase (`usePlayer`, `useApi`)
### 2. **Return**: Reactive state + methods (not plain objects)
### 3. **Side Effects**: Only in returned functions, not at top level
### 4. **Testing**: Export internal functions for unit testing

```typescript
export function usePlayer() {
  const playerStore = usePlayerStore()
  
  // Internal helper (exported for testing)
  function calculateOptimalQuality(bandwidth: number): Quality { ... }
  
  // Public API
  function play(video: Video, sources: VideoSource[]) { ... }
  function seek(time: number) { ... }
  
  return {
    // State (from store)
    currentVideo: computed(() => playerStore.currentVideo),
    // Methods
    play,
    seek,
    // Internal (for tests)
    calculateOptimalQuality,
  }
}
```

---

## 🌐 API Route Conventions

### 1. **File Naming**
```
server/routes/api/
├── movies/
│   ├── index.get.ts          # GET /api/movies
│   ├── [id].get.ts           # GET /api/movies/:id
│   └── [id]/sources.get.ts   # GET /api/movies/:id/sources
```

### 2. **Handler Template**
```typescript
// server/routes/api/movies/[id].get.ts
import { defineEventHandler, getRouterParam, createError } from 'h3'
import { movieSchema } from '#shared/validation/movie'
import { mockDb } from '#server/utils/mockDb'

export default defineEventHandler(async (event) => {
  // 1. Extract & validate params
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'Missing id' })
  
  // 2. Fetch data
  const movie = mockDb.movies.find(m => m.id === id)
  if (!movie) throw createError({ statusCode: 404, message: 'Not found' })
  
  // 3. Transform/validate response
  const validated = movieSchema.parse(movie)
  
  // 4. Return standardized response
  return {
    success: true,
    data: validated,
    meta: { timestamp: Date.now() }
  }
})
```

### 3. **Response Format**
```typescript
// Success
{
  success: true,
  data: T,
  meta?: { timestamp: number; cached?: boolean; page?: number }
}

// Error (thrown via createError)
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: any
  }
}
```

---

## 🎨 CSS/Tailwind Conventions

### 1. **Use Utilities First**
```vue
<!-- Good -->
<div class="flex items-center gap-4 p-4 bg-dark-card rounded-lg">

<!-- Avoid @apply for simple cases -->
```

### 2. **Component Variants with `class-variance-authority` (CVA)**
```typescript
// ui/Button.ts
import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'bg-surface-700 text-white hover:bg-surface-600',
        ghost: 'hover:bg-surface-700',
        danger: 'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
```

### 3. **Dark Mode Default**
```css
/* main.css */
:root {
  /* Light (opt-in via .light class) */
}
.dark {
  /* Dark (default) */
}
html {
  @apply dark; /* Force dark default */
}
```

### 4. **RTL with Logical Properties**
```vue
<!-- Good: logical properties -->
<div class="ms-4 me-auto"> <!-- margin-start, margin-end -->
<div class="ps-4 pe-2">    <!-- padding-start, padding-end -->
<div class="rounded-s-lg"> <!-- border-start-start-radius -->

<!-- Avoid: physical properties -->
<div class="ml-4 mr-auto">
<div class="pl-4 pr-2">
<div class="rounded-tl-lg">
```

---

## 🧪 Test File Patterns

### Unit Test (`*.test.ts`)
```typescript
// tests/unit/stores/player.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePlayerStore } from '~/stores/player'

describe('Player Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it('loads video and sets sources', () => {
    const store = usePlayerStore()
    const mockVideo = { id: '1', type: 'movie', title: 'Test', poster: '' }
    const mockSources = [{ id: '1', type: 'hls', url: 'test.m3u8', quality: '1080p' }]
    
    store.loadVideo(mockVideo, mockSources)
    
    expect(store.currentVideo).toEqual(mockVideo)
    expect(store.sources).toEqual(mockSources)
  })
})
```

### E2E Test (`*.cy.ts`)
```typescript
// tests/e2e/specs/player.cy.ts
import { HomePage } from '../support/page-objects/HomePage'
import { PlayerPage } from '../support/page-objects/PlayerPage'

describe('Video Playback', () => {
  const home = new HomePage()
  const player = new PlayerPage()
  
  it('plays a movie from home page', () => {
    home.visit()
    home.getMovieCard('big-buck-bunny').click()
    player.waitForPlayer()
    player.getPlayButton().should('not.exist') // Playing = pause button visible
    player.getVideo().should('have.property', 'duration').and('be.greaterThan', 0)
  })
})
```

---

## 📋 Git Conventions

### Branch Names
```
feat/movie-detail-page
fix/player-quality-switch
refactor/auth-store
docs/architecture-overview
test/player-unit-tests
chore/update-dependencies
```

### Commit Messages (Conventional Commits)
```
feat(movie): add movie detail page with SEO meta
fix(player): handle HLS fallback on error
refactor(auth): extract token refresh logic
docs: add video pipeline architecture diagram
test(player): add quality selector unit tests
chore: upgrade nuxt to 3.11
```

### PR Template
```markdown
## Description
Brief summary of changes

## Type
- [ ] Feature
- [ ] Bug Fix
- [ ] Refactor
- [ ] Docs
- [ ] Test
- [ ] Chore

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual test in browser
- [ ] RTL checked (ar/ur)
- [ ] Accessibility checked

## Checklist
- [ ] TypeScript strict passes
- [ ] Lint passes
- [ ] No console errors
- [ ] CHANGELOG updated
- [ ] Docs updated (if needed)
```

---

*This structure is binding. New patterns require AGENTS.md update + team agreement.*