# COMMANDS.md — Executable Commands Reference

> **StreamLab** — All commands needed to develop, test, build, and deploy. Every command is copy-paste executable.

---

## 📦 Package Manager

```bash
# This project uses pnpm (required)
corepack enable pnpm
pnpm --version  # Should be 9.x

# If pnpm not available:
npm install -g pnpm@9
```

---

## 🚀 Development

### Start Dev Server
```bash
# Standard dev server (Nuxt + Nitro)
pnpm dev

# Dev with specific environment
NUXT_APP_ENV=development pnpm dev

# Dev on custom port
pnpm dev --port 3001

# Dev with host binding (for mobile testing)
pnpm dev --host 0.0.0.0

# Dev with HTTPS (requires mkcert)
pnpm dev --https
```

### Environment Files
```bash
# Copy template (first time)
cp .env.example .env

# Development overrides (gitignored)
cp .env.example .env.dev

# View current env
cat .env

# Validate required vars
pnpm env:check
```

---

## 🧪 Testing

### Unit Tests (Vitest)
```bash
# Run all unit tests
pnpm test:unit

# Run in watch mode
pnpm test:unit --watch

# Run specific file
pnpm test:unit tests/unit/stores/player.test.ts

# Run with coverage
pnpm test:unit --coverage

# Run with UI
pnpm test:unit --ui

# Update snapshots
pnpm test:unit --update
```

### E2E Tests (Cypress)
```bash
# Open Cypress UI
pnpm test:e2e:open

# Run headless (CI mode)
pnpm test:e2e

# Run specific spec
pnpm test:e2e --spec "tests/e2e/specs/player.cy.ts"

# Run headed (see browser)
pnpm test:e2e --headed

# Record to Cypress Cloud
pnpm test:e2e --record --key <record-key>
```

### Integration Tests (API)
```bash
# Run API integration tests
pnpm test:integration

# Run with test server
pnpm test:integration:server
```

### All Tests
```bash
# Run everything (unit + e2e + integration)
pnpm test:all

# CI pipeline equivalent
pnpm ci:test
```

---

## 🔍 Code Quality

### Linting
```bash
# Lint all files
pnpm lint

# Lint with auto-fix
pnpm lint:fix

# Lint specific file
pnpm lint -- app/components/movie/MovieCard.vue

# Lint staged files (pre-commit)
pnpm lint:staged
```

### Type Checking
```bash
# Full type check (strict)
pnpm typecheck

# Type check with watch
pnpm typecheck --watch

# Type check specific file
pnpm typecheck -- app/composables/usePlayer.ts
```

### Formatting
```bash
# Format all files
pnpm format

# Check formatting (CI)
pnpm format:check
```

### All Quality Checks
```bash
# Run lint + typecheck + format check
pnpm check

# Pre-push hook equivalent
pnpm pre-push
```

---

## 🏗️ Building

### Production Build
```bash
# Standard production build
pnpm build

# Build with analysis
pnpm build --analyze

# Build for specific target
pnpm build --target vercel
pnpm build --target netlify
pnpm build --target node
pnpm build --target docker
```

### Preview Production Build
```bash
# Preview built output locally
pnpm preview

# Preview on specific port
pnpm preview --port 4000
```

### Build Artifacts
```bash
# Output directory after build
ls -la .output/

# Server bundle
ls -la .output/server/

# Public assets
ls -la .output/public/

# Check bundle size
pnpm build && npx bundle-analyzer .output/server/index.mjs
```

---

## 🐳 Docker

### Build Image
```bash
# Build production image
docker build -t streamlab:latest .

# Build with build args
docker build \
  --build-arg NUXT_APP_ENV=production \
  --build-arg JWT_SECRET=your-secret \
  -t streamlab:prod .

# Multi-platform build
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t streamlab:latest .
```

### Run Container
```bash
# Run production container
docker run -d \
  --name streamlab \
  -p 3000:3000 \
  -e NUXT_APP_ENV=production \
  -e JWT_SECRET=your-secret \
  streamlab:latest

# Run with env file
docker run -d \
  --name streamlab \
  -p 3000:3000 \
  --env-file .env.production \
  streamlab:latest

# Run with volume for logs
docker run -d \
  --name streamlab \
  -p 3000:3000 \
  -v $(pwd)/logs:/app/logs \
  streamlab:latest
```

