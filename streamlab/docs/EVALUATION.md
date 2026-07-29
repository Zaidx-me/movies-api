# EVALUATION.md — Evaluation & Guardrails Policy

> **StreamLab** — Safety layers, token budgets, input/output validation, and automated testing criteria

---

## 🛡️ Safety Layers

### Layer 1: Static Analysis (Pre-Commit)
| Check | Tool | Threshold | Action on Fail |
|-------|------|-----------|----------------|
| TypeScript Strict | `tsc --noEmit` | 0 errors | Block commit |
| ESLint | `eslint .` | 0 errors, 0 warnings | Block commit |
| Prettier | `prettier --check` | 0 diffs | Block commit |
| Dependency Audit | `pnpm audit` | 0 critical, 0 high | Block commit |
| License Check | `pnpm licenses` | No GPL/AGPL | Block commit |

### Layer 2: Unit Test Gate (Pre-Push)
| Metric | Tool | Threshold | Action on Fail |
|--------|------|-----------|----------------|
| Line Coverage | Vitest | ≥ 80% | Block push |
| Branch Coverage | Vitest | ≥ 75% | Block push |
| Function Coverage | Vitest | ≥ 80% | Block push |
| Test Duration | Vitest | < 60s total | Warn |

### Layer 3: E2E Test Gate (Pre-Merge)
| Flow | Tool | Threshold | Action on Fail |
|------|------|-----------|----------------|
| Home → Movie Detail → Play | Cypress | 100% pass | Block merge |
| Auth Login → Protected Route | Cypress | 100% pass | Block merge |
| Search → Results → Filter | Cypress | 100% pass | Block merge |
| Locale Switch (ar/ur RTL) | Cypress | 100% pass | Block merge |
| Player Quality Switch | Cypress | 100% pass | Block merge |
| Continue Watching Resume | Cypress | 100% pass | Block merge |

### Layer 4: Performance Budget (CI)
| Metric | Tool | Threshold | Action on Fail |
|--------|------|-----------|----------------|
| Lighthouse Performance | LHCI | ≥ 90 | Block deploy |
| Lighthouse Accessibility | LHCI | ≥ 95 | Block deploy |
| Lighthouse SEO | LHCI | 100 | Block deploy |
| Bundle Size (JS gzipped) | Webpack Bundle Analyzer | < 200KB | Warn |
| Bundle Size (CSS gzipped) | Webpack Bundle Analyzer | < 50KB | Warn |
| Time to First Byte (SSR) | Custom | < 200ms | Warn |

### Layer 5: Runtime Guards (Production)
| Guard | Implementation | Trigger | Response |
|-------|----------------|---------|----------|
| CSP Violation | `Content-Security-Policy-Report-Only` | Report | Alert + log |
| Rate Limit Exceeded | Nitro middleware | > 1000 req/min/IP | 429 + retry-after |
| JWT Expired/Invalid | Auth middleware | Any protected route | 401 + redirect login |
| Player Error Rate | Custom telemetry | > 1% in 5min | Alert + fallback CDN |
| API Error Rate | Prometheus alert | > 5% in 5min | Alert + circuit breaker |
| Memory Leak (Node) | Process monitor | > 1GB RSS | Restart pod |

---

## 🎫 Token Budget Limits

### LLM Context Budgets (Agent Operations)
| Operation | Max Tokens | Strategy |
|-----------|------------|----------|
| Read file | 50,000 | Paginate if larger |
| Write file | 100,000 | Split if larger |
| Search codebase | 20,000 | Limit results to 50 |
| Run terminal | 50,000 | Truncate output |
| Browser navigate | 100,000 | Snapshot only, no full DOM |
| Execute code | 50,000 | Return summary only |

### API Response Budgets
| Endpoint Type | Max Response Size | Pagination |
|---------------|-------------------|------------|
| List (movies, series) | 100 items | Cursor-based, max 50/page |
| Detail (movie, series) | 50 KB | Single object |
| Search | 50 items | Page-based, max 20/page |
| Continue Watching | 20 items | No pagination |
| Video Sources | 10 sources | Single object |

