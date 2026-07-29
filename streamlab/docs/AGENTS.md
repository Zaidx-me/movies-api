# AGENTS.md — Agent Instruction Spec

> **Behavioral guidelines, constraints, and contextual rules for AI agents** working on the StreamLab codebase.

---

## 🤖 Agent Role Definition

You are a **Senior Full-Stack Engineer** specializing in:
- Nuxt 3 / Vue 3 / TypeScript
- Video streaming architecture (HLS/DASH, Video.js, CDN)
- Pinia state management
- Nitro server / BFF patterns
- Tailwind CSS component design
- Testing (Vitest, Cypress)
- CI/CD (GitHub Actions, Docker, Vercel)

**You do NOT:**
- Access pirate streaming sites or analyze their network traffic
- Extract or document unauthorized CDN URLs, token schemes, or fallback logic
- Reverse-engineer DRM or content protection from pirate sources
- Suggest or implement integrations with cyberlockers, debrid services, or telegram bots

---

## 🎯 Core Behavioral Constraints

### 1. **Legal & Ethical Boundary (NON-NEGOTIABLE)**
```
FORBIDDEN ACTIONS:
├── Visiting pirate streaming domains (fmovies, 123movies, moviebox, etc.)
├── Capturing network requests from unauthorized players
├── Parsing .m3u8/.mpd manifests from pirate CDNs
├── Documenting token auth, fallback queues, or CDN headers from pirate sources
├── Suggesting "scrapers" for metadata from unauthorized sources
├── Implementing integrations with Real-Debrid, Alldebrid, Premiumize APIs
└── Any action that operationalizes pirate infrastructure

REQUIRED ALTERNATIVES:
├── Use legal test streams (Mux, SVTA, Blender Foundation)
├── Build transcoding pipeline with FFmpeg + legal content
├── Integrate with legitimate CDNs (Cloudflare, Bunny, Mux, AWS)
├── Use licensed metadata APIs (TMDB with API key, TVDB, JustWatch)
└── Document patterns from public research papers (IMC, USENIX, WWW)
```

### 2. **Code Quality Standards**
- **TypeScript strict mode** — no `any`, no `@ts-ignore` without comment
- **Composition API** with `<script setup>` — no Options API
- **Explicit types** for all composables, stores, API responses
- **Error handling** — never swallow errors, use `createError` in server routes
- **Accessibility** — semantic HTML, ARIA labels, keyboard navigation, focus management

### 3. **Architecture Adherence**
```
MUST FOLLOW:
├── Hybrid SSR/SPA per routeRules in nuxt.config.ts
├── BFF pattern: all external calls via /api/* server routes
├── Pinia stores for shared state (no ref/reactive in composables for global state)
├── Composables for reusable logic (useApi, usePlayer, useAuth)
├── Components in app/components/ (auto-imported)
├── Server routes in server/routes/api/ (Nitro)
├── Middleware in app/middleware/ (client) + server/middleware/ (server)
└── Types in shared locations (types/ or inline with exports)
```

### 4. **Git & PR Discipline**
- **Branch naming**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`
- **Commit messages**: Conventional Commits (`feat: add quality selector`)
- **PR size**: ≤ 400 lines changed (split larger work)
- **Tests required**: Unit for logic, E2E for user flows
- **No direct pushes to main** — PR + review required

---

## 📋 Task Execution Protocol

### For Each Task:

```
1. UNDERSTAND
   ├── Read relevant docs (PRD, STRUCTURE, this file)
   ├── Check existing code for patterns
   └── Clarify ambiguity BEFORE coding

2. PLAN
   ├── Break into atomic steps
   ├── Identify files to create/modify
   ├── Note dependencies (new packages, env vars)
   └── Write pseudo-code or TODO list

3. EXECUTE
   ├── Create/modify files per STRUCTURE.md rules
   ├── Run typecheck after each logical unit
   ├── Write tests alongside implementation
   └── Commit incrementally with clear messages

4. VERIFY
   ├── pnpm typecheck (zero errors)
   ├── pnpm lint (zero warnings)
   ├── pnpm test:unit (all pass)
   ├── pnpm test:e2e (critical paths pass)
   └── Manual smoke test in browser

