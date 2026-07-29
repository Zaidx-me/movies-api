FROM node:20-alpine
WORKDIR /app
COPY streamlab/. .
RUN corepack enable pnpm && pnpm install --frozen-lockfile
RUN pnpm build
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]