### Docker Compose
```bash
# Start full stack (app + redis + postgres)
docker compose up -d

# Start only app
docker compose up -d app

# View logs
docker compose logs -f app

# Stop all
docker compose down

# Rebuild and restart
docker compose up -d --build app
```

---

## 🗄️ Database (When Using Real DB)

### Drizzle ORM Commands
```bash
# Generate migrations
pnpm db:generate

# Run migrations
pnpm db:migrate

# Push schema (dev only)
pnpm db:push

# Open Drizzle Studio
pnpm db:studio

# Seed database
pnpm db:seed

# Reset database (dev only)
pnpm db:reset
```

### Prisma (Alternative)
```bash
# Generate client
pnpm prisma generate

# Migrate
pnpm prisma migrate dev

# Studio
pnpm prisma studio

# Seed
pnpm prisma db seed
```

---

## 🚀 Deployment

### Vercel
```bash
# Deploy to Vercel
vercel deploy --prod

# Deploy preview
vercel deploy

# Set env vars
vercel env add JWT_SECRET production
vercel env add NUXT_PUBLIC_API_BASE production
```

### Netlify
```bash
# Deploy to Netlify
netlify deploy --prod --dir=.output/public

# Deploy preview
netlify deploy --dir=.output/public

# Netlify CLI build
netlify build
```

### Cloudflare Pages
```bash
# Deploy via Wrangler
wrangler pages deploy .output/public --project-name=streamlab

# With custom domain
wrangler pages deploy .output/public --project-name=streamlab --branch=production
```

### Railway / Render / Fly.io
```bash
# Railway
railway up

# Render (via render.yaml)
# Auto-deploys on push to main

# Fly.io
fly deploy
```

### Docker Deployment
```bash
# Build and push to registry
docker build -t ghcr.io/your-org/streamlab:v1.0.0 .
docker push ghcr.io/your-org/streamlab:v1.0.0

# Deploy to Kubernetes
kubectl apply -f k8s/

# Or use Helm
helm upgrade --install streamlab ./helm/streamlab
```

---

## 📊 Observability

### Local Prometheus + Grafana
```bash
# Start monitoring stack
docker compose -f docker-compose.monitoring.yml up -d

# Prometheus: http://localhost:9090
# Grafana: http://localhost:3001 (admin/admin)
```

### Metrics Endpoint
```bash
# Check metrics
curl http://localhost:3000/api/_metrics

# Or Prometheus format
curl http://localhost:3000/api/_metrics/prometheus
```

### Logs
```bash
# Follow logs (dev)
pnpm dev 2>&1 | pino-pretty

# Production logs (Docker)
docker logs -f streamlab

# Filter errors
docker logs streamlab 2>&1 | grep ERROR
```

---

## 🔧 Maintenance

### Dependency Management
```bash
# Check outdated
pnpm outdated

# Update dependencies (interactive)
pnpm update -i

# Update to latest (careful!)
pnpm update --latest

# Audit vulnerabilities
pnpm audit

# Fix vulnerabilities
pnpm audit --fix
```

### Cache Management
```bash
# Clear Nuxt cache
pnpm clean

# Clear all caches
pnpm clean:all

# Clear node_modules and reinstall
rm -rf node_modules .output pnpm-lock.yaml && pnpm install
```

### Git Helpers
```bash
# Create feature branch
git checkout -b feat/new-feature

# Commit with conventional message
git commit -m "feat(player): add quality selector"

# Push and create PR
git push -u origin feat/new-feature
gh pr create --title "Add quality selector" --body "..."

# Rebase on main
git fetch origin && git rebase origin/main

# Squash commits
git rebase -i HEAD~3
```

---

## 🎬 Video Pipeline (Reference)