### Video Segment Budgets
| Quality | Target Bitrate | Segment Duration | Max Segment Size |
|---------|----------------|------------------|------------------|
| 1080p | 5,000 kbps | 6s | 3.75 MB |
| 720p | 2,800 kbps | 6s | 2.1 MB |
| 480p | 1,400 kbps | 6s | 1.05 MB |
| 360p | 800 kbps | 6s | 600 KB |
| 240p | 400 kbps | 6s | 300 KB |

---

## ✅ Input Validation Rules

### Zod Schema Standards
```typescript
// All API inputs validated with Zod
// Shared schemas in shared/validation/

// Example: Movie query params
export const movieQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  genre: z.string().uuid().optional(),
  sort: z.enum(['trending', 'latest', 'az', 'rating']).default('trending'),
  search: z.string().max(100).optional(),
})

// Example: Auth login
export const loginSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(8).max(128),
  rememberMe: z.boolean().default(false),
})

// Example: Continue watching update
export const continueWatchingSchema = z.object({
  contentId: z.string().uuid(),
  contentType: z.enum(['movie', 'episode']),
  progress: z.number().min(0).max(1),
  currentTime: z.number().int().positive(),
  duration: z.number().int().positive(),
  season: z.number().int().positive().optional(),
  episode: z.number().int().positive().optional(),
})
```

### Client-Side Validation
- **Forms**: Zod + `vee-validate` or `@nuxtjs/i18n` validation
- **File Upload**: Type, size (max 500MB), extension allowlist
- **URL Params**: Validated in page `defineRouteRules` + middleware
- **WebSocket Messages**: Schema validation on receive

### Sanitization Rules
| Input Type | Sanitization |
|------------|--------------|
| HTML (user bio, descriptions) | DOMPurify on server |
| Search queries | Trim, escape regex chars |
| File names | UUID rename, preserve extension |
| Redirect URLs | Allowlist (same origin only) |
| Player URLs | Signed, expiring, domain-restricted |

---

## 📤 Output Validation Rules

### API Response Contracts
```typescript
// Standardized response wrapper
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: Record<string, string[]>
  }
  meta?: {
    timestamp: number
    cached?: boolean
    page?: number
    totalPages?: number
    totalItems?: number
  }
}

// Error codes (machine-readable)
enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  RATE_LIMITED = 'RATE_LIMITED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  VIDEO_UNAVAILABLE = 'VIDEO_UNAVAILABLE',
  DRM_ERROR = 'DRM_ERROR',
}
```

### Video Manifest Validation
```typescript
// HLS Master Playlist validation
interface HlsMasterValidation {
  hasVariants: boolean
  variants: Array<{
    bandwidth: number
    resolution: string
    codecs: string
    uri: string
  }>
  hasSubtitles: boolean
  hasAudioGroups: boolean
}

// DASH MPD validation
interface DashMpdValidation {
  hasPeriods: boolean
  hasAdaptationSets: boolean
  hasRepresentations: boolean
  minBufferTime: number
  suggestedPresentationDelay: number
}
```

### Player Telemetry Schema
```typescript
interface PlayerEvent {
  event: 'play' | 'pause' | 'seek' | 'quality_change' | 'error' | 'complete'
  timestamp: number
  sessionId: string
  contentId: string
  contentType: 'movie' | 'episode'
  quality?: string
  currentTime: number
  duration: number
  buffered: number
  errorCode?: string
  errorMessage?: string
  userAgent: string
  viewport: { width: number; height: number }
}
```

---

## 🧪 Automated Testing Criteria

### Unit Test Requirements
| Category | Coverage Target | Patterns |
|----------|-----------------|----------|
| Stores | 100% actions + getters | Test each action with success/error |
| Composables | 90% functions | Pure functions + mock dependencies |
| Utils | 100% | Edge cases: empty, null, max, min |
| Validation | 100% schemas | Valid + invalid for each field |