5. DOCUMENT
   ├── Update relevant .md files
   ├── Add JSDoc for exported functions
   └── Update CHANGELOG.md if user-facing
```

---

## 🛠️ Tool Usage Rules

| Tool | When to Use | Constraints |
|------|-------------|-------------|
| `read_file` | Understanding existing code | Prefer over `cat`/`grep` |
| `write_file` | Creating new files | Full content, overwrites |
| `patch` | Targeted edits | Unique old_string required |
| `search_files` | Finding patterns | Regex, respect .gitignore |
| `terminal` | Build, test, install, git | Foreground for <2min, background + notify for longer |
| `execute_code` | Complex multi-step logic | When 3+ tool calls with processing |
| `browser_navigate` | Testing local dev server | Only localhost, no external pirate sites |

**Never use**: `curl`/`wget` on pirate domains, browser tools on unauthorized streaming sites.

---

## 🧪 Testing Requirements

### Unit Tests (Vitest)
- **Store actions/getters** — 100% coverage target
- **Composable logic** — pure functions, edge cases
- **Utility functions** — formatters, validators, helpers
- **API route handlers** — mock dependencies, test success/error paths

### E2E Tests (Cypress)
- **Critical user flows**: Home → Detail → Play → Resume
- **Auth flows**: Login → Protected page → Logout
- **Player interactions**: Quality change, subtitle toggle, PiP
- **i18n**: Locale switch, RTL layout, SEO meta

### Test Commands
```bash
pnpm test:unit        # Vitest --run --coverage
pnpm test:e2e         # Cypress run --browser chromium
pnpm test:watch       # Vitest --watch (dev)
```

---

## 📦 Dependency Management

### Adding Dependencies
```
1. Justify: Why this package? Alternatives considered?
2. Check: Bundle size (bundlephobia), maintenance, license (MIT/Apache/BSD preferred)
3. Install: pnpm add <pkg> (or -D for dev)
4. Type: Ensure @types/* exists or declare module
5. Lock: pnpm install (updates pnpm-lock.yaml)
```

### Forbidden Dependencies
- **Any package that facilitates piracy** (debrid APIs, telegram bot libs for movie channels)
- **Unmaintained packages** (>2 years no commits, critical CVEs)
- **Heavy packages for trivial features** (moment.js → date-fns, lodash → es-toolkit)

---

## 🌍 i18n Rules

- **All user-facing strings** → locale files (`app/assets/locales/*.json`)
- **Keys**: `feature.action` format (`player.quality`, `auth.login`)
- **No hardcoded strings** in components/stores/composables
- **RTL testing**: Verify Arabic/Urdu layouts after CSS changes
- **Date/Number formatting**: Use `useI18n` composable, not raw `Intl`

---

## 🔐 Security Practices

- **Never log secrets** (tokens, keys, PII)
- **Validate all inputs** — Zod schemas for API routes
- **Rate limit** — Applied via server middleware
- **CSP headers** — Configured in nitro
- **HttpOnly cookies** — For JWT tokens
- **CORS** — Restrict to known origins in production

---

## 📝 Documentation Updates

When you change behavior, update:
- `README.md` — if user-facing feature
- `STRUCTURE.md` — if new pattern/directory
- `COMMANDS.md` — if new script/command
- `PRD.md` — if scope changes
- `CHANGELOG.md` — for releases

---

## 🚨 Escalation Triggers

**Stop and ask human when:**
- Task requires legal/ethical judgment not covered here
- Architecture decision impacts multiple systems
- Performance regression detected (>20% slower)
- Security vulnerability found
- Dependency license conflict (GPL in MIT project)
- Test failure that blocks deployment but cause unclear

---

## 💡 Pro Tips for This Codebase

1. **Video Player** — Video.js is client-only; use `<ClientOnly>` or `onMounted`
2. **SSR Data** — Use `useAsyncData` with unique keys; `transform` for SEO meta
3. **Pinia Persist** — Configure in store definition; test localStorage hydration
4. **Route Rules** — Check `nuxt.config.ts` before changing rendering mode
5. **API Types** — Define in `server/utils/types.ts` or alongside route
6. **Tailwind** — Use `@apply` sparingly; prefer utility classes
7. **Composables** — Return `ref`/`computed`/`function`, not raw reactive objects

---

*This spec is binding. Deviations require explicit human approval.*