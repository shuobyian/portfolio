# syntax=docker/dockerfile:1

# ============================================================
# 1단계 deps — 의존성만 설치한다
#   package.json 과 락파일만 먼저 복사하는 것이 핵심.
#   소스가 바뀌어도 이 두 파일이 그대로면 install 레이어는 캐시 재사용.
# ============================================================
FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ============================================================
# 2단계 builder — 소스를 넣고 빌드한다
#   여기서만 devDependencies(타입스크립트·eslint 등)가 필요하다.
#   결과물은 .next/standalone 과 .next/static.
# ============================================================
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ============================================================
# 3단계 runner — 실행에 필요한 것만 담는 최종 이미지
#   빌드 도구도, devDependencies 도, 소스코드도 여기엔 없다.
#   이미지에 든 게 적을수록 CVE 스캔 대상도 공격면도 줄어든다.
# ============================================================
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# root 로 돌지 않는다 — 컨테이너가 뚫려도 권한을 최소화
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 4000
ENV PORT=4000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