### E2E Test Scenarios (Critical Paths)
```typescript
// tests/e2e/specs/critical-paths.cy.ts

const CRITICAL_PATHS = [
  {
    name: 'Home → Movie → Play',
    steps: [
      'Visit /',
      'Assert hero visible',
      'Click first movie card',
      'Assert detail page loaded',
      'Click Play',
      'Assert player page loaded',
      'Assert video playing (duration > 0)',
    ],
    browsers: ['chromium', 'firefox', 'webkit'],
  },
  {
    name: 'Auth → Protected',
    steps: [
      'Visit /profile',
      'Assert redirect to /auth/login',
      'Login with valid credentials',
      'Assert redirect to /profile',
      'Assert user data visible',
    ],
    browsers: ['chromium'],
  },
  {
    name: 'Search → Filter → Play',
    steps: [
      'Visit /search?q=big',
      'Assert results contain "Big Buck Bunny"',
      'Filter by genre=Animation',
      'Click result',
      'Play video',
    ],
    browsers: ['chromium'],
  },
  {
    name: 'i18n RTL',
    steps: [
      'Switch locale to ar',
      'Assert dir=rtl on html',
      'Assert layout mirrored',
      'Visit movie detail',
      'Assert player controls RTL',
    ],
    browsers: ['chromium', 'webkit'],
  },
  {
    name: 'Player Controls',
    steps: [
      'Play video',
      'Test keyboard: Space, ←, →, F, M',
      'Switch quality',
      'Enable subtitles',
      'Switch audio track',
      'Enter PiP',
      'Seek to 50%',
    ],
    browsers: ['chromium', 'firefox'],
  },
  {
    name: 'Continue Watching',
    steps: [
      'Play video to 30%',
      'Close tab',
      'Revisit home',
      'Assert Continue Watching row shows progress',
      'Click resume',
      'Assert player starts at saved position',
    ],
    browsers: ['chromium'],
  },
]
```

### Visual Regression Tests
```typescript
// tests/e2e/visual/
const VISUAL_BASELINES = [
  { page: '/', locales: ['en', 'ar', 'hi'], viewports: ['mobile', 'desktop'] },
  { page: '/movie/big-buck-bunny', locales: ['en', 'ar'], viewports: ['desktop'] },
  { page: '/player/big-buck-bunny', locales: ['en', 'ar'], viewports: ['desktop'] },
  { page: '/auth/login', locales: ['en', 'ar', 'ur'], viewports: ['mobile', 'desktop'] },
  { page: '/profile', locales: ['en', 'ar'], viewports: ['desktop'] },
]
// Tool: @playwright/test with pixelmatch
// Threshold: 0.1% pixel diff
```

### Accessibility Tests
```typescript
// Automated via axe-core in Cypress
const A11Y_RULES = [
  'color-contrast',
  'keyboard-navigation',
  'aria-roles',
  'aria-required-attr',
  'heading-order',
  'landmark-one-main',
  'region',
  'skip-link',
  'focus-visible',
]
// Run on every page in CI
// Threshold: 0 violations
```

### Load Test Scenarios (k6)
```javascript
// tests/load/player-load.js
export const options = {
  scenarios: {
    // 1000 concurrent viewers, ramp up over 5min
    ramp_up: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5m', target: 1000 },
        { duration: '10m', target: 1000 },
        { duration: '5m', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
    'player_start_time': ['p(95)<3000'],
  },
}
```

---

## 🚦 Deployment Gates

### Staging → Production Checklist
```
□ All CI checks pass (lint, typecheck, unit, e2e, perf)
□ Lighthouse CI ≥ 90/95/100
□ Visual regression: 0 diffs
□ Accessibility: 0 axe violations
□ Load test: p95 < 500ms API, < 3s player start
□ Security scan: 0 critical/high vulns
□ Dependency licenses: compliant
□ Changelog updated
□ Version bumped (semver)
□ Release notes drafted
□ Rollback plan documented
```

### Canary Deployment
```yaml
# GitHub Actions / Argo Rollouts
canary:
  weight: 10%          # Start with 10% traffic
  metrics:
    - error_rate < 0.1%
    - latency_p95 < 500ms
    - player_error_rate < 0.5%
  duration: 30m
  auto_promote: true
  rollback_on_fail: true
```