### Transcode with FFmpeg
```bash
# Transcode to HLS (5 qualities)
ffmpeg -i input.mkv \
  -map 0:v -map 0:a -map 0:s? \
  -c:v:0 libx264 -b:v:0 5000k -s:v:0 1920x1080 \
  -c:v:1 libx264 -b:v:1 2800k -s:v:1 1280x720 \
  -c:v:2 libx264 -b:v:2 1400k -s:v:2 854x480 \
  -c:v:3 libx264 -b:v:3 800k  -s:v:3 640x360 \
  -c:v:4 libx264 -b:v:4 400k  -s:v:4 426x240 \
  -c:a aac -b:a 128k -ac 2 \
  -f hls \
  -hls_time 6 \
  -hls_playlist_type vod \
  -hls_segment_filename "output/%v/seg_%03d.ts" \
  -master_pl_name master.m3u8 \
  output/v%v/playlist.m3u8

# Transcode to DASH
ffmpeg -i input.mkv \
  -map 0:v -map 0:a -map 0:s? \
  -c:v:0 libx264 -b:v:0 5000k -s:v:0 1920x1080 \
  -c:v:1 libx264 -b:v:1 2800k -s:v:1 1280x720 \
  -c:v:2 libx264 -b:v:2 1400k -s:v:2 854x480 \
  -c:a aac -b:a 128k \
  -f dash \
  -seg_duration 6 \
  -window_size 5 \
  -remove_at_exit 1 \
  output/manifest.mpd
```

### Package with Shaka Packager
```bash
# DASH packaging with DRM (example)
packager \
  in=video_1080p.mp4,stream=video,output=video_1080p_dash.mp4 \
  in=video_720p.mp4,stream=video,output=video_720p_dash.mp4 \
  in=audio.mp4,stream=audio,output=audio_dash.mp4 \
  --mpd_output manifest.mpd \
  --protection_systems Widevine \
  --enable_widevine_encryption \
  --content_id <CONTENT_ID> \
  --key <KEY_ID>:<KEY> \
  --pssh <PSSH_BOX>
```

### Upload to Cloudflare R2
```bash
# Using Wrangler
wrangler r2 object put streamlab/videos/movie-id/master.m3u8 --file output/master.m3u8

# Sync entire directory
wrangler r2 sync output/ streamlab/videos/movie-id/
```

### Generate Thumbnails
```bash
# Generate sprite sheet (VTT + JPG)
ffmpeg -i input.mkv \
  -vf "fps=1/10,scale=160:90,tile=5x5" \
  -qscale:v 2 \
  thumbnails/sprite_%03d.jpg

# Generate WebVTT for sprite
# (Use script or tool like spritesheet-generator)
```

---

## 🛠️ Utility Scripts

### Make Executable
```bash
chmod +x scripts/*.sh scripts/**/*.sh
```

### Run Scripts
```bash
# Development startup
./scripts/dev.sh

# Production build
./scripts/build.sh

# Run tests
./scripts/test.sh

# Lint everything
./scripts/lint.sh

# Deploy to Vercel
./scripts/deploy/vercel.sh

# Transcode video
./scripts/video/transcode.sh input.mkv output/
```

---

## 🆘 Troubleshooting Commands

### Port Conflicts
```bash
# Find process on port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use fuser
fuser -k 3000/tcp
```

### Clear Everything
```bash
# Nuclear option - clean slate
rm -rf node_modules .output .nuxt dist coverage .vitest
pnpm store prune
pnpm install
```

### Debug Build Issues
```bash
# Verbose build
NUXT_LOG_LEVEL=debug pnpm build

# Check for circular deps
pnpm build 2>&1 | grep -i circular

# Analyze bundle
npx nuxi analyze
```

### Reset Database (Dev)
```bash
# SQLite
rm -f .data/dev.db && pnpm db:migrate && pnpm db:seed

# Docker PostgreSQL
docker compose down -v && docker compose up -d postgres && pnpm db:migrate
```

---

## 📋 Quick Reference Card

| Task | Command |
|------|---------|
| Start dev | `pnpm dev` |
| Run tests | `pnpm test:all` |
| Type check | `pnpm typecheck` |
| Lint | `pnpm lint` |
| Format | `pnpm format` |
| Build prod | `pnpm build` |
| Preview build | `pnpm preview` |
| Docker build | `docker build -t streamlab .` |
| Deploy Vercel | `vercel deploy --prod` |
| Check outdated | `pnpm outdated` |
| Clear cache | `pnpm clean` |

---

*Add new commands here as the project evolves. Keep this file executable and up-to-date.*