### Feature Flags
| Feature | Flag | Default | Rollout |
|---------|------|---------|---------|
| DASH Support | `FEATURE_DASH` | true | 100% |
| PiP | `FEATURE_PIP` | true | 100% |
| Offline Download | `FEATURE_OFFLINE` | false | 0% |
| 4K Streaming | `FEATURE_4K` | false | 0% |
| Live Chat | `FEATURE_CHAT` | false | 0% |
| Recommendations | `FEATURE_RECS` | false | 0% |

---

## 📊 Monitoring & Alerting

### Key Metrics (Prometheus)
```promql
# Player Health
rate(streamlab_player_errors_total[5m]) > 0.01
histogram_quantile(0.95, rate(streamlab_player_start_duration_seconds_bucket[5m])) > 3

# API Health
rate(http_requests_total{status=~"5.."}[5m]) > 0.05
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1

# Auth Health
rate(streamlab_auth_failures_total[5m]) > 0.1

# Business
rate(streamlab_video_plays_total[1h]) < 10  # Unusual drop
```

### Alert Rules
| Alert | Severity | Channel | Runbook |
|-------|----------|---------|---------|
| PlayerErrorRateHigh | Critical | PagerDuty + Slack | Check CDN, fallback sources |
| APILatencyHigh | Warning | Slack | Check DB, scale pods |
| AuthFailureSpike | Critical | PagerDuty | Check auth provider, rate limits |
| VideoPlayDrop | Warning | Slack | Check content availability |
| MemoryLeak | Critical | PagerDuty | Restart pods, investigate |

---

## 🔒 Security Validation

### Pre-Deploy Security Checks
```bash
# SAST
pnpm security:sast          # Semgrep rules

# Dependency Scan
pnpm audit --audit-level=high
pnpm licenses list --prod

# Container Scan
docker scan streamlab:latest

# Secrets Scan
git-secrets --scan
trufflehog filesystem .

# CSP Validation
pnpm csp:validate           # Report-only headers in staging
```

### Penetration Test Scope (Quarterly)
- Authentication bypass
- IDOR on continue-watching/video sources
- XSS in search/profile
- CSP bypass
- Rate limit bypass
- JWT algorithm confusion
- OAuth state parameter validation

---

## 📝 Compliance Checklist

### GDPR / Privacy
- [ ] Data minimization (collect only needed)
- [ ] Right to deletion (account + data purge)
- [ ] Data portability (export endpoint)
- [ ] Consent for analytics (cookie banner)
- [ ] DPA with subprocessors (CDN, analytics)

### Accessibility (WCAG 2.1 AA)
- [ ] Automated: axe-core in CI
- [ ] Manual: NVDA + VoiceOver testing
- [ ] Keyboard: All flows navigable
- [ ] Contrast: All text ≥ 4.5:1
- [ ] Captions: Default ON for new users

### Content Security
- [ ] CSP: script-src, style-src, media-src, connect-src
- [ ] SRI: All third-party scripts
- [ ] COOP/COEP: Cross-origin isolation
- [ ] Permissions Policy: Camera, mic, payment disabled

---

## 📋 Guardrails Summary

| Layer | What It Catches | When It Runs |
|-------|-----------------|--------------|
| **Static Analysis** | Type errors, lint, vulns, licenses | Pre-commit / CI |
| **Unit Tests** | Logic bugs, regressions | Pre-push / CI |
| **E2E Tests** | User flow breaks, browser diffs | Pre-merge / CI |
| **Visual Regression** | UI breaking changes | Pre-merge / CI |
| **Performance Budget** | Bundle bloat, slow pages | CI / Deploy |
| **Load Test** | Scalability limits | Pre-release |
| **Security Scan** | Vulns, secrets, CSP | CI / Quarterly |
| **Runtime Guards** | Production anomalies | Continuous |
| **Canary** | Real-user impact | Deploy |

---

*This policy is enforced by CI/CD. Bypasses require Tech Lead + Security approval documented in PR.*